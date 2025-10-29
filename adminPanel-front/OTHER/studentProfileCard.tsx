"use client";

import Link from "next/link";
import React from "react";

type CardProps = {
  mainTitle: string;
  subTitle1?: string;
  subTitle2?: string;
  subTitle1_1?: string;
  subTitle1_2?: string;
  subTitle2_1?: string;
  subTitle2_2?: string;
  subTitle2_2_1?: string;
  subTitle2_2_2?: string;
  subTitle2_2_3?: string;
};

const StudentProfileCard = ({
  mainTitle,
  subTitle1,
  subTitle2,
  subTitle1_1,
  subTitle1_2,
  subTitle2_1,
  subTitle2_2,
  subTitle2_2_1,
  subTitle2_2_2,
  subTitle2_2_3,
}: CardProps) => {
  return (
    <>
      <div className="bg-white rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5 ">
        <div className="items-center justify-center mt-0">
          <h1>
            <span className="inline-flex  rounded-md bg-pink-300 p-2 shadow-lg ml-11 font-bold">
              {mainTitle}
            </span>
          </h1>
        </div>
        <div className="p-2 justify-center bg-blue-300 w-[248px] mt-2 rounded-md">
          <div className=" ">
            <Link href="" className="font-bold">
              {subTitle1}
            </Link>
            <div className="font-normal ml-4">
              <Link href="/student-profile/register/registration">
                {subTitle1_1}
              </Link>
            </div>
            <div className="font-normal ml-4">
              <Link href="/student-profile/register/registered-info">
                {subTitle1_2}
              </Link>
            </div>
          </div>
          <div>
            <Link href="" className="font-bold">
              {subTitle2}
            </Link>
            <div className="font-normal ml-4">
              <Link href="/student-profile/personal-info/add">
                {subTitle2_1}
              </Link>
            </div>
            <div className="font-normal ml-4">
              <Link href="">{subTitle2_2}</Link>
              <div className="ml-6">
                <Link href="/personal-info/view/education">
                  {subTitle2_2_1}
                </Link>
              </div>
              <div className="ml-6">
                <Link href="/personal-info/view/guardian-info">
                  {subTitle2_2_2}
                </Link>
              </div>
              <div className="ml-6">
                <Link href="/personal-info/view/personal">{subTitle2_2_3}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfileCard;
