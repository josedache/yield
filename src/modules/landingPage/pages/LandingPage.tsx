import Hero from "../components/Hero";
import Growing from "../components/Growing";
import YieldCalculator from "../components/YieldCalculator";
import MoreOnYield from "../components/MoreOnYield";
import GetStarted from "../components/GetStarted";
import WhyChooseYield from "../components/WhyChooseYield";
import FaqSection from "../components/FaqSection";

const LandingPageIndex = () => {
  return (
    <>
      <Hero />
      <Growing />
      <YieldCalculator />
      <MoreOnYield />
      <GetStarted />
      <WhyChooseYield />
      <FaqSection />
    </>
  );
};

export default LandingPageIndex;

export const Component = LandingPageIndex;
