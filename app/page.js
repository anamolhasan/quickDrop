import Banner from "@/components/Banner";
import WhyChose from "@/components/WhyChose";
import Image from "next/image";
import FAQ from "../components/FAQ/FAQ";
import FeedbackForm from "../components/FeedbackForm/FeedbackForm";

export default function Home() {
  return (
    <>
      <Banner></Banner>
      <WhyChose></WhyChose>
      <FAQ/>
      <FeedbackForm></FeedbackForm>
    </>
  );
}
