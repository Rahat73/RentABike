import { Button, Empty, Popconfirm, Skeleton, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { BiEdit, BiTrash } from "react-icons/bi";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useMakeAdminMutation,
} from "../../../redux/features/user/userApi";
import { TUserInfo } from "../../../types/loginRegistration.type";
import { toast } from "sonner";
import { TPostResponse } from "../../../types";
import { useEffect } from "react";

const UserManagement = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const { data: userList, isFetching } = useGetAllUsersQuery(undefined);
  const [deleteUser] = useDeleteUserMutation();
  const [makeAdmin] = useMakeAdminMutation();

  console.log(userList?.data);

  const handleDeleteUser = async (userId: string) => {
    const toastId = toast.loading("Deleting user...");
    const res = (await deleteUser(userId)) as TPostResponse<TUserInfo>;
    if (res.error) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success(res.data?.message, { id: toastId });
    }
  };

  const handlePromoteUser = async (userId: string) => {
    const toastId = toast.loading("Promoting user...");
    const res = (await makeAdmin(userId)) as TPostResponse<TUserInfo>;
    if (res.error) {
      toast.error(res.error.data.message, { id: toastId });
    } else {
      toast.success(res.data?.message, { id: toastId });
    }
  };

  const columns: ColumnsType<TUserInfo> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Adress",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "green" : "blue"}>{role}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          {record.role !== "admin" && (
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDeleteUser(record._id)}
            >
              <Button type="text" danger>
                <BiTrash className="text-2xl" />
              </Button>
            </Popconfirm>
          )}
          {record.role !== "admin" && (
            <Popconfirm
              title="Are you sure you want to promote this user?"
              onConfirm={() => handlePromoteUser(record._id)}
            >
              <Button type="text">
                <BiEdit className="text-2xl" /> Promote to Admin
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="w-11/12 mx-auto">
      {isFetching ? (
        <Skeleton active />
      ) : userList?.data?.length ? (
        <Table
          columns={columns}
          dataSource={userList.data}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default UserManagement;
