import {
  FaBox,
  FaUsers,
  FaMotorcycle,
  FaClipboardList,
  FaComments,
  FaUser,
  FaMoneyBillWave, FaTruck, FaCheckCircle, FaClock, FaEdit
} from "react-icons/fa";

const DashboardSideMenuList = [
 
  {
    title: "Users",
    url: "/dashboard/user",
    icon: <FaUsers />,
    roles: ["admin"], // only admin
  },
   {
    title: "Parcel Manage",
    url: "/dashboard/parcel-manage",
    icon: <FaBox />,
    roles: ["admin"], // only admin
  },
  {
    title: "Active Riders",
    url: "/dashboard/active-riders",
    icon: <FaMotorcycle />,
    roles: ["admin"], // admin
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
    roles: ["admin"],  // only admin
  },
  {
    title: "Update profile",
    url: "/dashboard/profile",
    icon: <FaEdit />,
    roles: ["admin", "rider", "user"], // everyone
  },
  // {
  //   title: "Customeize wrapper",
  //   url: "/users-route/customize-wrapper",
  //   icon: <FaUser />,
  //   roles: ["admin", "rider", "user"], // everyone
  // },
  {
    title: "My parcels",
    url: "/dashboard/my-products",
    icon: <FaBox />,
    roles: ["user"], 
  },
  {
    title: "Payments",
    url: "/dashboard/payment-history",
    icon: <FaMoneyBillWave />,
    roles: ["user"], 
  },
  {
    title: "Track parcel",
    url: "/dashboard/track-parcel",
    icon: <FaTruck />,
    roles: ["user"], 
  },
   {
    title: "Completed delivery",
    url: "/dashboard/complited-delevry",
    icon: <FaCheckCircle />, 
    roles: ["rider"], 
  },
  {
    title: "Pending delivery",
    url: "/dashboard/panding-delevery",
    icon: <FaClock />, 
    roles: ["rider"], 
  },
  {
    title: "Earning",
    url: "/dashboard/earning",
    icon: <FaMoneyBillWave />, 
    roles: ["rider"], 
  },
];

export { DashboardSideMenuList };
