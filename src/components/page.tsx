import React, { useEffect, useState } from "react";
import RequestForm from "./request-form";
import IResponse from "../types/response";
import Error from "./error";
import Loader from "./loader";
import DropDown from "./guide-drop-down";
import "../index.css";
import { JsonViewer, defineDataType } from "@textea/json-viewer";

const Page: React.FC = () => {
  const [response, setResponse] = useState<IResponse>({
    data: {},
    error: {},
  });

  const [isDataAvailable, setIsDataAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (Object.keys(response.data).length > 0) {
      setIsDataAvailable(true);
      setLoading(false);
    }
  }, [response]);

  const [loading, setLoading] = useState<boolean>(false);

  const imageDataType = defineDataType({
    is: (value) =>
      typeof value === "string" &&
      value.startsWith("https://oaidalleapiprodscus.blob"),
    Component: (props: { value: string }) => (
      <a href={props.value} target="_blank">
        {props.value}
      </a>
    ),
  });

  return (
    <div className="flex flex-col gap-8 w-full min-[600px]:w-1/2">
      <div className="flex w-full justify-between">
        <p className="font-bold text-3xl">
          Object <span className="text-purple-500">Alchemy</span>
        </p>
        <DropDown />
      </div>
      <Error response={response} />
      <div className="flex w-full flex-col px-6 py-6 border rounded-lg text-md">
        <RequestForm setResponse={setResponse} setLoading={setLoading} />
      </div>
      {loading && <Loader />}
      {!loading && (
        <div className="sm:w-96 md:w-full">
          {/* {isDataAvailable && <ReactJson src={response.data} />} */}
          {isDataAvailable && (
            <JsonViewer value={response.data} valueTypes={[imageDataType]} />
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
