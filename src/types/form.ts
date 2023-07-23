type TFormRow = {
    propertyName: string;
    value: string;
  };

export type TRequest = {
    schema: TFormRow[];
    number_of_objects: number;
    extraInfo: string;
    includeImg: boolean,
    imagePrompt: string
};

