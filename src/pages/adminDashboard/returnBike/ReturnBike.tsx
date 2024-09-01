import {
  Button,
  Flex,
  message,
  Modal,
  Table,
  TimePicker,
  TimePickerProps,
} from "antd";
import {
  useGetAllBookingsQuery,
  useReturnBikeMutation,
} from "../../../redux/features/booking/bookingApi";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { TPostResponse } from "../../../types";
import { TBooking } from "../../../types/booking.type";
import { toast } from "sonner";
import { ColumnsType } from "antd/es/table";

const ReturnBike = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<TBooking | null>(null);
  const [returnTime, setReturnTime] = useState<string | null>(null);

  const handleTimeSelect: TimePickerProps["onOk"] = (value) => {
    const formattedStartTime = dayjs(value).format("YYYY-MM-DDTHH:mm:ss[Z]");
    setReturnTime(formattedStartTime);
  };

  const { data: bookingData, isFetching } = useGetAllBookingsQuery([
    // { key: "isReturned", value: false },
  ]);
  const [returnBike] = useReturnBikeMutation();

  const handleCalculateClick = (booking: TBooking) => {
    setSelectedBooking(booking);
    setIsBookingModalOpen(true);
  };

  const handleConfirmReturn = async () => {
    if (returnTime) {
      const toastId = toast.loading("Returning bike...");

      const returnBikeData = {
        bookingId: selectedBooking?._id,
        returnTime,
      };

      const res = (await returnBike(returnBikeData)) as TPostResponse<TBooking>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data?.message, { id: toastId });
        setIsBookingModalOpen(false);
      }
    } else {
      message.error("Please select return time");
    }
  };

  const columns: ColumnsType<TBooking> = [
    {
      title: "User Name",
      dataIndex: ["userId", "name"],
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: ["userId", "email"],
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: ["userId", "phone"],
      key: "phone",
    },
    {
      title: "Bike Name",
      dataIndex: ["bikeId", "name"],
      key: "bikeName",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Return Time",
      dataIndex: "returnTime",
      key: "returnTime",
      filters: [
        { text: "Returned", value: "returned" },
        { text: "Not Returned", value: "notReturned" },
      ],
      onFilter: (value, record) => {
        if (value === "returned") {
          return !!record.isReturned;
        } else {
          return !record.isReturned;
        }
      },
      render: (time) =>
        time ? dayjs(time).format("YYYY-MM-DD HH:mm") : "Not Returned",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        !record.isReturned && (
          <Button onClick={() => handleCalculateClick(record)}>
            Calculate
          </Button>
        ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={bookingData?.data}
        rowKey="_id"
        loading={isFetching}
      />
      <Modal
        title="Return Bike"
        open={isBookingModalOpen}
        onCancel={() => setIsBookingModalOpen(false)}
        onOk={handleConfirmReturn}
        okText="Confirm"
      >
        <Flex align="center" justify="center" className="my-10">
          <span className="mr-2">Return Time : </span>
          <TimePicker
            format={"HH:mm"}
            className="w-72"
            required
            onChange={(time) => {
              if (!time) {
                setReturnTime(null);
              }
            }}
            onOk={handleTimeSelect}
          />
        </Flex>
      </Modal>
    </div>
  );
};

export default ReturnBike;
