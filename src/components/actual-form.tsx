import { Field, Form, useFormikContext } from "formik";
import { TRequest } from "../types/form";
import { useEffect, Dispatch, SetStateAction } from "react";
import renderSchemaFields from "../functions/render-schema-fields";
import toggleCheckBox from "../functions/toggle-check-box";
import addSchemaRow from "../functions/add-schema-row";
import { input, btn } from "../styles";

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const ActualForm: React.FC<Props> = ({ setLoading }) => {
  const { values, setFieldValue, isSubmitting } = useFormikContext<TRequest>();

  useEffect(() => {
    toggleCheckBox(values, setFieldValue);
  }, [values.includeImg]);

  useEffect(() => {
    setLoading(() => isSubmitting);
  }, [isSubmitting]);

  return (
    <Form className="flex flex-col gap-4">
      {renderSchemaFields(values, setFieldValue)}
      <button
        type="button"
        onClick={() => addSchemaRow(values, setFieldValue)}
        className={btn}
      >
        Add Field
      </button>
      <label htmlFor="number-of-objects">Number of objects:</label>
      <Field
        id="number-of-objects"
        name="numberOfObjects"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFieldValue(`numberOfObjects`, e.target.value)
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
          htmlFor="include-img"
          className="flex items-center italic font-bold mr-4"
        >
          Include Image:
        </label>
        <Field id="include-img" type="checkbox" name="includeImg" />
      </div>
      {values.includeImg && (
        <>
          <div
            className="flex flex-col bg-purple-100 border border-purple-400 text-purple-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <p className="text-lg font-bold">Please note that:</p>
            <ul className="list-disc list-inside">
              <li>
                If you need help writing an image prompt check out this{" "}
                <a
                  className="underline font-bold"
                  href="https://docs.google.com/document/d/11WlzjBT0xRpQhP9tFMtxzd0q6ANIdHPUBkMV-YB043U/edit#heading=h.sqbemjap41ye"
                  target="_blank"
                >
                  link
                </a>
              </li>
              <li>
                The provided link for generating images will be active for 2
                hours only. If you wish to keep the image permanently, please
                download it within this timeframe.
              </li>
            </ul>
          </div>
          <label htmlFor="image-prompt">Image prompt:</label>
          <Field
            id="image-prompt"
            name="imagePrompt"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFieldValue(`imagePrompt`, e.target.value)
            }
            className={input}
          />
        </>
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
            Requests will time out after 1 minute, so there's a current limit on
            the number of objects you can create in one request.
          </p>
        </div>
      )}
    </Form>
  );
};

export default ActualForm;
