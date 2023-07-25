import React, { useEffect, useState } from "react";
import RequestForm from "./requestForm";
import IResponse from "../types/response";
import Error from "./error";
import ReactJson from "react-json-view-c2";
import Loader from "./loader";
import "../index.css";

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
      console.log(response);
    }
  }, [response]);

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-8 w-full min-[600px]:w-1/2">
      <p className="font-bold text-3xl">
        Object <span className="text-purple-500">Alchemy</span>
      </p>
      <Error response={response} />
      <div className="flex w-full flex-col px-6 py-6 border rounded-lg text-md">
        <RequestForm setResponse={setResponse} setLoading={setLoading} />
      </div>
      {loading && <Loader />}
      {!loading && (
        <div className="sm:w-96 md:w-full">
          {isDataAvailable && <ReactJson src={response.data} />}
        </div>
      )}
    </div>
  );
};

export default Page;
