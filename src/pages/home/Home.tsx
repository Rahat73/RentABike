import { Space } from "antd";
import FeaturedSection from "./featuredSection/FeaturedSection";
import HeroSection from "./heroSection/HeroSection";

const Home = () => {
  return (
    <Space align="center" direction="vertical" size={[0, 100]}>
      <HeroSection />
      <FeaturedSection />
    </Space>
  );
};

export default Home;
