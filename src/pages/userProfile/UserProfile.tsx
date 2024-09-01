import { Button, Skeleton, Spin, Tag, theme } from "antd";
import AppForm from "../../components/form/AppForm";
import AppInput from "../../components/form/AppInput";
import {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
} from "../../redux/features/user/userApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TPostResponse } from "../../types";
import { TUserInfo } from "../../types/loginRegistration.type";
import { useEffect } from "react";

const UserProfile = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const { token } = theme.useToken();

  const { data: userInfo, isFetching } = useGetUserInfoQuery(undefined);
  const [updateUserInfo] = useUpdateUserInfoMutation();

  if (!userInfo) {
    return (
      <Skeleton
        paragraph
        active
        className="w-10/12 mx-auto md:w-1/2 lg:w-1/4 bg-white my-10"
      />
    );
  }

  const defaultValues = {
    name: userInfo?.data?.name,
    email: userInfo?.data?.email,
    phone: userInfo?.data?.phone,
    address: userInfo?.data?.address,
  };

  const handleUpdateProfile: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating user info...");

    const updateData = {
      name: data.name,
      phone: data.phone,
      address: data.address,
    };

    try {
      const res = (await updateUserInfo(
        updateData
      )) as TPostResponse<TUserInfo>;
      if (res.error) {
        toast.error(res.error?.data.message, { id: toastId });
      } else {
        toast.success("Profile updated successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong !", { id: toastId });
      console.error(error);
    }
  };

  return (
    <div
      style={{ backgroundColor: token.colorBgContainer }}
      className="w-10/12 mx-auto md:w-1/2 lg:w-1/2 my-10"
    >
      <div className="p-10 border-2 border-dashed">
        <Spin spinning={isFetching}>
          <p className="text-center text-2xl font-bold mb-5">
            Welcome Back, {userInfo?.data?.name}
            <Tag className="uppercase ml-3 -translate-y-1" color="blue">
              {userInfo?.data?.role}
            </Tag>
          </p>
          <AppForm onSubmit={handleUpdateProfile} defaultValues={defaultValues}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <AppInput type="text" name="name" label="Name" />
                <AppInput type="text" name="email" label="Email" disabled />
              </div>
              <div className="col-span-1">
                <AppInput type="text" name="phone" label="Phone" />
                <AppInput type="text" name="address" label="Address" />
              </div>
            </div>
            <div className="text-center mt-10">
              <Button htmlType="submit" className="w-full md:w-auto">
                Update
              </Button>
            </div>
          </AppForm>
        </Spin>
      </div>
    </div>
  );
};

export default UserProfile;
