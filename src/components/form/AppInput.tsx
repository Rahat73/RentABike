import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TAppInputProps = {
  type: string;
  name: string;
  label: string;
  disabled?: boolean;
};

const AppInput = ({ type, name, label, disabled }: TAppInputProps) => {
  const isDarkMode = localStorage.getItem("theme");
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={
            <p style={{ color: isDarkMode ? "white" : "black" }}>{label}</p>
          }
        >
          <Input
            {...field}
            type={type}
            id={name}
            disabled={disabled}
            size="large"
            allowClear
          />
          {error && <p style={{ color: "red" }}>⚠️ {error.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default AppInput;
