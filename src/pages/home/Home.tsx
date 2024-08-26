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
    </div>
  );
};

export default Home;
