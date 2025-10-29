"use client";

import React from "react";
import CollapsibleSection from "@/OTHER/drop-down/CollapsibleSection";

type CardProps = {
  mainTitle: string;

  subTitle1?: React.ReactNode;
  subTitle1_1?: React.ReactNode;
  subTitle1_2?: React.ReactNode;
  subTitle1_3?: React.ReactNode;

  subTitle2?: React.ReactNode;
  subTitle2_1?: React.ReactNode;
  subTitle2_2?: React.ReactNode;
  subTitle2_2_1?: React.ReactNode;
  subTitle2_2_2?: React.ReactNode;
  subTitle2_2_3?: React.ReactNode;

  subTitle3?: React.ReactNode;
  subTitle3_1?: React.ReactNode;
  subTitle3_2?: React.ReactNode;
};

const DefaultCard = ({
  mainTitle,
  subTitle1,
  subTitle1_1,
  subTitle1_2,
  subTitle1_3,
  subTitle2,
  subTitle2_1,
  subTitle2_2,
  subTitle2_2_1,
  subTitle2_2_2,
  subTitle2_2_3,
  subTitle3,
  subTitle3_1,
  subTitle3_2,
}: CardProps) => {
  return (
    <>
      <div className="bg-white rounded-lg px-4 py-6 ring shadow-xl ring-gray-900/5 "> 
        <div className="items-center justify-center mt-0">
          <h1>
            <span className="inline-flex  rounded-md bg-pink-300 p-2 shadow-lg ml-11 font-bold">
              {mainTitle}
            </span>
          </h1>
        </div>
        <div className="p-2 justify-center bg-blue-300 w-[248px] mt-2 rounded-md">
          <div className=" ">
            <CollapsibleSection title={subTitle1}>
            <div className="">
            <div className="font-normal ml-4">{subTitle1_1}</div>
            <div className="font-normal ml-4">{subTitle1_2}</div>
            <div className="font-normal ml-4">{subTitle1_3}</div>
            </div>
            </CollapsibleSection>
          </div>
          <div>
            <CollapsibleSection title={subTitle2}>
            <div className="font-normal ml-4">{subTitle2_1}</div>
            <div className="font-normal ml-4">
              <span>{subTitle2_2}</span>
              <div className="ml-6">{subTitle2_2_1}</div>
              <div className="ml-6">{subTitle2_2_2}</div>
              <div className="ml-6">{subTitle2_2_3}</div>
            </div>
            </CollapsibleSection>
          </div>
          <div >
            <CollapsibleSection title={subTitle3}>
            <div className="font-normal ml-4">{subTitle3_1}</div>
            <div className="font-normal ml-4">{subTitle3_2}</div>
            </CollapsibleSection>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultCard;
