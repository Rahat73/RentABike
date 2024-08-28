import { DownOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Dropdown,
  Layout,
  Menu,
  Row,
  Skeleton,
  Space,
} from "antd";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  logout,
  selectCurrentToken,
  TUser,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { useGetUserInfoQuery } from "../../redux/features/user/userApi";
const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);

  const user = token && (verifyToken(token) as TUser);

  const { data: userInfo, isFetching } = useGetUserInfoQuery(undefined);

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    {
      key: "home",
      label: <NavLink to={user ? `/${user?.role}/` : "/"}>Home</NavLink>,
    },
    {
      key: "about-us",
      label: (
        <NavLink to={user ? `/${user?.role}/about-us` : "/about-us"}>
          About Us
        </NavLink>
      ),
    },
    ...(user
      ? [
          {
            key: "bikes",
            label: <NavLink to={`/${user?.role}/bikes`}>Bikes</NavLink>,
          },
          {
            key: "my-rentals",
            label: (
              <NavLink to={`/${user?.role}/my-rentals`}>My Rentals</NavLink>
            ),
          },
        ]
      : []),
  ];

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          width: "100%",
          display: "flex",
          alignItems: "center",
          height: "56px",
          backgroundColor: "white",
        }}
      >
        <p className="text-3xl font-bold">RentABike</p>
        <Menu
          // theme="dark"
          mode="horizontal"
          items={menuItems}
          style={{
            flex: 1,
            minWidth: 0,
            justifyContent: "center",
            height: "56px",
          }}
        />
        {user ? (
          <Dropdown
            trigger={["click"]}
            arrow
            dropdownRender={() => (
              <div className="bg-white p-4 rounded-lg w-60">
                <Menu>
                  <Menu.Item
                    onClick={() => navigate(`/${user?.role}/user-profile`)}
                  >
                    View Profile
                  </Menu.Item>
                </Menu>
                <Divider style={{ margin: 5 }} />
                <Space align="end">
                  <Button onClick={handleLogout} danger type="primary">
                    Logout
                  </Button>
                </Space>
              </div>
            )}
          >
            {isFetching ? (
              <div className="flex items-center cursor-pointer space-x-2 translate-y-4">
                <Skeleton.Avatar active />
                <Skeleton.Input active />
              </div>
            ) : (
              <div className="flex items-center cursor-pointer space-x-2">
                <Avatar icon={<UserOutlined />} />
                <span className="font-semibold text-base">
                  {userInfo?.data?.name}
                </span>
                <DownOutlined />
              </div>
            )}
          </Dropdown>
        ) : (
          <>
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/register")}>Sign Up</Button>
          </>
        )}
      </Header>
      <Content className="min-h-[80vh]">
        <div>
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{ textAlign: "center" }}
        className="bg-slate-800 text-white"
      >
        <Row>
          <Col span={12} className="flex flex-col">
            <Link to="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="underline">
              Terms of service
            </Link>
            <p>Copyright © 2024. All Rights Reserved.</p>
            <p>RentABike</p>
          </Col>
          <Col span={12} className="flex flex-col justify-center items-center">
            <div className="mb-3">
              <p>Contact Us</p>
              <p>Phone: 123-456-7890</p>
              <p>Email: rentAbike@example.com</p>
            </div>
            <Row className="text-3xl space-x-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSquareFacebook />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSquareXTwitter />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSquareInstagram />
              </a>
            </Row>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
