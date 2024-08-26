import { Card, Col, Row } from "antd";

const WhyChooseUs = () => {
  return (
    <div className="w-10/12 mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h1>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card
            title={<p className="text-2xl font-bold">"Best Prices"</p>}
            bordered={false}
          >
            <p className="text-lg">
              We guarantee the best prices for bike rentals. Our prices are
              competitive and transparent. No hidden fees!
            </p>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title={<p className="text-2xl font-bold">"Wide Selection"</p>}
            bordered={false}
          >
            <p className="text-lg">
              We have a wide selection of bikes from top brands. From road bikes
              to mountain bikes, we have you covered.
            </p>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title={
              <p className="text-2xl font-bold">"Excellent Customer Service"</p>
            }
            bordered={false}
          >
            <p className="text-lg">
              Our customer service is top-notch. We are always available to help
              you with any questions or concerns you may have.
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default WhyChooseUs;
