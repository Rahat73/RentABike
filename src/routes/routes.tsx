import { createBrowserRouter } from "react-router-dom";

import AboutUs from "../pages/aboutUs/AboutUs";
import Home from "../pages/home/Home";
import App from "../App";
import Login from "../pages/loginRegister/Login";
import Register from "../pages/loginRegister/Register";
import PrivacyPolicy from "../pages/ppts/PrivacyPolicy";
import TermsOfService from "../pages/ppts/TermsOfService";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import UserProfile from "../pages/userProfile/UserProfile";
import Bikes from "../pages/bikes/Bikes";
import BikeDetails from "../pages/bikes/BikeDetails";
import Booking from "../pages/bookings/Booking";
import MyRentals from "../pages/bookings/MyRentals";
import Payment from "../pages/payment/Payment";

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
      {
        path: "payment/:bookingId",
        element: <Payment />,
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
      {
        path: "payment/:bookingId",
        element: <Payment />,
      },
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
