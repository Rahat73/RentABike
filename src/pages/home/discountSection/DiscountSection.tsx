import { Col, Row } from "antd";
import { ISpinWheelProps, SpinWheel } from "spin-wheel-game";
import { useAppDispatch } from "../../../redux/hooks";
import { setCoupon } from "../../../redux/features/coupon/couponSlice";

const segments = [
  { segmentText: "SAVE10", segColor: "red" },
  { segmentText: "OFFER5", segColor: "blue" },
  { segmentText: "WIN15", segColor: "green" },
  // Add more segments as needed
];

const DiscountSection = () => {
  const dispatch = useAppDispatch();

  const handleSpinFinish = (result: string) => {
    dispatch(setCoupon({ couponCode: "SAVE10", discountPercent: 10 }));
  };

  const spinWheelProps: ISpinWheelProps = {
    segments,
    onFinished: handleSpinFinish,
    primaryColor: "black",
    contrastColor: "white",
    buttonText: "Spin",
    isOnlyOnce: true,
    size: 150,
    upDuration: 100,
    downDuration: 600,
    fontFamily: "Arial",
    arrowLocation: "top",
    showTextOnSpin: true,
    isSpinSound: false,
  };

  return (
    <div className="w-10/12 mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Coupons & Discounts
      </h2>
      <Row gutter={[24, 24]}>
        <Col
          xs={24}
          lg={16}
          className="bg-white p-5 rounded-lg flex justify-center"
        >
          <SpinWheel {...spinWheelProps} />
        </Col>
        <Col xs={24} lg={8}>
          <div className="bg-white rounded-lg shadow-md p-5 h-full space-y-3">
            <h3 className="text-2xl font-bold mb-4">How to Apply Coupons</h3>
            <p>
              Spin the wheel and get amazing discounts on your next purchase.
            </p>
            <p>
              To apply a coupon code, enter the code in the "Promo Code" field
              at checkout and click "Apply". The discount will be reflected in
              your total.
            </p>
            <p>
              Ensure the coupon is valid. Only one coupon can be applied per
              order.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DiscountSection;
