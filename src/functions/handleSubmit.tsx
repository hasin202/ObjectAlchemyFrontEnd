import axios, { AxiosResponse } from "axios";
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

  setResponse({ ...response, data: {}, error: {} });

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

  setLoading(true);

  try {
    const data: AxiosResponse = await axios.post(
      `https://object-alchemy-khaki.vercel.app/${endpoint}`,
      request
    );
    setResponse({ ...response, data: data.data });
    setLoading(false);
  } catch (error) {
    if (
      axios.isAxiosError<Omit<IResponse, "data">>(error) &&
      error.response?.data?.error
    ) {
      setResponse({ ...response, error: error.response?.data?.error });
    }
    setLoading(false);
  }
};

export default handleSubmit;
