import { TRequest } from "../types/form";
import { FormikErrors } from "formik";

const handleAddField = (
  values: TRequest,
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<TRequest>>
) => {
  const newProp = {
    propertyName: "",
    value: "",
  };
  setFieldValue("schema", [...values.schema, newProp]);
};

export default handleAddField;
