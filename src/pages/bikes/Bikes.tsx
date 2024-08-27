import { Button, Card, Col, Empty, Row, Skeleton } from "antd";
import { useEffect } from "react";
import { useGetAllbikesQuery } from "../../redux/features/bike/bikeApi";
const { Meta } = Card;

const Bikes = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const { data: bikesData, isFetching } = useGetAllbikesQuery(undefined);
  console.log(bikesData);
  return (
    <div className="min-h-[80vh] w-10/12 lg:w-9/12 mx-auto my-10 rounded-lg p-10">
      <h1 className="text-3xl font-bold text-center mb-10">All Bikes</h1>
      <Row gutter={[30, 30]} justify="center">
        {isFetching ? (
          <Card
            hoverable
            className="group"
            cover={
              <Skeleton.Image
                className="overflow-hidden h-[260px]"
                style={{ width: "260px", height: "260px" }}
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
                <Meta title={bike.name} description={bike.description} />
                <Button className="mt-5">View Details</Button>
              </Card>
            </Col>
          ))
        ) : (
          <Empty />
        )}
      </Row>
    </div>
  );
};

export default Bikes;
