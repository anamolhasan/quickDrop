import {
  FaBox,
  FaUsers,
  FaMotorcycle,
  FaClipboardList,
  FaComments,
  FaUser,
  FaMoneyBillWave, FaChartBar, FaTruck, FaCheckCircle, FaClock, FaEdit, FaTag,  FaFileAlt  , FaShieldAlt,   FaCamera, FaSignature
} from "react-icons/fa";

const DashboardSideMenuList = [
 
  {
    title: "Overview",
    url: "/dashboard",
    icon: <FaChartBar />,
    roles: ["admin"], // only admin
  },
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
    title: "Offer Management",
    url: "/dashboard/offers",
    icon: <FaTag />,
    roles: ["admin"],
  },
   {
    title: "Delivery Proofs",
    url: "/dashboard/delivery-proofs",
    icon: <FaShieldAlt />,
    roles: ["admin"],
  },
  {
    title: "POD Analytics",
    url: "/dashboard/pod-analytics",
    icon: <FaFileAlt />,
    roles: ["admin"],
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
    url: "/dashboard/my-parcel",
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
    title: "Delivery Proofs",
    url: "/dashboard/my-delivery-proofs",
    icon: <FaCamera />,
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
   {
    title: "POD Delivery",
    url: "/dashboard/pod-delivery",
    icon: <FaSignature />,
    roles: ["rider"],
  },
  {
    title: "POD History",
    url: "/dashboard/pod-history",
    icon: <FaFileAlt />,
    roles: ["rider"],
  },
];

export { DashboardSideMenuList };
