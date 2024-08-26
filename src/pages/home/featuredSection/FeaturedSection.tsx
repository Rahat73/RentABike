import { Button, Card, Space } from "antd";

const { Meta } = Card;
const FeaturedSection = () => {
  return (
    <div className="mx-auto w-10/12 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Featured Bikes</h1>
      <Space size={"large"}>
        <Card
          hoverable
          style={{ width: 300 }}
          className="group"
          cover={
            <div className="overflow-hidden h-[260px]">
              <img
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            </div>
          }
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
          <Button className="mt-5">View Details</Button>
        </Card>
        <Card
          hoverable
          style={{ width: 300 }}
          className="group"
          cover={
            <div className="overflow-hidden h-[260px]">
              <img
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            </div>
          }
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
          <Button className="mt-5">View Details</Button>
        </Card>
        <Card
          hoverable
          style={{ width: 300 }}
          className="group"
          cover={
            <div className="overflow-hidden h-[260px]">
              <img
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            </div>
          }
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
          <Button className="mt-5">View Details</Button>
        </Card>
      </Space>
    </div>
  );
};

export default FeaturedSection;
