type TFormRow = {
  propertyName: string;
  value: string;
};

export type TRequest = {
  schema: TFormRow[];
  numberOfObjects: number;
  extraInfo: string;
  includeImg: boolean;
  imagePrompt: string;
};
