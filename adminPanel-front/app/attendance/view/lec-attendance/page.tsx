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

type LectureAttendance = {
  lecAttendanceID: string;
  saegisID: string;
  scannedDate: string;
  scannedTime: string;
  lectureTime: string;
  moduleCode: string;
  lecName: string;
};

export default function ViewLecAttendance() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 500;

  // --- Fake Data ---
  const [lecAttendance, setLecAttendance] = useState<LectureAttendance[]>([
    {
      lecAttendanceID: "LA001",
      saegisID: "S001",
      scannedDate: "2025-10-25",
      scannedTime: "08:58 AM",
      lectureTime: "09:00 AM - 11:00 AM",
      moduleCode: "CS202",
      lecName: "Dr. Samantha Perera",
    },
    {
      lecAttendanceID: "LA002",
      saegisID: "S002",
      scannedDate: "2025-10-25",
      scannedTime: "10:02 AM",
      lectureTime: "10:00 AM - 12:00 PM",
      moduleCode: "IT305",
      lecName: "Ms. Nadeesha Fernando",
    },
    {
      lecAttendanceID: "LA003",
      saegisID: "S003",
      scannedDate: "2025-10-26",
      scannedTime: "01:03 PM",
      lectureTime: "01:00 PM - 03:00 PM",
      moduleCode: "SE210",
      lecName: "Mr. Roshan Jayawardena",
    },
  ]);

  // --- Pagination (if needed) ---
  const totalPages = Math.ceil(lecAttendance.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentLogs = lecAttendance.slice(startIndex, startIndex + pageSize);

  return (
    <>
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
            Students' Lecture Attendance
          </h1>
        </div>
      </div>

      <div className="p-6 ml-[50px] mt-[280px]">
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table w-full">
            <thead className="bg-blue-950 text-white text-center">
              <tr>
                <th>Attendance ID</th>
                <th>Saegis ID</th>
                <th>Scanned Date</th>
                <th>Scanned Time</th>
                <th>Lecture Time</th>
                <th>Lecturer</th>
                <th>Module Code</th>
              </tr>
            </thead>
            <tbody className="text-black bg-white inset-ring-1 inset-ring-black rounded-b-lg text-center ">
              {currentLogs.map((lecAttendance) => (
                <tr key={lecAttendance.saegisID} className="border-t-2 ">
                  <td>{lecAttendance.lecAttendanceID}</td>
                  <td>{lecAttendance.saegisID}</td>
                  <td>{lecAttendance.scannedDate}</td>
                  <td>{lecAttendance.scannedTime}</td>
                  <td>{lecAttendance.lectureTime}</td>
                  <td>{lecAttendance.lecName}</td>
                  <td>{lecAttendance.moduleCode}</td>
                </tr>
              ))}
              {lecAttendance.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-600">
                    No attendances found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
