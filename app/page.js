// import Banner from "@/components/home/banner/Banner";
// import WeWork from "@/components/home/WeWORK";
// import State from "@/components/home/State"
// import Review from "@/components/home/Review"
// import FeedbackForm from "@/components/home/FeedbackForm/FeedbackForm";
// import WhyChose from "@/components/home/whyChose/WhyChose";
// import FAQ from "@/components/home/FAQ/FAQ";
// import OurService from "@/components/home/OurService"
// import Complanbox from "@/components/home/Complanbox"

// export default function Home() {
//   return (
//     <>
//       <Banner activeOffer={activeOffer}/>
//       <WeWork/>
//       {/* <WhyChose/> */}
//       <State/>
//       <OurService/>
//       <FAQ/>
//       <Review/>
//       <FeedbackForm/>
//       {/* <Complanbox/> */}
//     </>
//   );
// }









import Banner from "@/components/home/banner/Banner";
import WeWork from "@/components/home/WeWORK";
import State from "@/components/home/State"
import Review from "@/components/home/Review"
import FeedbackForm from "@/components/home/FeedbackForm/FeedbackForm";
import WhyChose from "@/components/home/whyChose/WhyChose";
import FAQ from "@/components/home/FAQ/FAQ";
import OurService from "@/components/home/OurService"
import Complanbox from "@/components/home/Complanbox"

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getActiveOffer() {
  try {
    const response = await fetch(`${apiUrl}/api/offers/active`, {
      cache: 'no-store' // বা next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch offer');
    }
    
    const data = await response.json();
    
    if (data.success && data.offer) {
      return data.offer;
    }
    return null;
  } catch (error) {
    console.error('Error fetching active offer:', error);
    return null;
  }
}

export default async function Home() {
  const activeOffer = await getActiveOffer();

  return (
    <>
      <Banner activeOffer={activeOffer}/>
      <WeWork/>
      {/* <WhyChose/> */}
      <State/>
      <OurService/>
      <FAQ/>
      <Review/>
      <FeedbackForm/>
      {/* <Complanbox/> */}
    </>
  );
}