import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Col,
  Drawer,
  Empty,
  Flex,
  Input,
  Modal,
  Popconfirm,
  Row,
  Segmented,
  Select,
  Skeleton,
  Space,
  Table,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { toast } from "sonner";
import AppForm from "../../../components/form/AppForm";
import AppInputNumber from "../../../components/form/AppInpuNumber";
import AppInput from "../../../components/form/AppInput";
import {
  useCreateBikeMutation,
  useDeleteBikeMutation,
  useGetAllbikesQuery,
  useUpdateBikeInfoMutation,
} from "../../../redux/features/bike/bikeApi";
import { bikeValidationSchema } from "../../../schemas/bike.schema";
import { TPostResponse } from "../../../types";
import { TBike } from "../../../types/bike.type";

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
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState<TBike>({} as TBike);

  const handleUpdateBike = (bike: TBike) => {
    setSelectedBike(bike);
    setIsUpdateModalOpen(true);
  };

  const handleCreateBike = () => {
    setIsCreateModalOpen(true);
  };

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
          <Button type="text" onClick={() => handleUpdateBike(record)}>
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
      <Flex justify="end">
        <Button type="primary" size="large" onClick={handleCreateBike}>
          <Flex align="center" className="text-lg">
            <BiPlus /> Add Bike
          </Flex>
        </Button>
      </Flex>
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

      <BikeUpdateModal
        visible={isUpdateModalOpen}
        onCancel={() => setIsUpdateModalOpen(false)}
        bike={selectedBike}
      />

      <BikeCreateModal
        visible={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

const BikeUpdateModal = ({
  visible,
  onCancel,
  bike,
}: {
  visible: boolean;
  onCancel: () => void;
  bike: TBike;
}) => {
  const [updateBikeInfo] = useUpdateBikeInfoMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating Bike...");

    const updateData = {
      bikeId: bike._id,
      bikeInfo: data,
    };
    console.log(updateData);
    const res = (await updateBikeInfo(updateData)) as TPostResponse<TBike>;
    if (res.error) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success(res.data?.message, { id: toastId });
      onCancel();
      return true;
    }
  };

  return (
    <Modal title="Update Bike" open={visible} onCancel={onCancel} footer={null}>
      <AppForm
        onSubmit={handleSubmit}
        defaultValues={bike}
        resolver={zodResolver(bikeValidationSchema)}
      >
        <Row gutter={20}>
          <Col xs={24} md={12}>
            <AppInput type="text" name="name" label="Bike Name" />
            <AppInput type="text" name="model" label="Model" />
            <AppInput type="text" name="brand" label="Brand" />
          </Col>
          <Col xs={24} md={12}>
            <AppInputNumber name="cc" label="CC" />
            <AppInputNumber name="year" label="Year" />
            <AppInputNumber name="pricePerHour" label="Price per Hour" />
          </Col>
        </Row>
        <Flex justify="end" gap={10}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" className="">
            Update
          </Button>
        </Flex>
      </AppForm>
    </Modal>
  );
};

const BikeCreateModal = ({
  visible,
  onCancel,
}: {
  visible: boolean;
  onCancel: () => void;
}) => {
  const [createBike] = useCreateBikeMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Creating Bike...");

    const res = (await createBike(data)) as TPostResponse<TBike>;
    if (res.error) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success(res.data?.message, { id: toastId });
      onCancel();
      return true;
    }
  };

  return (
    <Modal title="Create Bike" open={visible} onCancel={onCancel} footer={null}>
      <AppForm
        onSubmit={handleSubmit}
        resolver={zodResolver(bikeValidationSchema)}
      >
        <Row gutter={20}>
          <Col xs={24} md={12}>
            <AppInput type="text" name="name" label="Bike Name" />
            <AppInput type="text" name="model" label="Model" />
            <AppInput type="text" name="brand" label="Brand" />
          </Col>
          <Col xs={24} md={12}>
            <AppInputNumber name="cc" label="CC" />
            <AppInputNumber name="year" label="Year" />
            <AppInputNumber name="pricePerHour" label="Price per Hour" />
          </Col>
        </Row>
        <AppInput type="text" name="description" label="Description" />
        <Flex justify="end" gap={10}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" className="">
            Create
          </Button>
        </Flex>
      </AppForm>
    </Modal>
  );
};

export default BikeManagement;
