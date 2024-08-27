import {
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  Input,
  Row,
  Segmented,
  Select,
  Skeleton,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import { useGetAllbikesQuery } from "../../redux/features/bike/bikeApi";

const { Meta } = Card;
const { Search } = Input;

const Bikes = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: bikesData, isFetching } = useGetAllbikesQuery(undefined);

  const bikeBrandOptions = [
    ...new Set(bikesData?.data?.map((bike) => bike.brand)),
  ];
  console.log(bikeBrandOptions);

  const onSearch = () => {};

  return (
    <div className="min-h-[80vh] w-10/12 lg:w-9/12 mx-auto my-10 rounded-lg px-10">
      <h1 className="text-3xl font-bold text-center mb-10">All Bikes</h1>
      <div className="flex justify-center space-x-5 mb-10">
        <Search
          className="w-72"
          placeholder="Search bikes"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
        <Button
          size="large"
          className="w-40"
          onClick={() => setIsFilterOpen(true)}
        >
          Filter
        </Button>
      </div>
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
                <Meta title={bike.name} description={bike.description} />
                <Button className="mt-5">View Details</Button>
              </Card>
            </Col>
          ))
        ) : (
          <Empty />
        )}
      </Row>

      <Drawer
        title="Filter"
        onClose={() => setIsFilterOpen(false)}
        open={isFilterOpen}
      >
        <Space direction="vertical" size={[0, 30]} className="w-10/12">
          <div>
            <p className="font-semibold">Availability</p>
            <Segmented<string>
              options={["All", "Available", "Not Available"]}
              onChange={(value) => {
                console.log(value);
              }}
              className="w-full"
            />
          </div>
          <div>
            <p className="font-semibold">Brands</p>
            <Select
              mode="multiple"
              allowClear
              className="w-full"
              placeholder="Select Brands"
              options={bikeBrandOptions.map((brand) => ({
                value: brand,
                label: brand,
              }))}
            />
          </div>
          <div>
            <p className="font-semibold">Sort By Price</p>
            <Select
              allowClear
              className="w-full"
              placeholder="Sort By"
              options={[
                {
                  value: "pricePerHour",
                  label: "Price: Low to High",
                },
                {
                  value: "-pricePerHour",
                  label: "Price: High to Low",
                },
              ]}
            />
          </div>
          <div>
            <p className="font-semibold">Sort By Year</p>
            <Select
              allowClear
              className="w-full"
              placeholder="Sort By"
              options={[
                {
                  value: "year",
                  label: "Year: Ascending",
                },
                {
                  value: "-year",
                  label: "Price: Descending",
                },
              ]}
            />
          </div>
        </Space>
      </Drawer>
    </div>
  );
};

export default Bikes;
