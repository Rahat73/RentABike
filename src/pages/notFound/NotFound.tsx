import { Space } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  const isDarkMode = localStorage.getItem("theme");

  return (
    <div>
      <div
        className="flex flex-col items-center justify-center h-screen"
        style={{
          backgroundColor: isDarkMode === "dark" ? "#1a1a1a" : "#fff",
          color: isDarkMode === "dark" ? "#fff" : "#000",
        }}
      >
        <Space direction="vertical" align="center">
          <h1 className="text-6xl font-bold">404 - Page Not Found</h1>
          <p className="text-2xl">
            The page you are looking for does not exist. Please check your URL
            or try searching for something else.
          </p>
          <Link to="/" className="mt-4 text-blue-500 hover:underline">
            Go back to homepage
          </Link>
        </Space>
      </div>
    </div>
  );
};

export default NotFound;
