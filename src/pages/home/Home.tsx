import { FloatButton } from "antd";
import ContactUs from "./contactUs/ContactUs";
import DiscountSection from "./discountSection/DiscountSection";
import FeaturedSection from "./featuredSection/FeaturedSection";
import HeroSection from "./heroSection/HeroSection";
import Testimonials from "./testimonials/Testimonials";
import WhyChooseUs from "./whyChooseUs/WhyChooseUs";
import { GrCompare } from "react-icons/gr";

const Home = () => {
  return (
    <div className="flex flex-col space-y-16">
      <HeroSection />
      <FeaturedSection />
      <Testimonials />
      <WhyChooseUs />
      <DiscountSection />
      <ContactUs />
      <FloatButton
        tooltip="Compare Bikes"
        type="primary"
        icon={<GrCompare />}
        shape="square"
        className="w-16 h-16"
        href="/bike-comparison"
      />
    </div>
  );
};

export default Home;
