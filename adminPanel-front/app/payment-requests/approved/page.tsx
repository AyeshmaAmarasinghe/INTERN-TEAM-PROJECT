"use client";

import Breadcrumbs from "@/app/components/breadcrumbs";
import React, { useEffect, useState } from "react";

/* Breadcrumb mapping */
const nameMap = {
  app: "Home",
  "my-profile": "Profile Icon",
  profile: "My Profile",
  "activity-log": "Activity Log",
};

type FeeDetails = {
  saegisID: string;
  fullName: string;
  paymentID: string;
  paymentType: string;
  fee: string;
  paidDate: string;
  approvedDate: string;
  receipt: File | null;
};

export default function PendingDegreeFee() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 500;

  // --- Fake Data ---
  const [degreeFee, setDegreeFee] = useState<FeeDetails[]>([
    {
      saegisID: "S001",
      fullName: "Madusha Sathsara",
      paymentID: "P1001",
      paymentType: "Convocation fee",
      fee: "LKR 15,000",
      paidDate: "2025-01-15",
      approvedDate: "2025-01-15",
      receipt: new File(["Marketing exam timetable"], "mba-supplementary.pdf", {
        type: "application/pdf",
      }),
    },
    {
      saegisID: "S002",
      fullName: "Ayeshma Amarasinghe",
      paymentID: "P1002",
      paymentType: "Convocation fee",
      fee: "LKR 14,000",
      paidDate: "2025-02-10",
      approvedDate: "2025-02-10",
      receipt: new File(["Marketing exam timetable"], "mba-supplementary.pdf", {
        type: "application/pdf",
      }),
    },
    {
      saegisID: "S003",
      fullName: "Dinuka Perera",
      paymentID: "P1003",
      paymentType: "Convocation fee",
      fee: "LKR 15,000",
      paidDate: "2025-03-05",
      approvedDate: "2025-03-05",
      receipt: new File(["Marketing exam timetable"], "mba-supplementary.pdf", {
        type: "application/pdf",
      }),
    },
  ]);

  // --- Blob URLs for Receipts ---
  const [receiptUrls, setReceiptUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const urls: Record<string, string> = {};
    degreeFee.forEach((t) => {
      if (t.receipt) urls[t.paymentID] = URL.createObjectURL(t.receipt);
    });
    setReceiptUrls(urls);

    return () => {
      Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [degreeFee]);

  // --- Pagination (if needed) ---
  const totalPages = Math.ceil(degreeFee.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentLogs = degreeFee.slice(startIndex, startIndex + pageSize);

  return (
    <>
      {/* Header Section */}
      <div className="fixed z-50 top-24 pt-[20px] left-[299px] right-[1px] bg-white">
        <div className="text-black ml-7 bg-white">
          <Breadcrumbs nameMap={nameMap} />
        </div>

        {/* Filter Bar */}
        <div className="ml-[560px] flex gap-8 mt-[30px]">
          <input
            type="date"
            className="input text-white bg-blue-950 w-[300px]"
          />
          <label className="input text-white bg-blue-950 w-[300px] flex items-center gap-2">
            <svg
              className="h-[1em] opacity-100"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="3.5"
                fill="none"
                stroke="white"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Search"
              className="text-white bg-transparent outline-none"
            />
          </label>
        </div>

        <div className="bg-white pl-12 pt-[30px] fixed z-50 w-full">
          <h1 className="text-4xl font-bold mb-6 text-black">
            Approved Fee Details
          </h1>
        </div>
      </div>

      {/* Table Section */}
      <div className="p-6 ml-[50px] mt-[300px]">
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table w-full border-collapse">
            <thead className="bg-blue-950 text-white text-center">
              <tr>
                <th className="px-4 py-3">Payment ID</th>
                <th className="px-4 py-3">Saegis ID</th>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Payment Type</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Paid Date</th>
                <th className="px-4 py-3">Approved Date</th>
                <th className="px-4 py-3">Receipt</th>
              </tr>
            </thead>

            <tbody className="bg-white text-center text-black">
              {currentLogs.map((fee) => (
                <tr
                  key={fee.paymentID}
                  className="border-t border-gray-300 hover:bg-blue-50 transition duration-200"
                >
                  <td>{fee.paymentID}</td>
                  <td>{fee.saegisID}</td>
                  <td>{fee.fullName}</td>
                  <td>{fee.paymentType}</td>
                  <td>{fee.fee}</td>
                  <td>{fee.paidDate}</td>
                  <td>{fee.approvedDate}</td>

                  <td>
                    {receiptUrls[fee.paymentID] ? (
                      <a
                        href={receiptUrls[fee.paymentID]}
                        download={fee.receipt?.name}
                        className="w-[70px] h-[30px] font-bold text-[12px] py-2 cursor-pointer btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white border-none rounded hover:bg-[#16FF00] hover:inset-ring-0 text-black hover:scale-110 transition duration-300"
                      >
                        Download
                      </a>
                    ) : (
                      "No file"
                    )}
                  </td>
                </tr>
              ))}
              {degreeFee.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-600">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4 ">
          <div className="join">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`join-item btn btn-xs  bg-white inset-ring-2 inset-ring-[#16FF00] shadow-lg shadow-blue-500/50 text-black hover:inset-ring-0 hover:bg-[#16FF00] hover:text-black hover:scale-105 transition duration-300 border-none ${
                  currentPage === i + 1 ? "btn-active" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
