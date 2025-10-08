'use client'

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import { redirect } from 'next/navigation';
import Swal from 'sweetalert2';

const MyParcelsPage = () => {
    const {data: session} = useSession()
    // console.log(session?.user?.email)
    const router = useRouter()
    //  const { user } = useAuth();
    // const axiosSecure = useAxiosSecure();
    // const navigate = useNavigate()
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', session?.user.email],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/parcels?email=${session?.user?.email}`);
            return res.data;
        },
          enabled: !!session?.user?.email, // session আসার আগে query চলবে না
    })

    console.log(parcels);

    const handleView = (id) => {
        console.log("View parcel", id);
        // You could open a modal or navigate to a detail page
    };

    const handlePay = (id) => {
        console.log("Proceed to payment for", id);
       router.push(`/dashboard/my-parcel/${id}`)
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#e11d48", // red-600
            cancelButtonColor: "#6b7280",  // gray-500
        });
        if (confirm.isConfirmed) {
            try {
                
                axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/parcels/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Parcel has been deleted.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                            });
                        }
                        refetch();
                    })

                
            } catch (err) {
                Swal.fire("Error", err.message || "Failed to delete parcel", "error");
            }
        }
    };

      const formatDate = (iso) => {
        return new Date(iso).toLocaleString(); // Format: "6/22/2025, 3:11:31 AM"
    };
    return (
      <div className="overflow-x-auto rounded-xl shadow-lg border border-base-200">
  <table className="table w-full">
    <thead className="bg-base-200 text-sm uppercase text-gray-200">
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Type</th>
        <th>Created At</th>
        <th>Cost</th>
        <th>Payment</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {parcels.length > 0 ? (
        parcels.map((parcel, index) => (
          <tr
            key={parcel._id}
            className="hover:bg-gray-400 transition-colors duration-200"
          >
            <td className="font-semibold text-gray-600">{index + 1}</td>
            <td className="max-w-[200px] truncate">{parcel.title}</td>
            <td className="capitalize">{parcel.type}</td>
            <td className="text-gray-500 text-sm">
              {formatDate(parcel.creation_date)}
            </td>
            <td className="font-semibold">৳{parcel.cost}</td>
            <td>
              <span
                className={`badge px-3 py-2 text-xs ${
                  parcel.payment_status === "paid"
                    ? "badge-success text-white"
                    : "badge-error text-white"
                }`}
              >
                {parcel.payment_status}
              </span>
            </td>
            <td className="space-x-2">
              <button
                onClick={() => handleView(parcel._id)}
                className="btn btn-xs btn-outline btn-info"
              >
                View
              </button>
              {parcel.payment_status === "unpaid" && (
                <button
                  onClick={() => handlePay(parcel._id)}
                  className="btn btn-xs btn-warning text-black"
                >
                  Pay
                </button>
              )}
              <button
                onClick={() => handleDelete(parcel._id)}
                className="btn btn-xs btn-error text-white"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="7"
            className="text-center text-gray-500 py-8 text-sm italic"
          >
            No parcels found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    );
};

export default MyParcelsPage;