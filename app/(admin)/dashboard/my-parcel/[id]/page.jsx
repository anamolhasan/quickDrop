'use client'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import PaymentForm from './components/PaymentForm'

export default function page() {

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
  return (
    <Elements stripe={stripePromise}>
        <PaymentForm />
    </Elements>
  )
}
