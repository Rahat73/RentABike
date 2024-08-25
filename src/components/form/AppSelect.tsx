import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TAppSelectProps = {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
};

const AppSelect = ({
  name,
  label,
  options,
  disabled,
  mode,
}: TAppSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            options={options}
            size="large"
            disabled={disabled}
            mode={mode}
            allowClear
          />
          {error && (
            <p style={{ color: "red", marginLeft: "5px" }}>{error.message}</p>
          )}
        </Form.Item>
      )}
    />
  );
};

export default AppSelect;
