import Banner from "@/components/Banner";
import Navbar from "@/components/navbar/Navbar";
import WhyChose from "@/components/WhyChose";
import Image from "next/image";

export default function Home() {
  return (
    <>
     <Navbar></Navbar>
      <Banner></Banner>
      <WhyChose></WhyChose>
    </>
  );
}
