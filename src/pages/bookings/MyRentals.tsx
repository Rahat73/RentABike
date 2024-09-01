import {
  Button,
  Card,
  Col,
  Empty,
  Input,
  List,
  Modal,
  Row,
  Skeleton,
  Space,
  Tabs,
  TabsProps,
} from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useApplyCouponMutation,
  useGetMyBookingsQuery,
  useMakePaymentMutation,
} from "../../redux/features/booking/bookingApi";
import { TPostResponse } from "../../types";
import { TBooking } from "../../types/booking.type";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { reset, selectCoupon } from "../../redux/features/coupon/couponSlice";
import { useEffect, useState } from "react";

const MyRentals = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const { couponCode, discountPercent } = useAppSelector(selectCoupon);

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
      {couponCode && (
        <>
          <p className="text-xl last:">
            Coupon Code : <span className="font-semibold">{couponCode}</span>
          </p>
          <p className="text-lg">
            Save: <span className="font-semibold">{discountPercent}%</span>
          </p>
        </>
      )}
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userCouponCode, setUserCouponCode] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { couponCode } = useAppSelector(selectCoupon);

  const [applyCoupon, { isLoading: isCouponLoading }] =
    useApplyCouponMutation();
  const [makePayment] = useMakePaymentMutation();

  const handleApplyCoupon = async (bookingId: string) => {
    const toastId = toast.loading("Appying coupon...");

    const couponData = {
      bookingId: bookingId,
      couponCode: { couponCode: userCouponCode },
    };

    const res = (await applyCoupon(couponData)) as TPostResponse<TBooking>;

    if (res.error) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success(res.data?.message, { id: toastId });
      dispatch(reset());
      setIsModalOpen(false);
      return true;
    }
  };

  const handlePayment = async (bookingId: string) => {
    const toastId = toast.loading("Making payment...");

    const res = (await makePayment(bookingId)) as TPostResponse<TBooking>;

    if (res.error) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success(res.data?.message, { id: toastId });
      window.location.href = res.data?.data.payment_url as string;
      navigate(`/`);
    }
  };

  return (
    <>
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
                <Space>
                  <Button
                    type="dashed"
                    hidden={!booking.isReturned || booking.isCouponApplied}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Apply coupon
                  </Button>
                  <Button
                    type="primary"
                    disabled={!booking.isReturned}
                    onClick={() => handlePayment(booking._id)}
                  >
                    Pay Now
                  </Button>
                </Space>
              </>
            )}
          </Col>
        </Row>
      </Card>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => handleApplyCoupon(booking._id)}
        okButtonProps={{
          disabled: userCouponCode !== couponCode,
        }}
        okText="Apply"
        title="Apply Coupon"
        confirmLoading={isCouponLoading}
      >
        <Input
          value={userCouponCode}
          onChange={(e) => setUserCouponCode(e.target.value)}
          placeholder="Enter your coupon code"
        />
      </Modal>
    </>
  );
};

export default MyRentals;
