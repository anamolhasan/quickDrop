import Banner from "@/components/Banner";
import WhyChose from "@/components/WhyChose";
import Image from "next/image";
import FAQ from "../components/FAQ/FAQ";

export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <Banner></Banner>
      <WhyChose></WhyChose>
      <FAQ/>
    </>
  );
}
