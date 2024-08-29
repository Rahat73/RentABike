import {
  Tabs,
  Button,
  Skeleton,
  List,
  Row,
  Col,
  Card,
  TabsProps,
  Empty,
} from "antd";
import { useNavigate } from "react-router-dom";
import { TBooking } from "../../types/booking.type";
import {
  useGetMyBookingsQuery,
  useMakePaymentMutation,
} from "../../redux/features/booking/bookingApi";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "sonner";
import { TPostResponse } from "../../types";

const MyRentals = () => {
  const { data: rentalData, isFetching } = useGetMyBookingsQuery(undefined);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Paid",
      children: (
        <>
          {isFetching ? (
            <Skeleton active />
          ) : (
            <List
              dataSource={rentalData?.data?.filter((booking) => booking.isPaid)}
              renderItem={(booking) => (
                <BookingItems booking={booking} showPayButton={false} />
              )}
              locale={{ emptyText: <Empty /> }}
            />
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "Unpaid",
      children: (
        <>
          {isFetching ? (
            <Skeleton active />
          ) : (
            <List
              dataSource={rentalData?.data?.filter(
                (booking) => !booking.isPaid
              )}
              renderItem={(booking) => (
                <BookingItems booking={booking} showPayButton={true} />
              )}
              locale={{ emptyText: <Empty /> }}
            />
          )}
        </>
      ),
    },
  ];

  return (
    <div className="min-h-[80vh] w-10/12 lg:w-8/12 mx-auto my-10">
      <h1 className="text-4xl font-bold text-center mb-10">My Rentals</h1>
      <Tabs defaultActiveKey="2" centered items={items} />
    </div>
  );
};

const BookingItems = ({
  booking,
  showPayButton,
}: {
  booking: TBooking;
  showPayButton: boolean;
}) => {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [makePayment] = useMakePaymentMutation();

  const handlePayment = async (bookingId: string) => {
    const toastId = toast.loading("Making payment...");

    const res = (await makePayment(bookingId)) as TPostResponse<TBooking>;

    if (res.error) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success(res.data?.message, { id: toastId });
      window.location.href = res.data?.data.payment_url as string;
      navigate(`/${user?.role}/`);
    }
  };

  return (
    <Card
      title={booking.bikeId.name}
      bordered={false}
      className="mb-4 shadow-lg"
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <p>
            <strong>Start Time:</strong>{" "}
            {new Date(booking.startTime).toLocaleString()}
          </p>
          <p>
            <strong>Return Time:</strong>{" "}
            {booking.returnTime
              ? new Date(booking.returnTime).toLocaleString()
              : "N/A"}
          </p>
        </Col>
        <Col
          xs={24}
          md={12}
          className="flex flex-col items-end justify-between"
        >
          <p className="text-lg font-bold">
            Total Cost: ${booking.totalCost.toFixed(2)}
          </p>
          {showPayButton && (
            <>
              {!booking.isReturned && <small>Return your bike first</small>}
              <Button
                type="primary"
                disabled={!booking.isReturned}
                onClick={() => handlePayment(booking._id)}
              >
                Pay Now
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default MyRentals;
