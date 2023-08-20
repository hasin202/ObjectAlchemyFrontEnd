import { TRequest } from "../types/form";
import { FormikErrors } from "formik";

const addSchemaRow = (
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

export default addSchemaRow;
