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
      {({ values, setFieldValue, isSubmitting }) => {
        useEffect(() => {
          handleCheckBoxToggle(values, setFieldValue);
        }, [values.includeImg]);
        useEffect(() => {
          setLoading((_) => isSubmitting);
        }, [isSubmitting]);
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
              max={values.includeImg ? 8 : 8}
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
                Include Image:
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
                      If you need help writing an image prompt check out this{" "}
                      <a
                        className="underline font-bold"
                        href="https://docs.google.com/document/d/11WlzjBT0xRpQhP9tFMtxzd0q6ANIdHPUBkMV-YB043U/edit#heading=h.sqbemjap41ye"
                      >
                        link
                      </a>
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
            <button type="submit" className={btn} disabled={isSubmitting}>
              Submit
            </button>
            {isSubmitting && (
              <div
                className="flex flex-col bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <p className="block sm:inline">
                  Requests will time out after 1 minute, so there's a current
                  limit on the number of objects you can create in one request.
                </p>
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default RequestForm;
