import { Card, Col, Row, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBikeByIdQuery } from "../../redux/features/bike/bikeApi";
import { useEffect } from "react";

const BikeDetails = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { bikeId } = useParams();

  const { data: bike, isFetching } = useGetBikeByIdQuery(bikeId);

  const handleBookNow = () => {
    navigate("/booking");
  };
  return (
    <div className="w-10/12 mx-auto mt-8">
      <Card
        loading={isFetching}
        title={bike?.data?.name}
        extra={
          <div className="flex items-center">
            <span className="text-xl rounded-full bg-gray-200 px-3 py-1">
              {bike?.data?.pricePerHour} $
            </span>
            <span className="text-lg ml-2">/ hour</span>
          </div>
        }
        bordered={false}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <img
              src="https://example.com/bike-image.jpg"
              alt={bike?.data?.name}
              className="w-full h-auto object-cover rounded-md"
            />
          </Col>
          <Col xs={24} lg={12}>
            <h2 className="text-3xl font-bold mb-4">{bike?.data?.name}</h2>
            <p className="text-lg mb-4">{bike?.data?.description}</p>
            <ul className="mb-6">
              <li className="text-lg">
                <strong>Price Per Hour:</strong> {bike?.data?.pricePerHour} $
              </li>
              <li className="text-lg">
                <strong>CC:</strong> {bike?.data?.cc}
              </li>
              <li className="text-lg">
                <strong>Year:</strong> {bike?.data?.year}
              </li>
              <li className="text-lg">
                <strong>Brand:</strong> {bike?.data?.brand}
              </li>
              <li className="text-lg">
                <strong>Model:</strong> {bike?.data?.model}
              </li>
              <li className="text-lg">
                <strong>Availability:</strong>{" "}
                {bike?.data?.isAvailable ? "Available" : "Not Available"}
              </li>
            </ul>
            <Button
              type="primary"
              size="large"
              className="w-full lg:w-auto"
              onClick={handleBookNow}
            >
              Book Now
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default BikeDetails;
