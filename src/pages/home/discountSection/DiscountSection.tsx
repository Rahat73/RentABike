import { Col, Modal, Row, Space, Spin } from "antd";
import { ISpinWheelProps, SpinWheel } from "spin-wheel-game";
import { useAppDispatch } from "../../../redux/hooks";
import { setCoupon } from "../../../redux/features/coupon/couponSlice";
import { useState } from "react";
import { useGetAllCouponsQuery } from "../../../redux/features/coupon/couponApi";
import CopyToClipboardButton from "../../../components/ui/CopyToClipboardButton";

const DiscountSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<{
    couponCode: string;
    discountPercent: number;
  } | null>(null);

  const dispatch = useAppDispatch();

  const { data, isFetching } = useGetAllCouponsQuery(undefined);

  const predefinedColors = ["red", "blue", "green", "orange", "purple"];

  const segments =
    data?.data?.map(
      (
        coupon: { couponCode: string; discountPercent: number },
        index: number
      ) => ({
        segmentText: coupon.couponCode,
        segColor: predefinedColors[index % predefinedColors.length],
        discountPercent: coupon.discountPercent,
      })
    ) || [];

  const handleSpinFinish = (result: string) => {
    const selectedSegment = segments.find(
      (segment) => segment.segmentText === result
    );
    if (selectedSegment) {
      setSelectedCoupon({
        couponCode: selectedSegment.segmentText,
        discountPercent: selectedSegment.discountPercent,
      });
      dispatch(
        setCoupon({
          couponCode: selectedSegment.segmentText,
          discountPercent: selectedSegment.discountPercent,
        })
      );
    }
    setIsOpen(true);
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
    isSpinSound: true,
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
          <Spin size="large" spinning={isFetching}>
            {segments.length > 0 ? <SpinWheel {...spinWheelProps} /> : null}
          </Spin>
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

      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => setIsOpen(false)}
      >
        <Space direction="vertical">
          <p className="text-3xl font-bold">You won !!!</p>
          <p className="text-2xl font-semibold">
            Coupon Code: "{selectedCoupon?.couponCode}"{" "}
            <CopyToClipboardButton
              content={selectedCoupon?.couponCode as string}
            />
          </p>
          <p className="text-xl">
            Apply the code and get discount of {selectedCoupon?.discountPercent}
            % in you next booking
          </p>
        </Space>
      </Modal>
    </div>
  );
};

export default DiscountSection;
