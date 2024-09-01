import { AutoComplete, Button, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImageHalf from "../../../assets/images/hero-banner-half.jpeg";
import heroImage from "../../../assets/images/hero-banner.jpeg";
import { useGetAllbikesQuery } from "../../../redux/features/bike/bikeApi";
const { Search } = Input;
const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState<{
    key: string;
    value: string | null;
  }>({
    key: "searchParams",
    value: null,
  });
  const { data: suggestions } = useGetAllbikesQuery([
    searchTerm,
    { key: "limit", value: 4 },
  ]);

  const handleSearch = (value: string) => {
    setSearchTerm({ key: "searchParams", value: value });
  };

  const options = suggestions?.data?.map((bike) => ({
    value: bike._id,
    label: `${bike.name} - ${bike.brand} - ${bike.model}`,
  }));

  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      <img
        className="w-full hidden md:block"
        src={heroImage}
        alt="hero banner"
      />
      <img
        className="w-full block md:hidden"
        src={heroImageHalf}
        alt="hero banner"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 md:hidden"></div>

      <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-2 md:px-20 w-full lg:w-1/2 text-white">
        <h1 className="text-4xl font-bold mb-4">RentABike 🏍️</h1>
        <p className="text-lg mb-6">
          Discover the ultimate freedom on two wheels. Our motorcycle rental
          service offers a wide range of bikes to suit every rider's needs.
          Explore new horizons and create unforgettable memories.
        </p>
        <Button onClick={() => navigate(`/bikes`)} className="w-40">
          Book Now
        </Button>
      </div>

      <AutoComplete
        className="absolute inset-x-0 left-1/2 bottom-2 lg:bottom-20 transform -translate-x-1/2 w-60 md:w-96"
        placeholder="Search bikes (Name, Brand, Model...)"
        options={options}
        onSearch={handleSearch}
        onSelect={(value) => navigate(`/bikes/${value}`)}
      >
        <Search
          size="large"
          enterButton="Search"
          allowClear
          onSearch={(value) =>
            navigate(`/bikes`, { state: { searchValue: value } })
          }
        />
      </AutoComplete>
    </div>
  );
};

export default HeroSection;
