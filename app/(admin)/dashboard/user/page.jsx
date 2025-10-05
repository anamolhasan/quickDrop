"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";

const AdminUsersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Redirect non-admin users
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/"); // redirect non-admins
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
      setFilteredUsers(data);
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
        setFilteredUsers((prev) =>
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

  // Handle user delete
  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to remove this user?")) return;
    try {
      const res = await fetch(`${apiUrl}/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.filter((user) => user._id !== userId));
        setFilteredUsers((prev) => prev.filter((user) => user._id !== userId));
        alert("User removed successfully!");
      } else {
        alert(data.error || "Failed to remove user");
      }
    } catch (err) {
      console.error(err);
      alert("Error removing user");
    }
  };

  // Handle filtering
  useEffect(() => {
    if (filterRole === "all") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.role === filterRole));
    }
  }, [filterRole, users]);

  if (loading) return <p className="p-4">Loading users...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        Manage Users
      </h1>

      {/* Filter Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
        >
          <option value="all">All</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
          <option value="rider">Rider</option>
        </select>
      </div>

      {filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
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
                <th className="border px-4 py-2 text-center text-gray-900 dark:text-gray-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="border px-4 py-2">
                    <img
                      src={
                        user.photo ||
                        "https://i.ibb.co/2n8qPkw/default-avatar.png"
                      }
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
                      className="border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition w-full"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                      <option value="rider">Rider</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FiTrash2 size={20} />
                    </button>
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

export default AdminUsersPage;
