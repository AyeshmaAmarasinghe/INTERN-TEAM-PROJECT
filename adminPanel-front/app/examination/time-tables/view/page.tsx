"use client";

import Breadcrumbs from "@/app/components/breadcrumbs";
import { useEffect, useState } from "react";

/* breadCrumbs mapping */
const nameMap = {
  app: "Home",
  "my-profile": "Profile Icon",
  profile: "My Profile",
  "activity-log": "Activity Log",
};

type timeTable = {
  timeTableId: string;
  faculty: string;
  programName: string;
  intake: string;
  examType: string;
  academicYear: string;
  semester: string;
  file: File | null;
};

export default function ViewTimeTables() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 500;

  // fake data
  const [timeTables, setTimeTables] = useState<timeTable[]>([
    {
      timeTableId: "TT001",
      faculty: "Computing & Technology",
      programName: "BSc (Hons) in IT",
      intake: "Intake 2023/24",
      examType: "Mid Exam",
      academicYear: "1",
      semester: "Semester 1",
      file: new File(["Exam timetable content"], "civil-eng-midterm.pdf", {
        type: "application/pdf",
      }),
    },
    {
      timeTableId: "TT002",
      faculty: "Computing & Technology",
      programName: "BSc (Hons) in CS",
      intake: "Intake 2022/23",
      examType: "End Exam",
      academicYear: "2",
      semester: "Semester 2",
      file: new File(["CS final exam details"], "cs-final-exam.pdf", {
        type: "application/pdf",
      }),
    },
    {
      timeTableId: "TT003",
      faculty: "Computing & Technology",
      programName: "BSc (Hons) in SE",
      intake: "Intake 2024/25",
      examType: "Monthly Exam",
      academicYear: "3",
      semester: "Semester 3",
      file: new File(["Marketing exam timetable"], "mba-supplementary.pdf", {
        type: "application/pdf",
      }),
    },
  ]);

  // store generated blob URLs to avoid SSR mismatch
  const [fileUrls, setFileUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const urls: Record<string, string> = {};
    timeTables.forEach((t) => {
      if (t.file) urls[t.timeTableId] = URL.createObjectURL(t.file);
    });
    setFileUrls(urls);

    // cleanup blob URLs on unmount
    return () => {
      Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [timeTables]);

  // state for editing
  const [editTimeTable, setEditTimeTable] = useState<timeTable | null>(null);

  //  Remove time table
  const handleRemove = (timeTableId: string) => {
    setTimeTables(
      timeTables.filter((timeTable) => timeTable.timeTableId !== timeTableId)
    );
  };

  //  Open edit modal
  const handleEdit = (timeTable: timeTable) => {
    setEditTimeTable(timeTable);
  };

  // update time table
  const handleUpdate = () => {
    if (editTimeTable) {
      setTimeTables((prev) =>
        prev.map((a) =>
          a.timeTableId === editTimeTable.timeTableId ? editTimeTable : a
        )
      );
      setEditTimeTable(null);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(timeTables.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentLogs = timeTables.slice(startIndex, startIndex + pageSize);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="text-black ml-7 mt-[130px] fixed bg-white z-50 w-[1650px]">
        <Breadcrumbs nameMap={nameMap} />
        <div className="mb-3 mt-[30px] w-[450px] ml-[780px]">
          <label className="input bg-blue-950">
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
        <h1 className="text-3xl font-bold mb-6 ml-[30px] text-black">
          Time Table List
        </h1>
      </div>

      <div className="p-6 ml-[50px] mt-[280px]">
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table w-full">
            <thead className="bg-blue-950 text-white text-center">
              <tr>
                <th>Table ID</th>
                <th>Faculty</th>
                <th>Program Name</th>
                <th>Academic Year</th>
                <th>Semester</th>
                <th>Exam Type</th>
                <th>Intake</th>
                <th>File</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-black bg-white inset-ring-1 inset-ring-black rounded-b-lg text-center ">
              {currentLogs.map((timeTable) => (
                <tr key={timeTable.timeTableId} className="border-t-2 ">
                  <td>{timeTable.timeTableId}</td>
                  <td>{timeTable.faculty}</td>
                  <td>{timeTable.programName}</td>
                  <td>{timeTable.academicYear}</td>
                  <td>{timeTable.semester}</td>
                  <td>{timeTable.examType}</td>
                  <td>{timeTable.intake}</td>
                  <td>
                    {fileUrls[timeTable.timeTableId] ? (
                      <a
                        href={fileUrls[timeTable.timeTableId]}
                        download={timeTable.file?.name}
                        className="w-[70px] h-[30px] font-bold text-[12px] py-2 cursor-pointer btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white border-none rounded hover:bg-[#16FF00] hover:inset-ring-0 text-black hover:scale-110 transition duration-300"
                      >
                        Download
                      </a>
                    ) : (
                      "No file"
                    )}
                  </td>
                  <td className="flex justify-center ">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(timeTable)}
                        className="w-[92px] h-[30px] font-bold text-[12px] py-2 cursor-pointer btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white border-none rounded hover:bg-[#16FF00] hover:inset-ring-0 text-black hover:scale-110 transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemove(timeTable.timeTableId)}
                        className="w-[92px] h-[30px] font-bold text-[12px] py-2 cursor-pointer btn btn-outline inset-ring-3 inset-ring-red-600 bg-white border-none rounded hover:bg-red-600 hover:inset-ring-0 text-black hover:scale-110 transition duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {timeTables.length === 0 && (
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

        {/* Edit Modal */}
        {editTimeTable && (
          <dialog
            className="modal modal-open bg-transparent"
            style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
          >
            <div className="modal-box w-96 bg-gradient-to-br from-blue-950 from-20%  via-sky-600  to-80% to-blue-950 shadow-lg">
              <h3 className="font-bold text-[25px]">Edit Table Details</h3>

              <div className="mt-4 space-y-3">
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editTimeTable.faculty}
                  onChange={(e) =>
                    setEditTimeTable({
                      ...editTimeTable,
                      faculty: e.target.value as
                        | "Management, Humanities & Social Sciences"
                        | "Computing & Technology"
                        | "Postgraduate Studies"
                        | "International Programmes",
                    })
                  }
                >
                  <option>Select the Faculty</option>
                  <option value="Management, Humanities & Social Sciences">
                    Management, Humanities & Social Sciences
                  </option>
                  <option value="Computing & Technology">
                    Computing & Technology
                  </option>
                  <option value="Postgraduate Studies">
                    Postgraduate Studies
                  </option>
                  <option value="International Programmes">
                    International Programmes
                  </option>
                </select>

                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editTimeTable.programName}
                  onChange={(e) =>
                    setEditTimeTable({
                      ...editTimeTable,
                      programName: e.target.value as
                        | "Dual Certificate in English and Information Technology"
                        | "Pearson BTEC Level 3 International Foundation Program forHigher Education in Business"
                        | "Pearson BTEC International Level 3 Foundation Diploma in Information Technology"
                        | "Diploma in English"
                        | "Diploma in Management IT & English"
                        | "BTEC HND in Business Management"
                        | "BTEC Level 5 HND in Business Accounting and Finance"
                        | "BTEC HND in Computing (Software Engineering)"
                        | "BTEC Higher Nationals Computing (Network Engineering)"
                        | "BSc. (Hons) Business Management (Top-Up)"
                        | "BSc. (Hons) in Accounting and Finance (Top-Up)"
                        | "Bachelor of Engineering (Hons) in Software Engineerin (Top-Up)"
                        | "Bachelor of Business Administration"
                        | "Bachelor of Business Management (Hons) in Tourism and Hospitality Management"
                        | "Bachelor of Business Management (Hons)"
                        | "Bachelor of Business Management (Hons) in Accounting & Finance"
                        | "Bachelor of Business Management (Hons) in HR Management"
                        | "Bachelor of Business Management (Hons) in Marketing"
                        | "Bachelor of Information Technology - BIT"
                        | "BSc (Hons) in IT"
                        | "BSc (Hons) in SE"
                        | "BSc (Hons) in CS"
                        | "BA in English"
                        | "Master of Business Administration International",
                    })
                  }
                >
                  <option>Select the Program Name</option>
                  <option value="Dual Certificate in English and Information Technology">
                    Dual Certificate in English and Information Technology
                  </option>
                  <option value="Pearson BTEC Level 3 International Foundation Program forHigher Education in Business">
                    Pearson BTEC Level 3 International Foundation Program
                    forHigher Education in Business
                  </option>
                  <option value="Pearson BTEC International Level 3 Foundation Diploma in Information Technology">
                    Pearson BTEC International Level 3 Foundation Diploma in
                    Information Technology
                  </option>
                  <option value="Diploma in English">Diploma in English</option>
                  <option value="Diploma in Management, IT & English">
                    Diploma in Management, IT & English
                  </option>
                  <option value="BTEC HND in Business Management">
                    BTEC HND in Business Management
                  </option>
                  <option value="BTEC Level 5 HND in Business Accounting and Finance">
                    BTEC Level 5 HND in Business Accounting and Finance
                  </option>
                  <option value="BTEC HND in Computing (Software Engineering)">
                    BTEC HND in Computing (Software Engineering)
                  </option>
                  <option value="BTEC Higher Nationals Computing (Network Engineering)">
                    BTEC Higher Nationals Computing (Network Engineering)
                  </option>
                  <option value="BSc. (Hons) Business Management (Top-Up)">
                    BSc. (Hons) Business Management (Top-Up)
                  </option>
                  <option value="BSc. (Hons) in Accounting and Finance (Top-Up)">
                    BSc. (Hons) in Accounting and Finance (Top-Up)
                  </option>
                  <option value="Bachelor of Engineering (Hons) in Software Engineering (Top-Up)">
                    Bachelor of Engineering (Hons) in Software Engineering
                    (Top-Up)
                  </option>
                  <option value="BTEC Level 5 HND in Business Accounting and Finance">
                    BTEC Level 5 HND in Business Accounting and Finance
                  </option>
                  <option value="BTEC HND in Computing (Software Engineering)">
                    BTEC HND in Computing (Software Engineering)
                  </option>
                  <option value="BTEC Higher Nationals Computing (Network Engineering)">
                    BTEC Higher Nationals Computing (Network Engineering)
                  </option>
                  <option value="BSc. (Hons) Business Management (Top-Up)">
                    BSc. (Hons) Business Management (Top-Up)
                  </option>
                  <option value="BSc. (Hons) in Accounting and Finance (Top-Up)">
                    BSc. (Hons) in Accounting and Finance (Top-Up)
                  </option>
                  <option value="Bachelor of Engineering (Hons) in Software Engineering (Top-Up)">
                    Bachelor of Engineering (Hons) in Software Engineering
                    (Top-Up)
                  </option>
                  <option value="Bachelor of Business Administration">
                    Bachelor of Business Administration
                  </option>
                  <option value="Bachelor of Business Management (Hons) in Tourism and Hospitality Management">
                    Bachelor of Business Management (Hons) in Tourism and
                    Hospitality Management
                  </option>
                  <option value="Bachelor of Business Management (Hons)">
                    Bachelor of Business Management (Hons)
                  </option>
                  <option value="Bachelor of Business Management (Hons) in Accounting & Finance">
                    Bachelor of Business Management (Hons) in Accounting &
                    Finance
                  </option>
                  <option value="Bachelor of Business Management (Hons) in HR Management">
                    Bachelor of Business Management (Hons) in HR Management
                  </option>
                  <option value="Bachelor of Business Management (Hons) in Marketing">
                    Bachelor of Business Management (Hons) in Marketing
                  </option>
                  <option value="Bachelor of Information Technology - BIT">
                    Bachelor of Information Technology - BIT
                  </option>
                  <option value="BSc (Hons) in IT">BSc (Hons) in IT</option>
                  <option value="BSc (Hons) in SE">BSc (Hons) in SE</option>
                  <option value="BSc (Hons) in CS">BSc (Hons) in CS</option>
                  <option value="BA in English">BA in English</option>
                  <option value="Master of Business Administration International">
                    Master of Business Administration International
                  </option>
                </select>

                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editTimeTable.intake}
                  onChange={(e) =>
                    setEditTimeTable({
                      ...editTimeTable,
                      intake: e.target.value,
                    })
                  }
                />

                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editTimeTable.examType}
                  onChange={(e) =>
                    setEditTimeTable({
                      ...editTimeTable,
                      faculty: e.target.value as
                        | "Monthly Exam"
                        | "Mid Exam"
                        | "End Exam",
                    })
                  }
                >
                  <option>Select the Exam Type</option>
                  <option value="Monthly Exam">Monthly Exam</option>
                  <option value="Mid Exam">Mid Exam</option>
                  <option value="End Exam">End Exam</option>
                </select>
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editTimeTable.academicYear}
                  onChange={(e) =>
                    setEditTimeTable({
                      ...editTimeTable,
                      faculty: e.target.value as "1" | "2" | "3" | "4",
                    })
                  }
                >
                  <option>Select the Academic Year</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>

                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editTimeTable.semester}
                  onChange={(e) =>
                    setEditTimeTable({
                      ...editTimeTable,
                      semester: e.target.value,
                    })
                  }
                />

                {/* File Upload Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-white font-semibold">
                    Upload / Replace File
                  </label>

                  {/* show currently available file with download option */}
                  {editTimeTable.file ? (
                    <div className="flex items-center justify-between bg-white text-black rounded p-2">
                      <span className="truncate max-w-[200px]">
                        {editTimeTable.file.name}
                      </span>
                      <a
                        href={URL.createObjectURL(editTimeTable.file)}
                        download={editTimeTable.file.name}
                        className="text-blue-600 underline text-sm hover:text-blue-800"
                      >
                        Download
                      </a>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-200">
                      No file currently uploaded
                    </p>
                  )}

                  {/* upload new file */}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xlsx,.xls"
                    className="file-input file-input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setEditTimeTable({
                        ...editTimeTable,
                        file,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="modal-action gap-3">
                <div className="border-1 p-1 rounded-lg hover:border-none transition duration-300  ">
                  <button
                    className="w-[60px] font-bold text-[12px] btn inset-ring-2 inset-ring-[#FF3EA5] bg-white text-black border-none shadow-[#FF3EA5] hover:bg-[#FF3EA5] hover:inset-ring-0 hover:text-black  hover:scale-110 transition duration-300 h-[30px] rounded-[7px]"
                    onClick={() => setEditTimeTable(null)}
                  >
                    Cancel
                  </button>
                </div>
                <div className="border-1 p-1 rounded-lg hover:border-none transition duration-300  ">
                  <button
                    className="w-[60px] font-bold text-[12px] btn inset-ring-2 inset-ring-[#FF3EA5] bg-white text-black border-none shadow-[#FF3EA5] hover:bg-[#FF3EA5] hover:inset-ring-0 hover:text-black  hover:scale-110 transition duration-300 h-[30px] rounded-[7px]"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </>
  );
}
