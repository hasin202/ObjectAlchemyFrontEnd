import axios, { AxiosResponse } from "axios";
import { TRequest } from "../types/form";
import IResponse from "../types/response";
import { Dispatch, SetStateAction } from "react";

const handleSubmit = async (
  values: TRequest,
  setResponse: Dispatch<SetStateAction<IResponse>>
) => {
  const { schema, includeImg, imagePrompt, numberOfObjects, extraInfo } =
    values;

  // Reset the response state to have empty data and error objects
  setResponse((prevResponse) => ({ ...prevResponse, data: {}, error: {} }));

  const endpoint: string = includeImg ? "img" : "";
  let finalSchema: Record<string, string> = {};
  schema.forEach((element) => {
    finalSchema[element.propertyName] = element.value;
  });
  if (includeImg) {
    finalSchema["Image"] = "Image";
  }
  const request = {
    object: finalSchema,
    number_of_objects: numberOfObjects,
    extra_info: extraInfo,
    img_info: imagePrompt,
  };

  try {
    const data: AxiosResponse = await axios.post(
      `https://object-alchemy-khaki.vercel.app/${endpoint}`,
      request
    );

    // Update the response state with the received data
    setResponse((prevResponse) => ({ ...prevResponse, data: data.data }));
  } catch (error) {
    if (axios.isAxiosError<Omit<IResponse, "data">>(error)) {
      // Check if 'error.response.data.error' is defined and of the expected shape
      const responseError = error.response?.data?.error;
      if (typeof responseError === "object" && responseError !== null) {
        setResponse((prevResponse) => ({
          ...prevResponse,
          error: responseError as Record<string, number | string>,
        }));
      } else {
        // Handle the case where 'error.response.data.error' is not as expected
        // You can set a default error value or handle it accordingly.
        setResponse((prevResponse) => ({
          ...prevResponse,
          error: {
            message:
              "Something went wrong on our end. Try again, if this message keeps appearing then please wait and try again later",
          },
        }));
      }
    } else {
      // Handle other types of errors if needed.
      setResponse((prevResponse) => ({
        ...prevResponse,
        error: {
          message:
            "Something went wrong on our end. Try again, if this message keeps appearing then please wait and try again later",
        },
      }));
    }
  }
};

export default handleSubmit;
