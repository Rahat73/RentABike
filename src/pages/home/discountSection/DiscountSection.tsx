import { useState } from "react";
import { Row, Col } from "antd";

const promotions = [
  {
    id: 1,
    title: "SUMMER21",
    description:
      "Get 15% off on all bike rentals for the summer season. Use code at checkout.",
    backgroundImage:
      "url('https://via.placeholder.com/300x200?text=Summer+21')",
  },
  {
    id: 2,
    title: "WEEKENDRIDE",
    description:
      "Enjoy a 20% discount on weekend rentals. Valid for Friday-Sunday rentals.",
    backgroundImage:
      "url('https://via.placeholder.com/300x200?text=Weekend+Ride')",
  },
  {
    id: 3,
    title: "HOLIDAYRIDE",
    description:
      "Get 10% off on all bike rentals for the holiday season. Use code at checkout.",
    backgroundImage:
      "url('https://via.placeholder.com/300x200?text=Holiday+Ride')",
  },
];

const DiscountSection = () => {
  const [selectedPromotion, setSelectedPromotion] = useState("");
  console.log(selectedPromotion);
  const handlePromotionClick = (promotion: string) => {
    setSelectedPromotion(promotion);
    // Handle promotion click event (e.g., show details in a modal)
  };

  return (
    <div className="w-10/12 mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Coupons & Discounts
      </h2>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16} className="bg-white p-5 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="relative bg-cover bg-center rounded-lg shadow-md h-64 flex items-center justify-center cursor-pointer"
                style={{ backgroundImage: promo.backgroundImage }}
                onClick={() => handlePromotionClick(promo.title)}
              >
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative z-10 text-white text-center p-4">
                  <h4 className="text-xl font-bold mb-2">{promo.title}</h4>
                  <p>{promo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Col>
        <Col xs={24} lg={8}>
          <div className="bg-white rounded-lg shadow-md p-5 h-full">
            <h3 className="text-2xl font-bold mb-4">How to Apply Coupons</h3>
            <p>
              To apply a coupon code, enter the code in the "Promo Code" field
              at checkout and click "Apply". The discount will be reflected in
              your total.
            </p>
            <p>
              Ensure the coupon is valid for the items in your cart. Only one
              coupon can be applied per order.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DiscountSection;
