import {
  Button,
  Drawer,
  Empty,
  Input,
  Popconfirm,
  Segmented,
  Select,
  Skeleton,
  Space,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import {
  useDeleteBikeMutation,
  useGetAllbikesQuery,
} from "../../../redux/features/bike/bikeApi";
import type { ColumnsType } from "antd/es/table";
import { TBike } from "../../../types/bike.type";
import { BiEdit, BiTrash } from "react-icons/bi";
import { toast } from "sonner";
import { TPostResponse } from "../../../types";

const { Search } = Input;

const BikeManagement = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<{
    key: string;
    value: string | null;
  }>({ key: "searchParams", value: null });
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

  /////search filter/////
  const onSearch = (value: string) =>
    setSearchParams({ key: "searchParams", value });

  const handleBrandFilter = (brands: string[]) => {
    const brandFilter = brands.map((brand) => ({ key: "brand", value: brand }));
    setFilterBrand(brandFilter);
  };

  const handleAvailabilityFilter = (availability: boolean | null) =>
    setFilterAvailability({ key: "isAvailable", value: availability });
  const handleSortBy = (value: string) =>
    setSortData({ key: "sort", value: value });
  const handleClearFilters = () => {
    setFilterBrand([]);
    setFilterAvailability({ key: "isAvailable", value: null });
    setSortData({ key: "sort", value: null });
  };
  /////search filter/////

  const [deleteBike] = useDeleteBikeMutation();

  /////Create Delete Update/////
  const handleDeleteBike = async (bikeId: string) => {
    const toastId = toast.loading("Deleting Bike...");
    const res = (await deleteBike(bikeId)) as TPostResponse<TBike>;

    if (res.error) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success(res.data?.message, { id: toastId });
    }
  };
  /////Create Delete Update/////

  const columns: ColumnsType<TBike> = [
    {
      title: "Bike Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "CC",
      dataIndex: "cc",
      key: "cc",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Availability",
      dataIndex: "isAvailable",
      key: "isAvailable",
      render: (text) => (text ? "Available" : "Not Available"),
    },
    {
      title: "Price per hour",
      dataIndex: "pricePerHour",
      key: "pricePerHour",
      render: (text) => `${text} $`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" onClick={() => {}}>
            <BiEdit className="text-2xl" />
          </Button>
          <Popconfirm
            title="Do you want to delete this bike?"
            onConfirm={() => {
              handleDeleteBike(record._id);
            }}
          >
            <Button type="text" danger>
              <BiTrash className="text-2xl" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-11/12 mx-auto">
      <div className="flex justify-center space-x-5 mb-10">
        <Search
          className="w-72"
          placeholder="name, model, brand..."
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

      {isFetching ? (
        <Skeleton active />
      ) : bikesData?.data?.length ? (
        <Table
          columns={columns}
          dataSource={bikesData.data}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      ) : (
        <Empty />
      )}

      <Drawer
        title="Filter"
        onClose={() => setIsFilterOpen(false)}
        open={isFilterOpen}
      >
        <Space direction="vertical" size={[0, 30]} className="w-10/12">
          <div>
            <p className="font-semibold">Availability</p>
            <Segmented<boolean | null>
              value={filterAvailability.value}
              options={[
                { label: "All", value: null },
                { label: "Available", value: true },
                { label: "Not Available", value: false },
              ]}
              onChange={handleAvailabilityFilter}
              className="w-full"
            />
          </div>
          <div>
            <p className="font-semibold">Brands</p>
            <Select
              value={filterBrand.map((brand) => brand.value)}
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
              value={sortData.value}
              allowClear
              className="w-full"
              placeholder="Sort By"
              options={[
                { value: "pricePerHour", label: "Price: Low to High" },
                { value: "-pricePerHour", label: "Price: High to Low" },
                { value: "year", label: "Year: Ascending" },
                { value: "-year", label: "Year: Descending" },
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

export default BikeManagement;
