import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import AdminDashboard from "../components/layout/AdminDashboard";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import AboutUs from "../pages/aboutUs/AboutUs";
import BikeManagement from "../pages/adminDashboard/bikeManagement/BikeManagement";
import CouponManagement from "../pages/adminDashboard/couponManagement/CouponManagement";
import ReturnBike from "../pages/adminDashboard/returnBike/ReturnBike";
import UserManagement from "../pages/adminDashboard/userManagement/UserManagement";
import BikeDetails from "../pages/bikes/BikeDetails";
import Bikes from "../pages/bikes/Bikes";
import Booking from "../pages/bookings/Booking";
import MyRentals from "../pages/bookings/MyRentals";
import Home from "../pages/home/Home";
import Login from "../pages/loginRegister/Login";
import Register from "../pages/loginRegister/Register";
import PrivacyPolicy from "../pages/ppts/PrivacyPolicy";
import TermsOfService from "../pages/ppts/TermsOfService";
import UserProfile from "../pages/userProfile/UserProfile";
import BikeComparison from "../pages/bikeComparison/BikeComparison";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },

      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "bike-comparison",
        element: <BikeComparison />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "bikes",
        element: <Bikes />,
      },
      {
        path: "bikes/:bikeId",
        element: <BikeDetails />,
      },
      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "my-rentals",
        element: <MyRentals />,
      },
      // {
      //   path: "payment/:bookingId",
      //   element: <Payment />,
      // },
      {
        path: "dashboard",
        element: <AdminDashboard />,
        children: [
          {
            path: "bike-management",
            element: <BikeManagement />,
          },
          {
            path: "user-management",
            element: <UserManagement />,
          },
          {
            path: "return-bike",
            element: <ReturnBike />,
          },
          {
            path: "coupon-management",
            element: <CouponManagement />,
          },
        ],
      },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "bikes",
        element: <Bikes />,
      },
      {
        path: "bikes/:bikeId",
        element: <BikeDetails />,
      },
      {
        path: "my-rentals",
        element: <MyRentals />,
      },
      // {
      //   path: "payment/:bookingId",
      //   element: <Payment />,
      // },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
