'use client'

import useTrackingLogger from '@/app/Users/components/useTrackingLogger';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { id } = useParams();
    const {data: session} = useSession()
    // const { user } = useAuth();
    // const axiosSecure = useAxiosSecure();
    const {logTracking} = useTrackingLogger()
    // const navigate = useNavigate();
console.log(id)
    const [error, setError] = useState('');


    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', id],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/parcels/${id}`);
            return res.data;
        }
    })

    if (isPending) {
        return <p>Loading.....</p>
        // return <LoadingRing />
    }

    console.log(parcelInfo)
    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;
    console.log(amountInCents);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        // step- 1: validate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message);
        }
        else {
            setError('');
            console.log('payment method', paymentMethod);

            // step-2: create payment intent
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/create-payment-intent`, {
                amountInCents,
                id
            })

            const clientSecret = res.data.clientSecret;

            // step-3: confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: session?.user.displayName,
                        email: session?.user.email
                    },
                },
            });
 
            if (result.error) {
                setError(result.error.message);
            } else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded!');
                    const transactionId = result.paymentIntent.id;
                    // step-4 mark parcel paid also create payment history
                    const paymentData = {
                        id,
                        email: session?.user.email,
                        amount,
                        transactionId: transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types
                    }

                    const paymentRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payments`, paymentData);
                    if (paymentRes.data.insertedId) {

                        // ✅ Show SweetAlert with transaction ID
                        await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                            confirmButtonText: 'Go to My Parcels',
                        });

                          await logTracking(
                            {
                                tracking_id: parcelInfo.tracking_id,
                                status: "payment_done",
                                details: `Paid by ${session?.user.displayName}`,
                                updated_by: session?.user.email,
                            }
                        )

                        // ✅ Redirect to /myParcels
                        // navigate('/dashboard/myParcels');

                    }
                }
            }
        }


    }

    return (
        <div>
  <form
    onSubmit={handleSubmit}
    className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
  >
    <div className="p-2 border rounded">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              fontFamily: 'Roboto, sans-serif',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
    </div>

    <button
      type="submit"
      className="btn btn-primary text-black w-full"
      disabled={!stripe}
    >
      Pay ${amount}
    </button>

    {error && <p className="text-red-500">{error}</p>}
  </form>
</div>

    );
};


export default PaymentForm