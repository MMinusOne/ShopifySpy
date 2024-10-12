"use client";

import Header from "@/components/ui/Header";

export default function Error({ error }) {
  console.log({ error });
  return (
    <>
      <div
        className={`flex flex-col justify-center gap-4 bg-base-100 p-6 w-full h-[100vh]`}
      >
        <div className="flex justify-center items-center w-full h-20">
          <Header />
        </div>

        <div className="flex flex-col justify-center items-center gap-5 w-full h-full">
          <p className="flex flex-col justify-center items-center gap-5 font-bold text-base-content text-xl md:text-4xl">
            Ow! A wild error occurred (ó﹏ò｡){" "}
            <span className="flex justify-end items-en text-center text-md md:text-3xl">
              A wild error occurred! Please report this to the owner
            </span>
          </p>

          <div className="bg-base-100 shadow-xl mb-8 p-6 rounded-box">
            <p className="text-error text-sm">{error.message}</p>
          </div>
          <p>
            <span>Error Code: {error.digest}</span>
          </p>
        </div>
      </div>
    </>
  );
}
