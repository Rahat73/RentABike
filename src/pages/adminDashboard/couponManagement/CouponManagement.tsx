import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex, Modal, Popconfirm, Row, Spin, theme } from "antd";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { BiPlus, BiTrash } from "react-icons/bi";
import { toast } from "sonner";
import AppForm from "../../../components/form/AppForm";
import AppInputNumber from "../../../components/form/AppInpuNumber";
import AppInput from "../../../components/form/AppInput";
import {
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
} from "../../../redux/features/coupon/couponApi";
import { couponValidationSchema } from "../../../schemas/coupon.schema";
import { TPostResponse } from "../../../types";
import { TCouponInfo } from "../../../types/coupon.type";

const CouponManagement = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const { token } = theme.useToken();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: couponData, isFetching } = useGetAllCouponsQuery(undefined);
  const [createCoupon, { isLoading }] = useCreateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const handleCreateCoupon: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating coupon...");

    const res = (await createCoupon(data)) as TPostResponse<TCouponInfo>;
    if (res.error) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success(res.data?.message, { id: toastId });
      setIsModalOpen(false);
      return true;
    }
  };

  const handleDeleteCoupon = async (couponId: string) => {
    const toastId = toast.loading("Deleting coupon...");
    const res = (await deleteCoupon(couponId)) as TPostResponse<TCouponInfo>;
    if (res.error) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success(res.data?.message, { id: toastId });
    }
  };

  return (
    <div className="my-5">
      <Flex justify="end" align="center" className="mb-5">
        <Button
          type="primary"
          icon={<BiPlus />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Coupon
        </Button>
      </Flex>
      <Flex justify="center" align="center" className=" min-h-40">
        <Spin size="large" spinning={isFetching}>
          <Row gutter={[24, 24]}>
            {couponData?.data?.map((data) => (
              <Col key={data._id}>
                <div
                  style={{ backgroundColor: token.colorPrimaryBg }}
                  className=" border-dashed border-4 p-3 font-semibold"
                >
                  <p>Coupon Code : {data.couponCode}</p>
                  <p>Discount % : {data.discountPercent}</p>
                  <Flex justify="end">
                    <Popconfirm
                      title="Are you sure?"
                      onConfirm={() => handleDeleteCoupon(data._id)}
                    >
                      <Button type="text">
                        <BiTrash className="text-red-500 text-2xl text-right" />
                      </Button>
                    </Popconfirm>
                  </Flex>
                </div>
              </Col>
            ))}
          </Row>
        </Spin>
      </Flex>

      <Modal
        title="Add Coupon"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <AppForm
          onSubmit={handleCreateCoupon}
          resolver={zodResolver(couponValidationSchema)}
        >
          <AppInput type="text" name="couponCode" label="Coupon Code" />
          <AppInputNumber name="discountPercent" label="Discount %" />
          <Flex justify="end" gap={10}>
            <Button onClick={() => setIsModalOpen(false)} loading={isLoading}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="">
              Add
            </Button>
          </Flex>
        </AppForm>
      </Modal>
    </div>
  );
};

export default CouponManagement;
