


// const DashboardSideMenuList = [
//   // {
//   //   title: "Overview",
//   //   url: "/dashboard",

//   // },
//   {
//     title: "Parcel Manage",
//     url: "/dashboard/parcel-manage",
//   },
//   {
//     title: "Users",
//     url: "/dashboard/user",
//   },
//   {
//     title: "Active riders",
//     url: "/dashboard/active-riders",
//   },


//   {
  
//     title: "Rider Applications",
//     url: "/dashboard/rider-applications",
  
//   },


//   {
//     title: "User Feedback",
//     url: "/dashboard/user-feedback",
//   },
//   {
//     title: "Profile",
//     url: "/dashboard/profile",
//   },
// ];

// export { DashboardSideMenuList };
import {
  FaBox,
  FaUsers,
  FaMotorcycle,
  FaClipboardList,
  FaComments,
  FaUser,
} from "react-icons/fa";

const DashboardSideMenuList = [
  {
    title: "Parcel Manage",
    url: "/dashboard/parcel-manage",
    icon: <FaBox />,
    roles: ["admin"], // only admin
  },
  {
    title: "Users",
    url: "/dashboard/user",
    icon: <FaUsers />,
    roles: ["admin"], // only admin
  },
  {
    title: "Active Riders",
    url: "/dashboard/active-riders",
    icon: <FaMotorcycle />,
    roles: ["admin"], // admin & rider
  },
  {
    title: "Rider Applications",
    url: "/dashboard/rider-applications",
    icon: <FaClipboardList />,
    roles: ["admin"], // only admin
  },
  {
    title: "User Feedback",
    url: "/dashboard/user-feedback",
    icon: <FaComments />,
    roles: ["admin"], // only admin
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: <FaUser />,
    roles: ["admin", "rider", "user"], // everyone
  },
];

export { DashboardSideMenuList };
