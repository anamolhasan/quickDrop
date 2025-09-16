import Banner from "@/components/Banner";
import Navbar from "@/components/navbar/Navbar";
import WhyChose from "@/components/WhyChose";
import Image from "next/image";
import FAQ from "../components/FAQ/FAQ";

export default function Home() {
  return (
    <>
     <Navbar></Navbar>
      <Banner></Banner>
      <WhyChose></WhyChose>
      <FAQ/>
    </>
  );
}
