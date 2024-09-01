import { ConfigProvider, FloatButton, theme } from "antd";
import { useEffect, useState } from "react";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import MainLayout from "./components/layout/MainLayout";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark" || false
  );

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          // colorPrimaryBg: "red",
        },
      }}
    >
      <MainLayout />
      <FloatButton
        icon={isDarkMode ? <MdSunny /> : <IoMdMoon />}
        className="-translate-y-24 w-14 h-14"
        onClick={toggleTheme}
      />
    </ConfigProvider>
  );
}

export default App;
