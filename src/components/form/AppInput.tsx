import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TAppInputProps = {
  type: string;
  name: string;
  label: string;
  disabled?: boolean;
};

const AppInput = ({ type, name, label, disabled }: TAppInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
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
