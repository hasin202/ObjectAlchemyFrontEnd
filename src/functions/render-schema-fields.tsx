import { TRequest } from "../types/form";
import { Field, FormikErrors } from "formik";
import { input, btn } from "../styles";

const renderSchemaFields = (
  values: TRequest,
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<TRequest>>
) =>
  values.schema.map((_, i) => (
    <div className="flex max-[600px]:flex-col gap-4" key={i}>
      <div className="flex gap-4 w-full ">
        <div className="flex grow flex-col gap-2">
          <label
            htmlFor={`schema.${i}.propertyName`}
            className="font-bold visible"
          >
            {`Property name ${i + 1}:`}
          </label>
          <Field
            name={`schema.${i}.propertyName`}
            id={`schema.${i}.propertyName`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFieldValue(`schema.${i}.propertyName`, e.target.value)
            }
            className={`${input} w-full `}
          />
        </div>
        <div className="flex grow flex-col gap-2">
          <label
            htmlFor={`schema.${i}.propertyName`}
            className="font-bold visible"
          >
            {`Data type ${i + 1}:`}{" "}
          </label>
          <Field
            name={`schema.${i}.value`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFieldValue(`schema.${i}.value`, e.target.value)
            }
            className={input}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          setFieldValue(
            "schema",
            values.schema.filter((_, index) => index !== i)
          )
        }
        className={`${btn} mt-6 max-[600px]:mt-0 max-[600px]:flex max-[600px]:justify-end	 `}
        disabled={i === 0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 -960 960 960"
          width="20"
          className="fill-white"
        >
          <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
        </svg>
      </button>
    </div>
  ));
export default renderSchemaFields;
