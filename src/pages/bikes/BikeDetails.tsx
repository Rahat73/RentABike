import {
  Card,
  Col,
  Row,
  Button,
  Modal,
  TimePicker,
  Flex,
  TimePickerProps,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBikeByIdQuery } from "../../redux/features/bike/bikeApi";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const BikeDetails = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [startTime, setStartTime] = useState<string | null>(null);

  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { bikeId } = useParams();

  const { data: bike, isFetching } = useGetBikeByIdQuery(bikeId);

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  const handleTimeSelect: TimePickerProps["onOk"] = (value) => {
    const formattedStartTime = dayjs(value).format("YYYY-MM-DDTHH:mm:ss[Z]");
    setStartTime(formattedStartTime);
  };

  const handleconfirmBooking = () => {
    if (startTime) {
      const bookingData = {
        bikeId: bike?.data?._id,
        startTime: startTime,
      };
      navigate(`/${user?.role}/booking`, { state: { bookingData } });
    } else {
      message.error("Please select start time");
    }
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
              disabled={!bike?.data?.isAvailable}
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
      <Modal
        title="Book Now"
        open={isBookingModalOpen}
        onCancel={() => setIsBookingModalOpen(false)}
        onOk={handleconfirmBooking}
        okText="Confirm"
      >
        <Flex align="center" justify="center" className="my-10">
          <span className="mr-2">Start Time : </span>
          <TimePicker
            format={"HH:mm"}
            className="w-72"
            required
            onChange={(time) => {
              if (!time) {
                setStartTime(null);
              }
            }}
            onOk={handleTimeSelect}
          />
        </Flex>
      </Modal>
    </div>
  );
};

export default BikeDetails;
