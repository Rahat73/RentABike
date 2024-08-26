import FeaturedSection from "./featuredSection/FeaturedSection";
import HeroSection from "./heroSection/HeroSection";
import Testimonials from "./testimonials/Testimonials";

const Home = () => {
  return (
    <div className="flex flex-col space-y-16">
      <HeroSection />
      <FeaturedSection />
      <Testimonials />
    </div>
  );
};

export default Home;
