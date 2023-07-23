import axios, { AxiosResponse, AxiosError } from "axios";
import { TRequest } from "../types/form";
import IResponse from "../types/response";
import { Dispatch, SetStateAction } from "react";

const handleSubmit = async (
  values: TRequest,
  response: IResponse,
  setResponse: Dispatch<SetStateAction<IResponse>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  const { schema, includeImg, imagePrompt, number_of_objects, extraInfo } =
    values;

  // Reset the response state to have empty data and error objects
  setResponse((prevResponse) => ({ ...prevResponse, data: {}, error: {} }));

  const endpoint: string = includeImg ? "img" : "";
  const finalSchema: Record<string, string> = {};
  schema.forEach((element) => {
    finalSchema[element.propertyName] = element.value;
  });
  const request = {
    object: finalSchema,
    number_of_objects: number_of_objects,
    extra_info: extraInfo,
    img_info: imagePrompt,
  };

  setLoading((_) => true);

  try {
    const data: AxiosResponse = await axios.post(
      `https://object-alchemy-khaki.vercel.app/${endpoint}`,
      request
    );

    // Update the response state with the received data
    setResponse((prevResponse) => ({ ...prevResponse, data: data.data }));
    setLoading((_) => true);
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
          error: { message: "An unexpected error occurred." },
        }));
      }
    } else {
      // Handle other types of errors if needed.
      setResponse((prevResponse) => ({
        ...prevResponse,
        error: { message: "An unexpected error occurred." },
      }));
    }
    setLoading((_) => false);
  }
};

export default handleSubmit;
