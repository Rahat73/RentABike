import { theme, Timeline } from "antd";
import bikeImage1 from "../../assets/images/bike-1.avif";
import bikeImage2 from "../../assets/images/bike-2.avif";
import image_contactus from "../../assets/images/contactus.webp";
import image_team1 from "../../assets/images/team-1.jpg";
import image_team2 from "../../assets/images/team-2.jpg";
import image_team3 from "../../assets/images/team-3.jpg";
import { useEffect } from "react";

const { useToken } = theme;

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { token } = useToken();

  return (
    <div className="min-h-screen w-10/12 mx-auto">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>

        {/* Our Company Section */}
        <section
          style={{ backgroundColor: token?.colorBgContainer }}
          className="rounded-lg shadow-md p-8 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          <div className="col-span-1">
            <img
              src={bikeImage2}
              alt="Bike Category"
              className="object-cover w-full h-64 rounded"
            />
          </div>
          <div className="col-span-1">
            <h2 className="text-3xl font-semibold mb-4">Our Company</h2>
            <p className="text-lg mb-4">
              Welcome to RentABike, your premier destination for high-quality
              bike rentals. Whether you're exploring the city streets or
              embarking on a scenic trail, we provide a wide range of bicycles
              to suit every adventure. Our commitment to excellence ensures that
              you have a safe and enjoyable riding experience every time.
            </p>
          </div>
        </section>

        {/* Our Mission and Vision Section */}
        <section
          className="bg-black rounded-lg shadow-md p-5 mb-12 bg-fixed"
          style={{
            backgroundImage: `url(${bikeImage1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-black bg-opacity-75 rounded-lg text-white p-10">
            <div className="col-span-1">
              <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
              <p className="text-lg mb-4">
                To provide reliable and affordable bike rental services that
                promote eco-friendly transportation and support healthy, active
                lifestyles within our community.
              </p>
            </div>
            <div className="col-span-1">
              <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
              <p className="text-lg mb-4">
                To become the leading bike rental service in the region,
                recognized for our exceptional customer service, diverse bike
                selection, and unwavering commitment to sustainability.
              </p>
            </div>
          </div>
        </section>

        {/* History & Milestones Section */}
        <section
          style={{ backgroundColor: token?.colorBgContainer }}
          className="text-xl  rounded-lg shadow-md p-8 mb-12 grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          <h1 className="text-3xl font-semibold mb-4 flex justify-center items-center col-span-1">
            Our History <br className="hidden lg:block" /> &{" "}
            <br className="hidden lg:block" /> Milestones
          </h1>
          <Timeline
            className="col-span-2"
            mode={"alternate"}
            items={[
              {
                label: "2021 June 15",
                children: "RentABike Service Launched",
              },
              {
                label: "2021 July 10",
                children: "Added New Bike Models to the Fleet",
              },
              {
                label: "2021 August 25",
                children: "Introduced Weekend Rental Discounts",
              },
              {
                label: "2022 March 01",
                children: "Launched 24/7 Customer Support",
              },
              {
                label: "2022 September 15",
                children: "Reached 10,000+ Happy Customers",
              },
              {
                label: "2023 January 05",
                children: "Released Mobile App for Easy Booking",
              },
            ]}
          />
        </section>

        {/* Contact Information Section */}
        <section
          style={{ backgroundColor: token?.colorBgContainer }}
          className=" rounded-lg shadow-md p-8 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          <div className="col-span-1">
            <h2 className="text-3xl font-semibold mb-4">Contact Information</h2>
            <p className="text-lg mb-2">
              <strong>Phone:</strong> (555) 123-4567
            </p>
            <p className="text-lg mb-2">
              <strong>Email:</strong> info@rentabike.com
            </p>
            <p className="text-lg mb-2">
              <strong>Address:</strong> 123 Bike Lane, Cyclestown, BK 12345
            </p>
          </div>
          <div className="col-span-1">
            <img
              src={image_contactus}
              alt="Contact Us"
              className="object-cover w-full h-64 rounded"
            />
          </div>
        </section>

        {/* Our Team Section */}
        <section
          style={{ backgroundColor: token?.colorBgContainer }}
          className=" rounded-lg shadow-md p-8 mb-12"
        >
          <h2 className="text-3xl font-semibold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src={image_team1}
                alt="John Doe"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <img
                src={image_team2}
                alt="Jane Smith"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-600">Operations Manager</p>
            </div>
            <div className="text-center">
              <img
                src={image_team3}
                alt="Mike Johnson"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Mike Johnson</h3>
              <p className="text-gray-600">Customer Service Lead</p>
            </div>
          </div>
        </section>

        {/* Store Locations Section */}
        <section
          style={{ backgroundColor: token?.colorBgContainer }}
          className=" rounded-lg shadow-md p-8"
        >
          <h2 className="text-3xl font-semibold mb-6">Our Store Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Downtown Branch</h3>
              <p className="mb-1">123 Main Street, City Center</p>
              <p className="mb-1">Phone: (555) 987-6543</p>
              <p>Hours: Mon-Sat 9AM-9PM, Sun 10AM-6PM</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Uptown Branch</h3>
              <p className="mb-1">456 Oak Road, Uptown</p>
              <p className="mb-1">Phone: (555) 876-5432</p>
              <p>Hours: Mon-Sat 10AM-8PM, Sun 11AM-5PM</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
