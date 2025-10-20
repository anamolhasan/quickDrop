// // components/NotificationBell.jsx - Fixed Version
// 'use client'
// import { useState, useEffect } from 'react';
// import { FaBell } from 'react-icons/fa';

// const NotificationBell = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   // Polling for new notifications
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         console.log('Fetching notifications from:', `${apiUrl}/api/admin/notifications`);
//         const response = await fetch(`${apiUrl}/api/admin/notifications`);
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         console.log('Notifications response:', data);
        
//         if (data.success) {
//           setNotifications(data.notifications || []);
//           setUnreadCount(data.notifications?.filter(n => !n.adminRead).length || 0);
//         }
//       } catch (error) {
//         console.error('Failed to fetch notifications:', error);
//         setNotifications([]);
//         setUnreadCount(0);
//       }
//     };

//     // First fetch
//     fetchNotifications();

//     // Poll every 10 seconds
//     const interval = setInterval(fetchNotifications, 10000);
    
//     return () => clearInterval(interval);
//   }, [apiUrl]);

//   const markAsRead = async (notificationId) => {
//     try {
//       const response = await fetch(`${apiUrl}/api/admin/notifications/${notificationId}/read`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to mark as read');
//       }
      
//       const data = await response.json();
      
//       if (data.success) {
//         // Update local state
//         setNotifications(prev => 
//           prev.map(n => 
//             n._id === notificationId ? { ...n, adminRead: true } : n
//           )
//         );
//         setUnreadCount(prev => Math.max(0, prev - 1));
//       }
//     } catch (error) {
//       console.error('Failed to mark as read:', error);
//       alert('Failed to mark notification as read');
//     }
//   };

//   return (
//     <div className="relative notification-bell">
//       {/* Notification Bell */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
//       >
//         <FaBell className="text-xl" />
//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {/* Notification Dropdown */}
//       {isOpen && (
//         <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
//           <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
//             <h3 className="font-semibold text-gray-900 dark:text-white flex items-center justify-between">
//               <span>Notifications</span>
//               {unreadCount > 0 && (
//                 <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//                   {unreadCount} new
//                 </span>
//               )}
//             </h3>
//           </div>
          
//           <div className="overflow-y-auto max-h-80">
//             {notifications.length === 0 ? (
//               <div className="p-6 text-center text-gray-500 dark:text-gray-400">
//                 <FaBell className="text-2xl mx-auto mb-2 opacity-50" />
//                 <p>No notifications yet</p>
//                 <p className="text-sm mt-1">New rider applications will appear here</p>
//               </div>
//             ) : (
//               notifications.map(notification => (
//                 <div
//                   key={notification._id}
//                   className={`p-4 border-b border-gray-100 dark:border-gray-700 transition-colors ${
//                     !notification.adminRead 
//                       ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500' 
//                       : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
//                   }`}
//                 >
//                   <div className="flex justify-between items-start gap-3">
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-900 dark:text-white text-sm">
//                         {notification.title}
//                       </p>
//                       <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
//                         {notification.message}
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
//                         {new Date(notification.createdAt).toLocaleString()}
//                       </p>
//                     </div>
                    
//                     {!notification.adminRead && (
//                       <button
//                         onClick={() => markAsRead(notification._id)}
//                         className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors whitespace-nowrap flex-shrink-0"
//                       >
//                         Mark Read
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationBell;