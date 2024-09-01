import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider, theme } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              // colorPrimaryBg: "red",
            },
          }}
        > */}
        <RouterProvider router={router} />
        {/* </ConfigProvider> */}
      </PersistGate>
      <Toaster position="top-right" closeButton richColors />
    </Provider>
  </StrictMode>
);
