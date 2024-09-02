# Project Name : RentABike

## Live website link : https://rent-a-bike.vercel.app

### Server github link : https://github.com/Rahat73/BikeRentalReservationSystem

## Introduction

**_RentABike_** : _Discover the ultimate freedom on two wheels. Our motorcycle rental service offers a wide range of bikes to suit every rider's needs. Explore new horizons and create unforgettable memories.._

## Project Description

The primary purpose of the website is to offer an easy-to-use platform where users can browse, search, compare, and book bikes for rent. It aims to streamline the rental process by providing detailed bike information, availability, and pricing, along with secure payment options. It also includes admin dashboard with functionalities like bike management, user management, coupon management, returning bikes.

## Features

1. **User Authentication & Management:**

   - User registration and login functionality.
   - Role-based access control (e.g., admin and regular users).
   - Admin can manage users, including promoting users to admin and deleting accounts.

2. **Bike Search and Filtering:**

   - Search functionality that allows users to search for bikes by name, brand, or model.
   - Advanced filtering options to narrow down bike choices based on criteria like brand, engine capacity (CC), price, and availability.
   - Sorting options to arrange bikes based on price, popularity, or other factors.

3. **Bike Details and Comparison:**

   - Detailed bike pages displaying key information such as description, price, engine capacity, year, and availability.
   - Bike comparison feature that allows users to compare up to three bikes side-by-side.

4. **Booking and Rental Management:**

   - Users can book bikes with options to select start and end times.
   - A "My Rentals" page displaying all current and past rentals, with tabs for "Paid" and "Unpaid" rentals.

5. **Payment Integration:**

   - Secure payment gateway integration with `AmarPay` for processing rental payments.
   - Option to apply promo codes or coupons during checkout to receive discounts.
   - Detailed cost breakdown during the payment process.

6. **Coupon and Discount System:**

   - A spinning wheel game that users can play to win discount codes.
   - Coupons management system for admins to create, update, and delete coupons.
   - Functionality to apply coupons at checkout, reducing the total rental cost.

7. **Responsive Design:**

   - Fully responsive layout that adapts to different screen sizes, ensuring usability across mobile devices, tablets, and desktops.
   - Tailored display of bike information and images to fit the screen dimensions.

8. **Admin Dashboard:**

   - Admin interface for managing bikes, bookings, and coupons.
   - Ability to add, update, or remove bike listings.
   - Tools for monitoring bookings and processing payments.

9. **Return Bike Management:**

   - A dedicated page for managing bike returns, with options to mark bikes as returned or not returned.
   - Functionality to calculate and display the return time, along with any additional charges for late returns.

10. **Promotions and Special Offers:**

    - A section for displaying active promotions and discounts.
    - Clear instructions on how to apply promotional codes at checkout.

11. **Dark/Light Mode:**

    - Theme switching functionality allowing users to toggle between dark and light modes, with the selected theme saved in localStorage.

12. **Error Handling and Notifications:**
    - Real-time notifications and error handling for a better user experience.
    - Toast notifications to inform users of successful actions or errors during processes like booking, payment, or coupon application.

## Technology Stack

- Frontend: React, Redux toolkit, Ant Design, Tailwind, React-hook-form, ZOD, Framer Motion etc.
- Backend: Node, Express, Mongoose, ZOD, AmarPay etc.

## Installation Guideline

### Prerequisites

- node, npm must be installed before running the project

### Configure frontend

- Clone the git repository
- Go to the file directory
- Create an .env file and add the following variables

```
VITE_CLOUD_NAME --> put the cloudname from cloudinary.com
```

- Run Command `npm install` to install required modules
- Run command `npm run dev` to start the server

### Configure server

- Clone the git repository
- Go to the file directory
- Create an .env file and add the following variables

```
PORT --> which port you want the server to run
DATABASE_URL --> Your MongoDB connection URL
```

- Run Command `npm install` to install required modules
- Run command `npm run start:dev` to start the server

## Usage

1. **User :**

   - In the home page you can search for bikes, or go to the bikes tab to view available bikes.
   - Click on 'View Details' to see bike details
   - User has to login before can book a bike. User can check/update information in `View Profile`
   - User has to select start time and pay 100 in advance to book bike.
   - While returning the bike admin will put the return time in the `Admin Dashboard`. After that payment option will be unlocked at user end
   - In the `My Rentals`page user will pay the total amount.
   - User can get coupon code by spinning wheel in the `Home` page and apply coupon in the `My rentals` page. Coupon can be applied only once in a single rental.
   - Upon payment the the rental will be moved to the from unpaid to paid tab.

2. **Admin :**
   - In the `Dashboard` page admin can manage bikes, users, coupon, and return bikes from users.
