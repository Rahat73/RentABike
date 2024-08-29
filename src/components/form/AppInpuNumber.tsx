import { Form, InputNumber } from "antd";
import { Controller } from "react-hook-form";

type TAppInputNumberProps = {
  name: string;
  label: string;
  disabled?: boolean;
};

const AppInputNumber = ({ name, label, disabled }: TAppInputNumberProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <InputNumber
            {...field}
            id={name}
            disabled={disabled}
            size="large"
            className="w-full"
          />
          {error && <p style={{ color: "red" }}>⚠️ {error.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default AppInputNumber;
