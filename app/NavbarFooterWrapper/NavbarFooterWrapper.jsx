"use client";

import Footer from "@/components/home/footer/Footer";
import Navbar from "@/components/home/navbar/Navbar";
import { usePathname } from "next/navigation";


export default function NavbarFooterWrapper({ children }) {
  const pathname = usePathname();
  
  // যেসব রাউটে Navbar/Footer দেখাবে না
  const hiddenRoutes = ["/dashboard", "/login", "/register"];

  const shouldHide = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHide && <Navbar />}
      {children}
      {!shouldHide && <Footer />}
    </>
  );
}
