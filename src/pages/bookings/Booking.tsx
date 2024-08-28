import { Button, Col, Divider, message, Row, Space, Spin } from "antd";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { useGetBikeByIdQuery } from "../../redux/features/bike/bikeApi";
import { toast } from "sonner";
import { TPostResponse } from "../../types";
import { TBooking } from "../../types/booking.type";
import { useCreateBookingMutation } from "../../redux/features/booking/bookingApi";

const Booking = () => {
  const location = useLocation();
  const { bookingData } = location.state || {};
  console.log(bookingData);
  const startTimeFormatted = dayjs(bookingData.startTime).format(
    "DD/MM/YYYY HH:mm a"
  );

  const { data: bikeData, isFetching } = useGetBikeByIdQuery(
    bookingData?.bikeId
  );

  const [createBooking] = useCreateBookingMutation();

  const handleconfirmBooking = async () => {
    const toastId = toast.loading("Booking in progress...");

    if (bookingData?.startTime && bookingData?.bikeId) {
      const res = (await createBooking(bookingData)) as TPostResponse<TBooking>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data?.message, { id: toastId });
      }
    } else {
      message.error("Somthing went wrong!");
    }
  };

  return (
    <div className="bg-white w-10/12 mx-auto rounded-lg p-10 my-10">
      <p className="text-3xl font-bold text-center">Payment</p>
      <Row gutter={20} className="my-5 space-y-5">
        <Col xs={24} md={11}>
          <Spin size="large" spinning={isFetching}>
            <Space direction="vertical" className="text-lg">
              <p>
                <strong>Bike Name :</strong> {bikeData?.data?.name}
              </p>
              <p>
                <strong>Start time :</strong> {startTimeFormatted}
              </p>
            </Space>
          </Spin>
        </Col>

        <Col xs={24} md={2} className="flex justify-center items-center">
          <Divider
            type="vertical"
            className="h-full md:h-full bg-gray-300 w-full md:w-1"
          />
        </Col>

        <Col xs={24} md={11}>
          <p>Payment method</p>
          <Button type="primary" onClick={handleconfirmBooking}>
            Confirm booking
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Booking;
