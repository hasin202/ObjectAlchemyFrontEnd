import React from "react";
import IResponse from "../types/response";

interface Props {
  response: IResponse;
}

const Error: React.FC<Props> = ({ response }) => {
  return (
    response.error.message && (
      <div
        className="flex flex-col bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold pb-4 text-2xl">Oops.</strong>
        <p className="block sm:inline">{response.error?.message}</p>
        {response.error.code && (
          <div>
            <p>
              Error code:{" "}
              <span className="underline font-bold">{response.error.code}</span>
            </p>
            <p>
              For help on error codes checkout{" "}
              <a href={response.error.help} className="underline font-bold">
                this link
              </a>
            </p>
          </div>
        )}
      </div>
    )
  );
};

export default Error;
