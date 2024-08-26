import { Button, Form, Input } from "antd";
import animationData from "../../../assets/jsons/Animation - 1724706173756.json";
import Lottie from "lottie-react";

type FieldType = {
  name?: string;
  email?: string;
  description?: string;
};

const { TextArea } = Input;

const ContactUs = () => {
  return (
    <div className="w-10/12 mx-auto p-5 rounded-r-lg bg-white">
      <p className="text-3xl font-bold text-center mb-8">Contact Us</p>
      <div className="grid grid-cols-2 ">
        <div className="col-span-1 flex justify-center items-center pr-10 border-r border-gray-300">
          <LottieAnimation />
        </div>
        <div className="pl-10 flex items-center justify-center">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

const LottieAnimation = () => {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ width: 400, height: 400 }}
    />
  );
};
export default ContactUs;
