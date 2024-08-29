import { Button, Card, Col, Empty, Row, Skeleton, Space } from "antd";
import { useGetAllbikesQuery } from "../../../redux/features/bike/bikeApi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

const { Meta } = Card;
const FeaturedSection = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  const { data: bikesData, isFetching } = useGetAllbikesQuery([
    { key: "isAvailable", value: true },
    { key: "limit", value: 3 },
  ]);

  return (
    <div className="mx-auto w-10/12 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Featured Bikes</h1>
      <Space size={"large"}>
        <Row gutter={[30, 30]} justify="center">
          {isFetching ? (
            <Card
              hoverable
              className="group"
              cover={
                <Skeleton.Image
                  className="overflow-hidden h-[260px]"
                  style={{ width: "300px", height: "260px" }}
                  active
                />
              }
            >
              <Skeleton
                active
                title={{ width: "60%" }}
                paragraph={{ rows: 2, width: ["100%", "80%"] }}
              />
              <Skeleton.Button active block style={{ marginTop: "20px" }} />
            </Card>
          ) : bikesData?.data?.length ? (
            bikesData?.data?.map((bike) => (
              <Col key={bike._id} xs={24} md={12} lg={8}>
                <Card
                  hoverable
                  className="group"
                  cover={
                    <div className="overflow-hidden h-[260px]">
                      <img
                        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                        alt={bike.name}
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                      />
                    </div>
                  }
                >
                  <Meta
                    title={
                      <div className="flex justify-between">
                        <p>{bike.name}</p>
                        <span className="text-sm rounded-full bg-gray-200 px-2 py-1">
                          {bike?.pricePerHour} $
                        </span>
                      </div>
                    }
                    description={bike.description}
                  />
                  <Button
                    className="mt-5"
                    onClick={() => {
                      navigate(`/${user?.role}/bikes/${bike._id}`);
                    }}
                  >
                    View Details
                  </Button>
                </Card>
              </Col>
            ))
          ) : (
            <Empty />
          )}
        </Row>
      </Space>
    </div>
  );
};

export default FeaturedSection;
