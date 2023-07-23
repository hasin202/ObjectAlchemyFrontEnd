import { TRequest } from "../types/form";
import { FormikErrors } from "formik";

const handleCheckBoxToggle = (
  values: TRequest,
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<TRequest>>
) => {
  if (!values.includeImg && values.imagePrompt)
    setFieldValue("imagePrompt", "");
};

export default handleCheckBoxToggle;
