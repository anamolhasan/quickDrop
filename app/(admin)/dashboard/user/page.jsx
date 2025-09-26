// "use client";

// import React, { useEffect, useState } from 'react';

// const UsersPage = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/users');
//       const data = await res.json();
//       setUsers(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="p-4 ">
//       <h1 className="text-2xl font-bold mb-4">Users</h1>
//       <table className="min-w-full border border-gray-300">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border px-4 py-2">Photo</th>
//             <th className="border px-4 py-2">Name</th>
//             <th className="border px-4 py-2">Email</th>
//             <th className="border px-4 py-2">Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user._id} className="text-center">
//               <td className="border px-4 py-2">
//                 <img src={user.photo} alt={user.name} className="w-12 h-12 rounded-full mx-auto"/>
//               </td>
//               <td className="border px-4 py-2">{user.name}</td>
//               <td className="border px-4 py-2">{user.email}</td>
//               <td className="border px-4 py-2">
//                 <select
//                   value={user.role}
//                   onChange={(e) => handleRoleChange(user._id, e.target.value)}
//                   className="border rounded px-2 py-1"
//                 >
//                   <option value="user">User</option>
//                   <option value="admin">Admin</option>
//                   <option value="moderator">Moderator</option>
//                   <option value="rider">Rider</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UsersPage;







"use client";

import React, { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
        Users
      </h1>
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
                    src={user.photo}
                    alt={user.name}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <select
                    // value={user.role}
                    // onChange={(e) =>
                    //   handleRoleChange(user._id, e.target.value)
                    // }
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
    </div>
  );
};

export default UsersPage;
