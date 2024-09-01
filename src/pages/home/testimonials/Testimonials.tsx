import { Avatar, Carousel, Rate, Space, theme } from "antd";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "./testiminials.css";
import { UserOutlined } from "@ant-design/icons";

const contentStyle: React.CSSProperties = {
  margin: 0,
  textAlign: "center",
  padding: "20px",
  borderRadius: "8px",
};

const { useToken } = theme;

const Testimonials = () => {
  const { token } = useToken();

  return (
    <div
      style={{ backgroundColor: token.colorBgContainer }}
      className="w-10/12 mx-auto  p-5 rounded-lg shadow-lg"
    >
      <p className="text-3xl font-bold mb-8 text-center">Testimonials</p>
      <Carousel
        autoplay
        draggable
        pauseOnHover
        className=" cursor-pointer select-none custom-carousel"
        arrows
      >
        <div className="mb-5 text-center">
          <Space direction="horizontal">
            <Avatar size="large" icon={<UserOutlined />} />
            <Space direction="vertical" size={0} align="start">
              <p>John Doe</p>
              <Rate allowHalf disabled defaultValue={5} />
            </Space>
          </Space>
          <h3 style={contentStyle}>
            <FaQuoteLeft className="inline-block mr-2" />
            <p className="text-lg w-1/2 mx-auto">
              Renting a bike from this service was a fantastic experience! The
              bike was in great condition, and the ride was smooth and
              enjoyable.
            </p>
            <FaQuoteRight className="inline-block ml-2" />
          </h3>
        </div>
        <div className="mb-5 text-center">
          <Space direction="horizontal">
            <Avatar size="large" icon={<UserOutlined />} />
            <Space direction="vertical" size={0} align="start">
              <p>Alice Smith</p>
              <Rate allowHalf disabled defaultValue={4.5} />
            </Space>
          </Space>
          <h3 style={contentStyle}>
            <FaQuoteLeft className="inline-block mr-2" />
            <p className="text-lg w-1/2 mx-auto">
              The customer service was outstanding, and the entire process was
              hassle-free. I would definitely recommend it to my friends!
            </p>
            <FaQuoteRight className="inline-block ml-2" />
          </h3>
        </div>
        <div className="mb-5 text-center">
          <Space direction="horizontal">
            <Avatar size="large" icon={<UserOutlined />} />
            <Space direction="vertical" size={0} align="start">
              <p>Bob Johnson</p>
              <Rate allowHalf disabled defaultValue={5} />
            </Space>
          </Space>
          <h3 style={contentStyle}>
            <FaQuoteLeft className="inline-block mr-2" />
            <p className="text-lg w-1/2 mx-auto">
              The variety of bikes available was impressive, and I found the
              perfect one for my trip. I'll be back for my next adventure!
            </p>
            <FaQuoteRight className="inline-block ml-2" />
          </h3>
        </div>
        <div className="mb-5 text-center">
          <Space direction="horizontal">
            <Avatar size="large" icon={<UserOutlined />} />
            <Space direction="vertical" size={0} align="start">
              <p>Sarah Lee</p>
              <Rate allowHalf disabled defaultValue={4.5} />
            </Space>
          </Space>
          <h3 style={contentStyle}>
            <FaQuoteLeft className="inline-block mr-2" />
            <p className="text-lg w-1/2 mx-auto">
              Great value for money! The rental rates were reasonable, and the
              quality of the bikes exceeded my expectations.
            </p>
            <FaQuoteRight className="inline-block ml-2" />
          </h3>
        </div>
      </Carousel>
    </div>
  );
};

export default Testimonials;
