import { Button, Input } from "antd";
import heroImage from "../../../assets/images/hero-banner.jpeg";
import heroImageHalf from "../../../assets/images/hero-banner-half.jpeg";
const { Search } = Input;
const HeroSection = () => {
  const onSearch = () => {};
  return (
    <div className="relative w-full">
      <img
        className="w-full hidden lg:block"
        src={heroImage}
        alt="hero banner"
      />
      <img
        className="w-full block lg:hidden"
        src={heroImageHalf}
        alt="hero banner"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 lg:hidden"></div>

      <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-2 md:px-20 w-full lg:w-1/2 text-white">
        <h1 className="text-4xl font-bold mb-4">RentABike 🏍️</h1>
        <p className="text-lg mb-6">
          Discover the ultimate freedom on two wheels. Our motorcycle rental
          service offers a wide range of bikes to suit every rider's needs.
          Explore new horizons and create unforgettable memories.
        </p>
        <Button className="w-40">Buy Now</Button>
      </div>
      <Search
        className="absolute inset-x-0 left-1/2 bottom-2 md:bottom-20 transform -translate-x-1/2 w-60 md:w-96"
        placeholder="Search bikes"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </div>
  );
};

export default HeroSection;
