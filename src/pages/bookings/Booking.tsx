import { Button, message, Row, Space, Spin, theme } from "antd";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGetBikeByIdQuery } from "../../redux/features/bike/bikeApi";
import { useCreateBookingMutation } from "../../redux/features/booking/bookingApi";
import { TPostResponse } from "../../types";
import { TBooking } from "../../types/booking.type";
import { useEffect } from "react";

const Booking = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const { token } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();

  const { bookingData } = location.state || {};
  const startTimeFormatted = dayjs(bookingData.startTime).format(
    "DD/MM/YYYY HH:mm a"
  );

  const { data: bikeData, isFetching } = useGetBikeByIdQuery(
    bookingData?.bikeId
  );

  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const handleconfirmBooking = async () => {
    const toastId = toast.loading("Booking in progress...");

    if (bookingData?.startTime && bookingData?.bikeId) {
      const res = (await createBooking(bookingData)) as TPostResponse<TBooking>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data?.message, { id: toastId });
        window.location.href = res.data?.data.payment_url as string;
        navigate(`/`);
      }
    } else {
      message.error("Somthing went wrong!");
    }
  };

  return (
    <div
      style={{ backgroundColor: token.colorBgContainer }}
      className="w-10/12 md:w-6/12 mx-auto rounded-lg p-10 my-10"
    >
      <p className="text-3xl font-bold text-center">Booking</p>
      <Row justify={"center"} gutter={20} className="my-5 space-y-5">
        <Space direction="vertical" className="text-lg">
          <Spin size="large" spinning={isFetching}>
            <p>
              <strong>Bike Name :</strong> {bikeData?.data?.name}
            </p>
            <p>
              <strong>Start time :</strong> {startTimeFormatted}
            </p>

            <p className="text-lg font-semibold">Advance payment: 100$</p>
            <Row justify={"center"} className="text-lg my-10">
              <Button
                type="primary"
                onClick={handleconfirmBooking}
                loading={isLoading}
              >
                Confirm booking
              </Button>
            </Row>
          </Spin>
        </Space>
      </Row>
    </div>
  );
};

export default Booking;
