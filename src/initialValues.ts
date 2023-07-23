import { TRequest } from "./types/form";


  export const initialValues: TRequest = {
    schema: [
      {
        propertyName: "",
        value: "",
      },
    ],
    number_of_objects: 1,
    extraInfo: "Each object should represent a ",
    includeImg: false,
    imagePrompt: "",
  };
