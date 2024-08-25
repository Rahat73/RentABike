import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TAppInputProps = {
  type: string;
  name: string;
  label: string;
  disabled?: boolean;
};

const AppInputPassword = ({ type, name, label, disabled }: TAppInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Input.Password
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

export default AppInputPassword;
