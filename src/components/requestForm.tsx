import React, { Dispatch, SetStateAction } from "react";
import { Formik } from "formik";
import { initialValues } from "../initialValues";
import handleSubmit from "../functions/handleSubmit";
import IResponse from "../types/response";
import ActualForm from "./ActualForm";

interface Props {
  setResponse: Dispatch<SetStateAction<IResponse>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const RequestForm: React.FC<Props> = ({ setResponse, setLoading }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await handleSubmit(values, setResponse);
      }}
      enableReinitialize={true}
    >
      {() => <ActualForm setLoading={setLoading} />}
    </Formik>
  );
};

export default RequestForm;
