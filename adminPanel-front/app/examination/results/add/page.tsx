"use client";

import Breadcrumbs from "@/app/components/breadcrumbs";
import { useState } from "react";

/* breadCrumbs mapping */
const nameMap = {
  app: "Home",
  "my-profile": "Profile Icon",
  profile: "My Profile",
  "activity-log": "Activity Log",
};

/* ---------- Types ---------- */
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
  faculty: string;
  academicYear: string;
  programName: string;
  semester: string;
  modules: Module[];
};

/* ---------- Component ---------- */
export default function AddExamResults() {
  const [results, setResults] = useState<ExamResult[]>([
    {
      saegisID: "",
      faculty: "",
      academicYear: "",
      programName: "",
      semester: "",
      modules: [
        {
          moduleName: "",
          moduleCode: "",
          credits: "",
          result: "",
          gradePoint: "",
          attempt: "",
          attendance: "",
          eligibility: "",
        },
      ],
    },
  ]);

  /* handle student info field change */
  const handleStudentChange = (
    index: number,
    field: keyof ExamResult,
    value: string
  ) => {
    const newResults = [...results];
    (newResults[index][field] as string) = value;
    setResults(newResults);
  };

  /* handle module field change */
  const handleModuleChange = (
    studentIndex: number,
    moduleIndex: number,
    field: keyof Module,
    value: string
  ) => {
    const newResults = [...results];
    newResults[studentIndex].modules[moduleIndex][field] = value;
    setResults(newResults);
  };

  /* add new student */
  const handleAddStudent = () => {
    setResults([
      ...results,
      {
        saegisID: "",
        faculty: "",
        academicYear: "",
        programName: "",
        semester: "",
        modules: [
          {
            moduleName: "",
            moduleCode: "",
            credits: "",
            result: "",
            gradePoint: "",
            attempt: "",
            attendance: "",
            eligibility: "",
          },
        ],
      },
    ]);
  };

  /* remove a student */
  const handleRemoveStudent = (index: number) => {
    setResults(results.filter((_, i) => i !== index));
  };

  /* add module for a specific student */
  const handleAddModule = (studentIndex: number) => {
    const newResults = [...results];
    newResults[studentIndex].modules.push({
      moduleName: "",
      moduleCode: "",
      credits: "",
      result: "",
      gradePoint: "",
      attempt: "",
      attendance: "",
      eligibility: "",
    });
    setResults(newResults);
  };

  /* remove module */
  const handleRemoveModule = (studentIndex: number, moduleIndex: number) => {
    const newResults = [...results];
    newResults[studentIndex].modules = newResults[studentIndex].modules.filter(
      (_, i) => i !== moduleIndex
    );
    setResults(newResults);
  };

  /* on form submit */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting Exam Results:", results);
    alert("Results Submitted Successfully!");
  };

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

  return (
    <>
      {/* Breadcrumbs Header */}
      <div className="fixed top-[95px] left-[295px] right-[1px] z-50 bg-white">
        <div className="ml-[45px] mt-[25px]">
          <Breadcrumbs nameMap={nameMap} />
        </div>
      </div>

      {/* Main Form */}
      <div className="min-h-screen bg-gradient-to-br from-blue-950 from-20%  via-sky-500  to-70% to-blue-950  p-8 pt-5 ml-[250px] mt-[195px] w-[700px]">
        <h1 className="text-[33px] font-black mb-6 text-center text-white">
          ADD END EXAM RESULTS
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
          {results.map((student, studentIndex) => (
            <div
              key={studentIndex}
              className="bg-white shadow-lg rounded-lg p-6 space-y-6"
            >
              {/* Student Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-blue-900 text-[20px] font-semibold">
                  STUDENT {studentIndex + 1}'S RESULTS
                </h2>
                {results.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveStudent(studentIndex)}
                    className="h-[30px] btn btn-sm btn-error inset-ring-3 inset-ring-red-500 bg-white border-none rounded hover:bg-red-700 hover:inset-ring-0 hover:text-white  text-black shadow-md shadow-red-500/50 hover:scale-110 transition duration-300"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Student Details */}
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      Saegis ID
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Saegis ID"
                    className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                    value={student.saegisID}
                    onChange={(e) =>
                      handleStudentChange(
                        studentIndex,
                        "saegisID",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      Faculty
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                    value={student.faculty}
                    onChange={(e) =>
                      handleStudentChange(
                        studentIndex,
                        "faculty",
                        e.target.value
                      )
                    }
                  >
                    <option>Select the Faculty</option>
                    <option>Management, Humanities & Social Sciences</option>
                    <option>Computing & Technology</option>
                    <option>Postgraduate Studies</option>
                    <option>International Programmes</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      Academic Year
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                    value={student.academicYear}
                    onChange={(e) =>
                      handleStudentChange(
                        studentIndex,
                        "academicYear",
                        e.target.value
                      )
                    }
                  >
                    <option>Select the Year</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      Program Name
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                    value={student.programName}
                    onChange={(e) =>
                      handleStudentChange(
                        studentIndex,
                        "programName",
                        e.target.value
                      )
                    }
                  >
                    <option>Select the Program Name</option>
                    <option>
                      Dual Certificate in English and Information Technology
                    </option>
                    <option>
                      Pearson BTEC Level 3 International Foundation Program for
                      Higher Education in Business
                    </option>
                    <option>
                      Pearson BTEC International Level 3 Foundation Diploma in
                      Information Technology
                    </option>
                    <option>Diploma in English</option>
                    <option>Diploma in Management, IT & English</option>
                    <option>BTEC HND in Business Management</option>
                    <option>
                      BTEC Level 5 HND in Business Accounting and Finance
                    </option>
                    <option>
                      BTEC HND in Computing (Software Engineering)
                    </option>
                    <option>
                      BTEC Higher Nationals Computing (Network Engineering)
                    </option>
                    <option>BSc. (Hons) Business Management (Top-Up)</option>
                    <option>
                      BSc. (Hons) in Accounting and Finance (Top-Up)
                    </option>
                    <option>
                      Bachelor of Engineering (Hons) in Software Engineering
                      (Top-Up)
                    </option>
                    <option>Bachelor of Business Administration</option>
                    <option>
                      Bachelor of Business Management (Hons) in Tourism and
                      Hospitality Management
                    </option>
                    <option>Bachelor of Business Management (Hons)</option>
                    <option>
                      Bachelor of Business Management (Hons) in Accounting &
                      Finance
                    </option>
                    <option>
                      Bachelor of Business Management (Hons) in HR Management
                    </option>
                    <option>
                      Bachelor of Business Management (Hons) in Marketing
                    </option>
                    <option>Bachelor of Information Technology - BIT</option>
                    <option>BSc (Hons) in IT</option>
                    <option>BSc (Hons) in SE</option>
                    <option>BSc (Hons) in CS</option>
                    <option>BA in English</option>
                    <option>
                      Master of Business Administration International
                    </option>
                  </select>
                </div>
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      Semester
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the semester"
                    value={student.semester}
                    onChange={(e) =>
                      handleStudentChange(
                        studentIndex,
                        "semester",
                        e.target.value
                      )
                    }
                    className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                    required
                  />
                </div>
              </div>

              {/* Modules Section */}
              <div className="mt-6 border-t pt-4">
                <h3 className="text-black text-[18px] font-bold mb-3">
                  MODULES
                </h3>

                {student.modules.map((module, moduleIndex) => (
                  <div
                    key={moduleIndex}
                    className="border border-gray-300 rounded-lg p-4 mb-4"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-blue-900 font-semibold">
                        MODULE {moduleIndex + 1}
                      </h4>
                      {student.modules.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveModule(studentIndex, moduleIndex)
                          }
                          className="h-[30px] btn btn-sm btn-error inset-ring-3 inset-ring-red-500 bg-white border-none rounded hover:bg-red-700 hover:inset-ring-0 hover:text-white  text-black shadow-md shadow-red-500/50 hover:scale-110 transition duration-300"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-bold">
                            Module Name
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter the module name"
                          value={module.moduleName}
                          onChange={(e) =>
                            handleModuleChange(
                              studentIndex,
                              moduleIndex,
                              "moduleName",
                              e.target.value
                            )
                          }
                          className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                          required
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-bold">
                            Module Code
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter the module code"
                          value={module.moduleCode}
                          onChange={(e) =>
                            handleModuleChange(
                              studentIndex,
                              moduleIndex,
                              "moduleCode",
                              e.target.value
                            )
                          }
                          className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                          required
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-bold">
                            Credits
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter the module credits"
                          value={module.credits}
                          onChange={(e) =>
                            handleModuleChange(
                              studentIndex,
                              moduleIndex,
                              "credits",
                              e.target.value
                            )
                          }
                          className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                          required
                        />
                      </div>

                      {/* Result */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-bold">
                            Result
                          </span>
                        </label>
                        <select
                          className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                          value={module.result}
                          onChange={(e) =>
                            handleModuleChange(
                              studentIndex,
                              moduleIndex,
                              "result",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select the Result</option>
                          {Object.keys(gradePointByResult).map((result) => (
                            <option value={result} key={result}>
                              {result}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Grade Point */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-bold">
                            Grade Point
                          </span>
                        </label>
                        <select
                          className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                          value={module.gradePoint}
                          onChange={(e) =>
                            handleModuleChange(
                              studentIndex,
                              moduleIndex,
                              "gradePoint",
                              e.target.value
                            )
                          }
                          disabled={!module.result} // diable if no program type is selected
                        >
                          {module.result &&
                            gradePointByResult[module.result]?.map(
                              (gradePoint) => (
                                <option value={gradePoint} key={gradePoint}>
                                  {gradePoint}
                                </option>
                              )
                            )}
                        </select>
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-bold">
                            Attempt
                          </span>
                        </label>
                        <select
                          className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                          value={module.attempt}
                          onChange={(e) =>
                            handleModuleChange(
                              studentIndex,
                              moduleIndex,
                              "attempt",
                              e.target.value
                            )
                          }
                        >
                          <option>Attempt 1</option>
                          <option>Attempt 2</option>
                          <option>Attempt 3</option>
                        </select>
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-bold">
                            Attendance
                          </span>
                        </label>
                        <select
                          className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                          value={module.attendance}
                          onChange={(e) =>
                            handleModuleChange(
                              studentIndex,
                              moduleIndex,
                              "attendance",
                              e.target.value
                            )
                          }
                        >
                          <option>Participated</option>
                          <option>Absent</option>
                          <option>Medical</option>
                        </select>
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-black font-bold">
                            Eligibility
                          </span>
                        </label>
                        <select
                          className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                          value={module.eligibility}
                          onChange={(e) =>
                            handleModuleChange(
                              studentIndex,
                              moduleIndex,
                              "eligibility",
                              e.target.value
                            )
                          }
                        >
                          <option>Eligible</option>
                          <option>Non-Eligible</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Module Button */}
                <button
                  type="button"
                  onClick={() => handleAddModule(studentIndex)}
                  className="h-[30px] ml-[450px] btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white text-black border-none rounded shadow-md shadow-[#16FF00]-500/50 hover:bg-[#16FF00] hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300"
                >
                  + Add Module
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-1 justify-between items-center">
            {/* Add Student Button */}
            <div className="border-2 p-1.5 rounded-lg hover:border-none transition duration-300">
              <button
                type="button"
                onClick={handleAddStudent}
                className="h-[30px]  btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white text-black border-none rounded shadow-md shadow-[#16FF00]-500/50 hover:bg-[#16FF00] hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300"
              >
                + Add Another Student
              </button>
            </div>

            <div className="border-2 p-1.5 rounded-lg hover:border-none transition duration-300">
              <button
                type="submit"
                className="h-[30px]  btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white text-black border-none rounded shadow-md shadow-[#16FF00]-500/50 hover:bg-[#16FF00] hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300"
              >
                Submit All Results
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
