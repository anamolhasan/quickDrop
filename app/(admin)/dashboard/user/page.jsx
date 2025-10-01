"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Redirect non-admin users
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/"); // redirect non-admins
      console.log("Session:", session);
    }
  }, [status, session, router]);

  // Fetch users (Admin only)
  const fetchUsers = async () => {
    if (!session?.token) return;
   

    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (status === "authenticated") {
    if (!session?.token) {
      console.log("No token found! Session:", session);
      setError("No token found. Please login again.");
      setLoading(false);
      return;
    }
    if (session.user.role === "admin") {
      fetchUsers();
    } else {
      router.push("/");
      setLoading(false);
    }
  }
}, [status, session, router]);


  // Handle role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`${apiUrl}/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();

      if (data.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
        alert("Role updated successfully!");
      } else {
        alert(data.error || "Failed to update role");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating role");
          

    }

 
  };

  if (loading) return <p className="p-4">Loading users...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
        Users
      </h1>
      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="border px-4 py-2 text-left text-gray-900 dark:text-gray-100">
                  Photo
                </th>
                <th className="border px-4 py-2 text-left text-gray-900 dark:text-gray-100">
                  Name
                </th>
                <th className="border px-4 py-2 text-left text-gray-900 dark:text-gray-100">
                  Email
                </th>
                <th className="border px-4 py-2 text-left text-gray-900 dark:text-gray-100">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="border px-4 py-2">
                    <img
                      src={user.photo || "https://i.ibb.co/2n8qPkw/default-avatar.png"}
                      alt={user.name}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="border rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition w-full"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                      <option value="rider">Rider</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default page;




