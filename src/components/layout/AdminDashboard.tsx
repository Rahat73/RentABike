import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps, theme } from "antd";
import { useEffect } from "react";
import { FaMotorcycle } from "react-icons/fa6";
import { IoReturnDownForwardOutline } from "react-icons/io5";
import { RiCoupon2Fill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";

const { Content, Sider } = Layout;

const items2: MenuProps["items"] = [
  {
    key: "bike-management",
    icon: <FaMotorcycle />,
    label: <NavLink to="/dashboard/bike-management">Bike Management</NavLink>,
  },
  {
    key: "user-management",
    icon: <UserOutlined />,
    label: <NavLink to="/dashboard/user-management">User Management</NavLink>,
  },
  {
    key: "return-bike",
    icon: <IoReturnDownForwardOutline />,
    label: <NavLink to="/dashboard/return-bike">Return Bike</NavLink>,
  },
  {
    key: "coupon-management",
    icon: <RiCoupon2Fill />,
    label: <NavLink to="/dashboard/coupon-management">Coupon</NavLink>,
  },
];

const AdminDashboard = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const { token } = theme.useToken();

  return (
    <Layout>
      <Layout>
        <Sider
          breakpoint="md"
          width={200}
          style={{
            height: "65vh",
            position: "sticky",
            top: "56px",
            left: 0,
            backgroundColor: token.colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["bike-management"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 20,
              minHeight: 280,
              borderRadius: 10,
              backgroundColor: token.colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
