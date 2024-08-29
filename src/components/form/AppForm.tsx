import { Form } from "antd";
import { ReactNode, useEffect } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: DefaultValues<FieldValues>;
  resolver?: any;
};

type TAppFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const AppForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TAppFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  const submitHandler: SubmitHandler<FieldValues> = async (data) => {
    const isSuccess = await onSubmit(data);
    if (isSuccess) {
      methods.reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submitHandler)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default AppForm;
