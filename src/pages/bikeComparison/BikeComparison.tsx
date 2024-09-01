import { AutoComplete, Card, Col, Row, Button } from "antd";
import { useState } from "react";
import { useGetAllbikesQuery } from "../../redux/features/bike/bikeApi";
import { useNavigate } from "react-router-dom";
import noImage from "../../assets/images/No_Image_Available.jpg";
import { TBike } from "../../types/bike.type";

const BikeComparison = () => {
  const [searchTerms, setSearchTerms] = useState<
    {
      key: string;
      value: string | undefined;
      selectedBike: TBike | undefined;
    }[]
  >([
    { key: "searchParams1", value: undefined, selectedBike: undefined },
    { key: "searchParams2", value: undefined, selectedBike: undefined },
    { key: "searchParams3", value: undefined, selectedBike: undefined },
  ]);

  const { data: suggestions } = useGetAllbikesQuery(undefined);

  const handleSearch = (index: number, value: string) => {
    const updatedSearchTerms = [...searchTerms];
    updatedSearchTerms[index] = { ...updatedSearchTerms[index], value };
    setSearchTerms(updatedSearchTerms);
  };

  const handleSelect = (index: number, bikeId: string) => {
    const selectedBike = suggestions?.data?.find(
      (bike) => bike.name === bikeId
    );
    const updatedSearchTerms = [...searchTerms];
    updatedSearchTerms[index] = { ...updatedSearchTerms[index], selectedBike };
    setSearchTerms(updatedSearchTerms);
  };

  const options = suggestions?.data?.map((bike) => ({
    value: bike.name,
    label: `${bike.name} - ${bike.brand} - ${bike.model}`,
  }));

  const navigate = useNavigate();

  return (
    <div className="container mx-auto w-10/12 lg:w-8/12 my-10">
      <h1 className="text-3xl font-bold my-10 text-center">Compare Bikes</h1>
      <Row gutter={[16, 16]}>
        {searchTerms.map((term, index) => (
          <Col key={index} xs={24} md={8}>
            <AutoComplete
              className="w-full"
              allowClear
              placeholder="Search bikes (Name, Brand, Model...)"
              options={options}
              onSearch={(value) => handleSearch(index, value)}
              onSelect={(value) => handleSelect(index, value)}
            />
            {term.selectedBike && (
              <Card
                hoverable
                className="group mt-4"
                cover={
                  <div className="overflow-hidden h-[260px]">
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                      alt={term.selectedBike.name}
                      src={term.selectedBike.img_url ?? noImage}
                    />
                  </div>
                }
              >
                <Card.Meta
                  title={
                    <div className="flex justify-between">
                      <p>{term.selectedBike.name}</p>
                      <span className="text-sm rounded-full bg-gray-400 px-2 py-1">
                        {term.selectedBike.pricePerHour} $
                      </span>
                    </div>
                  }
                  description={
                    <div className="font-semibold text-gray-500">
                      <p>Brand: {term.selectedBike.brand}</p>
                      <p>Model: {term.selectedBike.model}</p>
                      <p>Year: {term.selectedBike.year}</p>
                      <p>CC: {term.selectedBike.cc}</p>
                      <p>
                        Available:{" "}
                        {term.selectedBike.isAvailable ? "Yes" : "No"}
                      </p>
                    </div>
                  }
                />
                <Button
                  className="mt-5"
                  onClick={() => {
                    navigate(`/bikes/${term.selectedBike?._id}`);
                  }}
                >
                  View Details
                </Button>
              </Card>
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BikeComparison;
