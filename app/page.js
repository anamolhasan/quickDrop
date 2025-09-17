import Banner from "@/components/home/banner/Banner";
import WeWork from "@/components/home/WeWORK";
import State from "@/components/home/State"
import Review from "@/components/home/Review"
import FeedbackForm from "@/components/home/FeedbackForm/FeedbackForm";
import WhyChose from "@/components/home/whyChose/WhyChose";
import FAQ from "@/components/home/FAQ/FAQ";
import OurService from "@/components/home/OurService"
import Complanbox from "@/components/home/Complanbox"

export default function Home() {
  return (
    <>
      <Banner/>
      <WeWork/>
      <WhyChose/>
      <State/>
      <OurService/>
      <FAQ/>
      <Review/>
      <FeedbackForm/>
      <Complanbox/>
    </>
  );
}
