import ContactUs from "./contactUs/ContactUs";
import DiscountSection from "./discountSection/DiscountSection";
import FeaturedSection from "./featuredSection/FeaturedSection";
import HeroSection from "./heroSection/HeroSection";
import Testimonials from "./testimonials/Testimonials";
import WhyChooseUs from "./whyChooseUs/WhyChooseUs";

const Home = () => {
  return (
    <div className="flex flex-col space-y-16">
      <HeroSection />
      <FeaturedSection />
      <Testimonials />
      <WhyChooseUs />
      <DiscountSection />
      <ContactUs />
    </div>
  );
};

export default Home;
