"use client";

import Breadcrumbs from "@/app/components/breadcrumbs";
import React from "react";
import { useState } from "react";

/* breadCrumbs mapping */
const nameMap = {
  app: "Home",
  "my-profile": "Profile Icon",
  profile: "My Profile",
  "activity-log": "Activity Log",
};

type Module = {
  moduleName: string;
  moduleCode: string;
  credits: string;
  result: string;
  gradePoint: string;
  attempt: string;
  attendance: string;
  eligibility: string;
};

type ExamResult = {
  saegisID: string;
  fullName: string;
  faculty: string;
  academicYear: string;
  programName: string;
  semester: string;
  modules: Module[];
};

export default function Resultstable() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 500;

  const [result, setResult] = useState<ExamResult[]>([
    {
      saegisID: "S001",
      fullName: "Madusha Sathsara",
      faculty: "Computing & Technology",
      academicYear: "2024/2025",
      programName: "BSc (Hons) in Software Engineering",
      semester: "2",
      modules: [
        {
          moduleName: "Web Application Development",
          moduleCode: "SE2201",
          credits: "3",
          result: "A",
          gradePoint: "4.0",
          attempt: "1",
          attendance: "92%",
          eligibility: "Eligible",
        },
        {
          moduleName: "Database Systems",
          moduleCode: "SE2202",
          credits: "3",
          result: "B+",
          gradePoint: "3.5",
          attempt: "1",
          attendance: "88%",
          eligibility: "Eligible",
        },
        {
          moduleName: "Software Engineering Principles",
          moduleCode: "SE2203",
          credits: "3",
          result: "A-",
          gradePoint: "3.7",
          attempt: "1",
          attendance: "95%",
          eligibility: "Eligible",
        },
      ],
    },
    {
      saegisID: "S001",
      fullName: "Madusha Sathsara",
      faculty: "Computing & Technology",
      academicYear: "2024/2025",
      programName: "BSc (Hons) in Software Engineering",
      semester: "3",
      modules: [
        {
          moduleName: "Web Application Development",
          moduleCode: "SE2201",
          credits: "3",
          result: "A",
          gradePoint: "4.0",
          attempt: "1",
          attendance: "92%",
          eligibility: "Eligible",
        },
        {
          moduleName: "Database Systems",
          moduleCode: "SE2202",
          credits: "3",
          result: "B+",
          gradePoint: "3.5",
          attempt: "1",
          attendance: "88%",
          eligibility: "Eligible",
        },
        {
          moduleName: "Software Engineering Principles",
          moduleCode: "SE2203",
          credits: "3",
          result: "A-",
          gradePoint: "3.7",
          attempt: "1",
          attendance: "95%",
          eligibility: "Eligible",
        },
      ],
    },
    {
      saegisID: "S002",
      fullName: "Ayeshma Amarasinghe",
      faculty: "Management, Humanities & Social Sciences",
      academicYear: "2024/2025",
      programName:
        "Bachelor of Business Management (Hons) in Accounting & Finance",
      semester: "1",
      modules: [
        {
          moduleName: "Financial Accounting",
          moduleCode: "AF1101",
          credits: "4",
          result: "B",
          gradePoint: "3.0",
          attempt: "1",
          attendance: "90%",
          eligibility: "Eligible",
        },
        {
          moduleName: "Microeconomics",
          moduleCode: "AF1102",
          credits: "3",
          result: "A",
          gradePoint: "4.0",
          attempt: "1",
          attendance: "94%",
          eligibility: "Eligible",
        },
        {
          moduleName: "Business Communication",
          moduleCode: "AF1103",
          credits: "2",
          result: "B+",
          gradePoint: "3.5",
          attempt: "1",
          attendance: "85%",
          eligibility: "Eligible",
        },
      ],
    },
    {
      saegisID: "S003",
      fullName: "Randima Gankanda",
      faculty: "Computing & Technology",
      academicYear: "2024/2025",
      programName: "BSc (Hons) in Computer Science",
      semester: "3",
      modules: [
        {
          moduleName: "Artificial Intelligence",
          moduleCode: "CS3301",
          credits: "4",
          result: "A+",
          gradePoint: "4.0",
          attempt: "1",
          attendance: "96%",
          eligibility: "Eligible",
        },
        {
          moduleName: "Data Structures and Algorithms",
          moduleCode: "CS3302",
          credits: "4",
          result: "A",
          gradePoint: "4.0",
          attempt: "1",
          attendance: "93%",
          eligibility: "Eligible",
        },
        {
          moduleName: "Operating Systems",
          moduleCode: "CS3303",
          credits: "3",
          result: "B",
          gradePoint: "3.0",
          attempt: "2",
          attendance: "80%",
          eligibility: "Eligible",
        },
      ],
    },
  ]);

  const gradePointByResult: Record<string, string[]> = {
    "A+": ["4.0"],
    A: ["4.0"],
    "A-": ["3.7"],
    "B+": ["3.3"],
    B: ["3.0"],
    "B-": ["2.7"],
    "C+": ["2.3"],
    C: ["2.0"],
    "C-": ["1.7"],
    "D+": ["1.3"],
    D: ["1.0"],
    E: ["0"],
  };

  // state for editing
  const [editResult, setEditResult] = useState<ExamResult | null>(null);

  // state for "view more"
  const [viewResult, setViewResult] = useState<ExamResult | null>(null);
  const [viewModule, setViewModule] = useState<Module | null>(null);

  //  Remove result
  const handleRemove = (saegisID: string) => {
    setResult(result.filter((result) => result.saegisID !== saegisID));
  };

  //  Open edit modal
  const handleEdit = (result: ExamResult) => {
    setEditResult(result);
  };

  // update result details
  const handleUpdate = () => {
    if (editResult) {
      setResult((prev) =>
        prev.map((a) => (a.saegisID === editResult.saegisID ? editResult : a))
      );
      setEditResult(null);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(result.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentLogs = result.slice(startIndex, startIndex + pageSize);

  // Group results by student ID
  const groupedResults = result.reduce(
    (acc, curr) => {
      if (!acc[curr.saegisID]) {
        acc[curr.saegisID] = {
          saegisID: curr.saegisID,
          fullName: curr.fullName,
          faculty: curr.faculty,
          programName: curr.programName,
          semesters: [],
        };
      }
      acc[curr.saegisID].semesters.push({
        academicYear: curr.academicYear,
        semester: curr.semester,
        modules: curr.modules,
      });
      return acc;
    },
    {} as Record<
      string,
      {
        saegisID: string;
        fullName: string;
        faculty: string;
        programName: string;
        semesters: {
          academicYear: string;
          semester: string;
          modules: Module[];
        }[];
      }
    >
  );

  const handleModuleChange = (
    index: number,
    field: keyof Module,
    value: string
  ) => {
    if (!editResult) return;
    const updatedModules = [...editResult.modules];
    updatedModules[index] = { ...updatedModules[index], [field]: value };
    setEditResult({ ...editResult, modules: updatedModules });
  };

  return (
    <>
      <div className="text-black ml-7 mt-[95px] pt-[20px] fixed bg-white z-50 w-[1650px]">
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
        <h1 className="text-4xl font-bold mb-6 ml-[30px] text-black mt-[40px]">
          End Examination Results
        </h1>
      </div>

      <div className="p-6 ml-[50px] mt-[300px]">
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table w-full border-collapse">
            <thead className="bg-blue-950 text-white text-center">
              <tr>
                <th className="px-4 py-3">Module Code</th>
                <th className="px-4 py-3">Module Name</th>
                <th className="px-4 py-3">Credits</th>
                <th className="px-4 py-3">Result</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white text-center text-black">
              {Object.values(groupedResults).map((student) => (
                <React.Fragment key={student.saegisID}>
                  {/* Student header row */}
                  <tr className="bg-gray-100 font-bold border-t-2 border-blue-500">
                    <td
                      colSpan={8}
                      className="text-left px-6 py-2 text-blue-900"
                    >
                      {student.fullName} ({student.saegisID})
                      <br />
                      <span className="text-gray-600 text-sm">
                        {student.programName} | {student.faculty}
                      </span>
                    </td>
                  </tr>

                  {/* Each semester */}
                  {student.semesters.map((sem, semIndex) => (
                    <React.Fragment
                      key={`${student.saegisID}-sem-${sem.semester}`}
                    >
                      {/* Semester sub-header */}
                      <tr className="bg-blue-100 font-semibold">
                        <td
                          colSpan={8}
                          className="text-left px-10 py-1 text-blue-800"
                        >
                          Semester {sem.semester} ({sem.academicYear})
                        </td>
                      </tr>

                      {/* Modules for this semester */}
                      {sem.modules.map((module, index) => (
                        <tr
                          key={`${student.saegisID}-${sem.semester}-${module.moduleCode}-${index}`}
                          className="border-t border-gray-300 hover:bg-blue-50 transition duration-200"
                        >
                          <td>{module.moduleCode}</td>
                          <td>{module.moduleName}</td>
                          <td>{module.credits}</td>
                          <td className="font-semibold">{module.result}</td>
                          <td>
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => setViewModule(module)}
                                className="w-[92px] h-[30px] font-bold text-[12px] py-2 cursor-pointer btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white border-none rounded hover:bg-[#16FF00] hover:inset-ring-0 text-black hover:scale-110 transition duration-300"
                              >
                                View More
                              </button>
                              <button
                                onClick={() =>
                                  handleEdit({
                                    saegisID: student.saegisID,
                                    fullName: student.fullName,
                                    faculty: student.faculty,
                                    academicYear: sem.academicYear,
                                    programName: student.programName,
                                    semester: sem.semester,
                                    modules: sem.modules,
                                  })
                                }
                                className="w-[92px] h-[30px] font-bold text-[12px] py-2 cursor-pointer btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white border-none rounded hover:bg-[#16FF00] hover:inset-ring-0 text-black hover:scale-110 transition duration-300"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleRemove(student.saegisID)}
                                className="w-[92px] h-[30px] font-bold text-[12px] py-2 cursor-pointer btn btn-outline inset-ring-3 inset-ring-red-600 bg-white border-none rounded hover:bg-red-600 hover:inset-ring-0 text-black hover:scale-110 transition duration-300"
                              >
                                Remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}

              {result.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-600">
                    No results found.
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

        {/* View More Modal */}
        {viewModule && (
          <dialog
            className="modal modal-open bg-transparent text-white"
            style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
          >
            <div className="modal-box w-[500px] bg-gradient-to-br from-blue-950 from-20% via-sky-600 to-80% to-blue-950 shadow-lg ">
              <h3 className="font-bold text-[22px] mb-4 text-center">
                Module Details
              </h3>
              <table className="table w-full text-left">
                <tbody>
                  <tr>
                    <td className="font-bold text-[12px]">Module Name</td>
                    <td className="text-yellow-300 text-[16px]">
                      {viewModule.moduleName}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">Credits</td>
                    <td className="text-yellow-300 text-[16px]">
                      {viewModule.credits}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">Attempt</td>
                    <td className="text-yellow-300 text-[16px]">
                      {viewModule.attempt}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">Attendance</td>
                    <td className="text-yellow-300 text-[16px]">
                      {viewModule.attendance}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">Eligibility</td>
                    <td className="text-yellow-300 text-[16px]">
                      {viewModule.eligibility}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="modal-action inline-flex border-2 p-1.5 rounded-lg hover:border-none transition duration-300 ml-[350px]">
                <button
                  onClick={() => setViewModule(null)}
                  className="h-[30px]  btn btn-outline inset-ring-3 inset-ring-[#FF3EA5] bg-white text-black border-none rounded shadow-md shadow-[#FF3EA5]-500/50 hover:bg-[#FF3EA5] hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}
        {/* Edit Modal */}
        {editResult && (
          <dialog
            className="modal modal-open bg-transparent"
            style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
          >
            <div className="modal-box w-[800px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-950 via-sky-700 to-blue-950 shadow-lg text-white">
              <h3 className="font-bold text-[25px] mb-4 text-center">
                Edit Examination Result
              </h3>

              {/* Student-level fields */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Saegis ID"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editResult.saegisID}
                  onChange={(e) =>
                    setEditResult({ ...editResult, saegisID: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editResult.fullName}
                  onChange={(e) =>
                    setEditResult({ ...editResult, fullName: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Academic Year"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editResult.academicYear}
                  onChange={(e) =>
                    setEditResult({
                      ...editResult,
                      academicYear: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Semester"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editResult.semester}
                  onChange={(e) =>
                    setEditResult({ ...editResult, semester: e.target.value })
                  }
                />
              </div>

              {/* Module edit section */}
              <h4 className="font-semibold text-[18px] mt-5 mb-2 text-center">
                Module Details
              </h4>
              {editResult.modules.map((mod, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-2 bg-white/10 p-3 rounded-md mb-3"
                >
                  <input
                    type="text"
                    placeholder="Module Name"
                    className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                    value={mod.moduleName}
                    onChange={(e) =>
                      handleModuleChange(index, "moduleName", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Module Code"
                    className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                    value={mod.moduleCode}
                    onChange={(e) =>
                      handleModuleChange(index, "moduleCode", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Credits"
                    className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                    value={mod.credits}
                    onChange={(e) =>
                      handleModuleChange(index, "credits", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Result"
                    className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                    value={mod.result}
                    onChange={(e) =>
                      handleModuleChange(index, "result", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Attempt"
                    className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                    value={mod.attempt}
                    onChange={(e) =>
                      handleModuleChange(index, "attempt", e.target.value)
                    }
                  />
                </div>
              ))}

              {/* Modal buttons */}
              <div className="modal-action gap-3">
                <div className="border-1 p-1 rounded-lg hover:border-none transition duration-300  ">
                  <button
                    className="w-[60px] font-bold text-[12px] btn inset-ring-2 inset-ring-[#FF3EA5] bg-white text-black border-none shadow-[#FF3EA5] hover:bg-[#FF3EA5] hover:inset-ring-0 hover:text-black  hover:scale-110 transition duration-300 h-[30px] rounded-[7px]"
                    onClick={() => setEditResult(null)}
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
