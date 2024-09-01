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
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllbikesQuery } from "../../redux/features/bike/bikeApi";
import noImage from "../../assets/images/No_Image_Available.jpg";

const { Meta } = Card;
const { Search } = Input;

const Bikes = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const searchValue = location.state?.searchValue;

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchParams, setSearchParams] = useState<{
    key: string;
    value: string | null;
  }>({ key: "searchParams", value: null });

  useEffect(() => {
    if (searchValue) {
      setSearchParams({ key: "searchParams", value: searchValue });
    }
  }, [searchValue]);

  const [filterBrand, setFilterBrand] = useState<
    { key: string; value: string }[]
  >([]);

  const [filterAvailability, setFilterAvailability] = useState<{
    key: string;
    value: boolean | null;
  }>({ key: "isAvailable", value: null });

  const [sortData, setSortData] = useState<{
    key: string;
    value: string | null;
  }>({ key: "sort", value: null });

  const { data: bikesData, isFetching } = useGetAllbikesQuery([
    searchParams,
    ...filterBrand,
    filterAvailability,
    sortData,
  ]);

  const { data: bikeBrands, isFetching: isbikeBrandsFetching } =
    useGetAllbikesQuery([]);

  const bikeBrandOptions = [
    ...new Set(bikeBrands?.data?.map((bike) => bike.brand)),
  ];

  const onSearch = (value: string) => {
    setSearchParams({ key: "searchParams", value });
  };

  const handleBrandFilter = (brands: string[]) => {
    const brandFilter = brands.map((brand) => ({
      key: "brand",
      value: brand,
    }));

    setFilterBrand(brandFilter);
  };

  const handleAvailabilityFilter = (availability: boolean | null) => {
    setFilterAvailability({ key: "isAvailable", value: availability });
  };

  const handleSortBy = (value: string) => {
    setSortData({ key: "sort", value: value });
  };

  const handleClearFilters = () => {
    setFilterBrand([]);
    setFilterAvailability({ key: "isAvailable", value: null });
    setSortData({ key: "sort", value: null });
  };

  return (
    <div className="min-h-[80vh] w-10/12 lg:w-9/12 mx-auto my-10 rounded-lg px-10">
      <h1 className="text-3xl font-bold text-center mb-10">All Bikes</h1>
      <div className="flex justify-center space-x-5 mb-10">
        <Search
          className="w-72"
          placeholder="name, model, brand..."
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          defaultValue={searchValue}
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
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                      alt={bike.name}
                      src={bike?.img_url ?? noImage}
                    />
                  </div>
                }
              >
                <Meta
                  title={
                    <div className="flex justify-between">
                      <p>{bike.name}</p>
                      <span className="text-sm rounded-full bg-gray-400 px-2 py-1">
                        {bike?.pricePerHour} $
                      </span>
                    </div>
                  }
                  description={bike.description}
                />
                <Button
                  className="mt-5"
                  onClick={() => {
                    navigate(`${bike._id}`);
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

      <Drawer
        title="Filter"
        onClose={() => setIsFilterOpen(false)}
        open={isFilterOpen}
      >
        <Space direction="vertical" size={[0, 30]} className="w-10/12">
          <div>
            <p className="font-semibold">Availability</p>
            <Segmented<boolean | null>
              value={filterAvailability?.value}
              options={[
                {
                  label: "All",
                  value: null,
                },
                {
                  label: "Available",
                  value: true,
                },
                {
                  label: "Not Available",
                  value: false,
                },
              ]}
              onChange={handleAvailabilityFilter}
              className="w-full"
            />
          </div>
          <div>
            <p className="font-semibold">Brands</p>
            <Select
              value={filterBrand?.map((brand) => brand.value)}
              mode="multiple"
              allowClear
              className="w-full"
              placeholder="Select Brands"
              loading={isbikeBrandsFetching}
              options={bikeBrandOptions.map((brand) => ({
                value: brand,
                label: brand,
              }))}
              onChange={handleBrandFilter}
            />
          </div>
          <div>
            <p className="font-semibold">Sort By</p>
            <Select
              value={sortData?.value}
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
                {
                  value: "year",
                  label: "Year: Ascending",
                },
                {
                  value: "-year",
                  label: "Price: Descending",
                },
              ]}
              onChange={handleSortBy}
            />
          </div>
        </Space>

        <Button
          type="primary"
          size="large"
          className="w-full lg:w-auto mt-8"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      </Drawer>
    </div>
  );
};

export default Bikes;
