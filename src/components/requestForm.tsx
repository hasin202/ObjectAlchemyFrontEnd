import React, { useEffect, Dispatch, SetStateAction } from "react";
import { Formik, Form, Field } from "formik";
import renderFields from "../functions/renderFields";
import { input, btn } from "../styles";
import { initialValues } from "../initialValues";
import handleCheckBoxToggle from "../functions/checkboxToggle";
import handleAddField from "../functions/addField";
import handleSubmit from "../functions/handleSubmit";
import IResponse from "../types/response";

interface Props {
  response: IResponse;
  setResponse: Dispatch<SetStateAction<IResponse>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const RequestForm: React.FC<Props> = ({
  response,
  setResponse,
  setLoading,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        handleSubmit(values, response, setResponse, setLoading);
      }}
      enableReinitialize={true}
    >
      {({ values, setFieldValue }) => {
        useEffect(() => {
          handleCheckBoxToggle(values, setFieldValue);
        }, [values.includeImg]);
        return (
          <Form className="flex flex-col gap-4">
            {renderFields(values, setFieldValue)}
            <button
              type="button"
              onClick={() => handleAddField(values, setFieldValue)}
              className={btn}
            >
              Add Field
            </button>
            <label htmlFor="number_of_objects">Number of objects:</label>
            <Field
              id="number_of_objects"
              name="number_of_objects"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue(`number_of_objects`, e.target.value)
              }
              className={input}
              type="number"
              min="1"
              max={values.includeImg ? 8 : 12}
            />

            <label htmlFor="extraInfo">Extra information:</label>
            <Field
              id="extraInfo"
              name="extraInfo"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue(`extraInfo`, e.target.value)
              }
              className={input}
            />
            <div className="flex">
              <label
                htmlFor="includeImg"
                className="flex items-center italic font-bold mr-4"
              >
                Include Imgae:
              </label>
              <Field id="includeImg" type="checkbox" name="includeImg" />
            </div>
            {values.includeImg ? (
              <>
                <div
                  className="flex flex-col bg-purple-100 border border-purple-400 text-purple-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <p className="text-lg font-bold">Please note that:</p>
                  <ul className="list-disc list-inside">
                    <li>
                      To generate an image, set the property value to "Image"
                    </li>
                    <li>
                      The provided link for generating images will be active for
                      2 hours only. If you wish to keep the image permanently,
                      please download it within this timeframe.
                    </li>
                  </ul>
                </div>
                <label htmlFor="imagePrompt">Image prompt:</label>
                <Field
                  id="imagePrompt"
                  name="imagePrompt"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldValue(`imagePrompt`, e.target.value)
                  }
                  className={input}
                />
              </>
            ) : (
              ""
            )}
            <button type="submit" className={btn}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RequestForm;
