import { TRequest } from "./types/form";

export const initialValues: TRequest = {
  schema: [
    {
      propertyName: "",
      value: "",
    },
  ],
  numberOfObjects: 1,
  extraInfo: "Each object should represent a ",
  includeImg: false,
  imagePrompt: "",
};
