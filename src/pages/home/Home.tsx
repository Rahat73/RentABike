import { FloatButton } from "antd";
import ContactUs from "./contactUs/ContactUs";
import DiscountSection from "./discountSection/DiscountSection";
import FeaturedSection from "./featuredSection/FeaturedSection";
import HeroSection from "./heroSection/HeroSection";
import Testimonials from "./testimonials/Testimonials";
import WhyChooseUs from "./whyChooseUs/WhyChooseUs";
import { GrCompare } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-16 mb-16">
      <HeroSection />
      <div className="my-10">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <FeaturedSection />
        </motion.div>
      </div>

      <div className="my-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          <Testimonials />
        </motion.div>
      </div>

      <div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <WhyChooseUs />
        </motion.div>
      </div>

      <div className="my-10">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          <DiscountSection />
        </motion.div>
      </div>

      <div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <ContactUs />
        </motion.div>
      </div>

      <FloatButton
        tooltip="Compare Bikes"
        type="primary"
        icon={<GrCompare className="text-3xl" />}
        shape="square"
        className="w-16 h-16 animate-bounce"
        onClick={() => navigate("/bike-comparison")}
      />
    </div>
  );
};

export default Home;
