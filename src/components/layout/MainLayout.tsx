import { Button, Col, Layout, Menu, Row } from "antd";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { Link, NavLink, Outlet } from "react-router-dom";
const { Header, Content, Footer } = Layout;
const items = [
  {
    key: "home",
    label: <NavLink to={`/`}>Home</NavLink>,
  },
  {
    key: "about-us",
    label: <NavLink to={`/about-us`}>About Us</NavLink>,
  },
];

const MainLayout = () => {
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
        }}
      >
        {/* <img src={logo} className="w-[300px]" /> */}
        <p className="text-white">RentABike</p>
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{ flex: 1, minWidth: 0, justifyContent: "center" }}
        />
        <Button>Logout</Button>
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
