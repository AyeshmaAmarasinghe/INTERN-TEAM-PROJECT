"use client";

import Breadcrumbs from "@/app/components/breadcrumbs";
import { useEffect, useState } from "react";

/* breadCrumbs mapping */
const nameMap = {
  app: "Home",
  "my-profile": "Profile Icon",
  profile: "My Profile",
  "activity-log": "My Activity Log",
};

type Activity = {
  logId: number;
  action: string;
  details: string;
  createdAt: string;
};

export default function MyActivityLogPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50; // 🔹 number of logs per page

  useEffect(() => {
    // Fake data for now
    const fakeData: Activity[] = [
      {
        logId: 1,
        action: "Login",
        details: "Admin logged into the system",
        createdAt: "2025-09-18 09:45",
      },
      {
        logId: 2,
        action: "Edited Profile",
        details: "Updated contact number",
        createdAt: "2025-09-18 10:15",
      },
      {
        logId: 3,
        action: "Created Student Record",
        details: "Added student S001 to database",
        createdAt: "2025-09-18 11:30",
      },
      {
        logId: 4,
        action: "Deleted Record",
        details: "Removed student S002 from database",
        createdAt: "2025-09-18 12:45",
      },
      {
        logId: 5,
        action: "Password Change",
        details: "Updated account password",
        createdAt: "2025-09-18 13:10",
      },
    ];

    setActivities(fakeData);
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(activities.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentLogs = activities.slice(startIndex, startIndex + pageSize);

  return (
    <div className="fixed z-50 top-24 pt-[20px] left-[303px] right-[1px] bg-white ">
      {/* Breadcrumbs */}
      <div className="text-black ml-7 bg-white">
        <Breadcrumbs nameMap={nameMap} />
      </div>

      {/* sort by date */}
      <div className="ml-[760px] flex gap-8 mt-[30px] ">
        <input type="date" className="input text-white bg-blue-950 w-[300px]" />
      </div>
      <div className="bg-white pl-12 pt-[30px] fixed z-50 w-full">
        <h1 className="text-4xl font-bold mb-6 text-black ">My Activity Log</h1>
      </div>
      <div className="min-h-screen bg-white p-6 pl-12 mt-[30px] ">
        <div className="bg-gradient-to-br from-blue-950 from-20%  via-sky-600  to-80% to-blue-950 shadow rounded-lg p-4 mt-[70px]">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-white text-black font-bold text-[18px]">
                <th className="px-4 py-2">DATE</th>
                <th className="px-4 py-2">ACTION</th>
                <th className="px-4 py-2">DETAILS</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentLogs.map((log) => (
                <tr key={log.logId} className="border-t-2 text-black bg-white">
                  <td className="px-4 py-2">{log.createdAt}</td>
                  <td className="px-4 py-2">{log.action}</td>
                  <td className="px-4 py-2">{log.details}</td>
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
    </div>
  );
}
