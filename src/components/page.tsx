import React, { useEffect, useState } from "react";
import RequestForm from "./requestForm";
import IResponse from "../types/response";
import Error from "./error";
import ReactJson from "react-json-view-c2";
import Loader from "./loader";

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

  return (
    <div className="flex flex-col gap-8 md:w-1/2">
      <p className="font-bold text-3xl">
        Object <span className="text-purple-500">Alchemy</span>
      </p>
      <Error response={response} />
      <div className="flex w-full flex-col px-8 py-12 border rounded-lg text-xs">
        <RequestForm
          response={response}
          setResponse={setResponse}
          setLoading={setLoading}
        />
      </div>
      {loading && !isDataAvailable && <Loader />}
      {isDataAvailable && <ReactJson src={response.data} />}
    </div>
  );
};

export default Page;
