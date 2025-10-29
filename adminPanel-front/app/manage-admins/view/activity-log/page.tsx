"use client";

import Breadcrumbs from "@/app/components/breadcrumbs";
import { useEffect, useState } from "react";

/* breadCrumbs mapping */
const nameMap = {
  app: "Home",
  "my-profile": "Profile Icon",
  profile: "My Profile",
  "activity-log": "Activity Log",
  "manage-admins": "Manage Admins",
};

type FacultyActivity = {
  logId?: number;
  adminName: string;
  action: string;
  details: string;
  createdAt: string;
};

export default function FacultyLogsPage() {
  const [activities, setActivities] = useState<FacultyActivity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    // 🔹 Fake data for now
    const fakeData: FacultyActivity[] = [
      {
        logId: 1,
        adminName: "Alice Admin",
        action: "Login",
        details: "Alice logged into the system",
        createdAt: "2025-09-18 09:00",
      },
      {
        logId: 2,
        adminName: "Bob Admin",
        action: "Created Course",
        details: "Added new course: CS202",
        createdAt: "2025-09-18 10:20",
      },
      {
        logId: 3,
        adminName: "Charlie Admin",
        action: "Deleted Record",
        details: "Removed inactive student S010",
        createdAt: "2025-09-18 11:00",
      },
    ];

    setActivities(fakeData);
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(activities.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentLogs = activities.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <div className="fixed z-50 top-24 pt-[20px] left-[299px] right-[1px] bg-white">
        {/* Breadcrumbs */}
        <div className="text-black ml-7 bg-white">
          <Breadcrumbs nameMap={nameMap} />
        </div>
        {/* sort by date */}
        <div className=" ml-[560px] flex gap-8 mt-[30px]">
          <input
            type="date"
            className="input text-white bg-blue-950 w-[300px] "
          />

          <label className="input text-white bg-blue-950  w-[300px]">
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
              className="text-white "
            />
          </label>
        </div>
        <div className="bg-white pl-12 pt-[30px] fixed z-50 w-full">
          <h1 className="text-4xl font-bold mb-6 text-black ">
            Faculty Activity Logs
          </h1>
        </div>
      </div>
      <div className="p-6 ml-[50px] mt-[300px]">
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table w-full border-collapse">
            <thead className="bg-blue-950 text-white text-center">
              <tr className=" font-bold text-[18px]">
                <th className="px-4 py-2">ACTIVITY ID</th>
                <th className="px-4 py-2">DATE</th>
                <th className="px-4 py-2">ADMIN</th>
                <th className="px-4 py-2">ACTION</th>
                <th className="px-4 py-2">DETAILS</th>
              </tr>
            </thead>
            <tbody className="bg-white text-center text-black">
              {currentLogs.map((log) => (
                <tr key={log.logId} className=" bg-gray-100 font-bold border-t-2 border-blue-500 hover:bg-blue-100 transition duration-200 ">
                  <td className=" px-6 py-2 text-black">{log.logId}</td>
                  <td className=" px-6 py-2 text-black">{log.createdAt}</td>
                  <td className=" px-6 py-2 text-black font-semibold">{log.adminName}</td>
                  <td className=" px-6 py-2 text-black">{log.action}</td>
                  <td className=" px-6 py-2 text-black">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>

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
      </div>
    </>
  );
}
