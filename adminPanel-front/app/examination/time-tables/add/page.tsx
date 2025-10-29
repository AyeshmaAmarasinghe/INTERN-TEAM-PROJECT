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

type timeTable = {
  faculty: string;
  programName: string;
  intake: string;
  examType: string;
  academicYear: string;
  semester: string;
  file: File | null;
};

export default function AddTimeTablePage() {
  const [timeTables, setTimeTables] = useState<timeTable[]>([
    {
      faculty: "",
      programName: "",
      intake: "",
      examType: "",
      academicYear: "",
      semester: "",
      file: null,
    },
  ]);

  // handle input changes
  const handleChange = (
    index: number,
    field: keyof timeTable,
    value: string | File | null
  ) => {
    const updated = [...timeTables];
    (updated[index][field] as string | File | null) = value;
    setTimeTables(updated);
  };

  const handleAddTimeTable = () => {
    setTimeTables([
      ...timeTables,
      {
        faculty: "",
        programName: "",
        intake: "",
        examType: "",
        academicYear: "",
        semester: "",
        file: null,
      },
    ]);
  };

  const handleRemoveTable = (index: number) => {
    setTimeTables(timeTables.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    timeTables.forEach((tt, index) => {
      formData.append(`timeTables[${index}].faculty`, tt.faculty);
      formData.append(`timeTables[${index}].programName`, tt.programName);
      formData.append(`timeTables[${index}].intake`, tt.intake);
      formData.append(`timeTables[${index}].examType`, tt.examType);
      formData.append(`timeTables[${index}].academicYear`, tt.academicYear);
      formData.append(`timeTables[${index}].semester`, tt.semester);
      if (tt.file) {
        formData.append(`timeTables[${index}].file`, tt.file);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/api/timetables", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload timetable");
      }

      const result = await response.json();
      console.log("✅ Uploaded successfully:", result);
    } catch (error) {
      console.error("❌ Upload error:", error);
    }
  };

  return (
    <>
      <div className="fixed top-[95px] left-[295px] right-[1px] z-50 bg-white">
        <div className="ml-[45px] mt-[25px]">
          {/* Breadcrumbs stays fixed */}
          <Breadcrumbs nameMap={nameMap} />
        </div>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-blue-950 from-20%  via-sky-500  to-70% to-blue-950  p-8 pt-5 ml-[250px] mt-[195px] w-[700px] ">
        <h1 className="text-[33px] font-black mb-6 text-center text-white ">
          ADD TIME TABLE
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
          {timeTables.map((timeTable, index) => (
            <div
              className="bg-white shadow rounded-lg p-6 space-y-4"
              key={index}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-blue-900 text-[20px] font-semibold">
                  TIME TABLE {index + 1}
                </h2>
                {timeTables.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTable(index)}
                    className="h-[30px] btn btn-sm btn-error inset-ring-3 inset-ring-red-500 bg-white border-none rounded hover:bg-red-700 hover:inset-ring-0 hover:text-white  text-black shadow-md shadow-red-500/50 hover:scale-110 transition duration-300"
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">
                    Faculty
                  </span>
                </label>
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                  value={timeTable.faculty}
                  onChange={(e) =>
                    handleChange(index, "faculty", e.target.value)
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
                    Program Name
                  </span>
                </label>
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                  value={timeTable.programName}
                  onChange={(e) =>
                    handleChange(index, "programName", e.target.value)
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
                  <option>BTEC HND in Computing (Software Engineering)</option>
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">
                    Intake
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter the intake"
                  value={timeTable.intake}
                  onChange={(e) =>
                    handleChange(index, "intake", e.target.value)
                  }
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">
                    Exam Type
                  </span>
                </label>
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                  value={timeTable.examType}
                  onChange={(e) =>
                    handleChange(index, "examType", e.target.value)
                  }
                >
                  <option>Select the Exam Type</option>
                  <option>Monthly Exam</option>
                  <option>Mid Exam</option>
                  <option>End Exam</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">
                    Academic Year
                  </span>
                </label>
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                  value={timeTable.academicYear}
                  onChange={(e) =>
                    handleChange(index, "academicYear", e.target.value)
                  }
                >
                  <option>Select the Academic Year</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">
                    Semester
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter the semester"
                  value={timeTable.semester}
                  onChange={(e) =>
                    handleChange(index, "semester", e.target.value)
                  }
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                  required
                />
              </div>
              <div className="form-control ">
                <label className="label ">
                  <span className="label-text text-black font-bold">
                    File Upload
                  </span>
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  className="file-input file-input-bordered w-[260px] ml-[90px] h-[30px] bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                  onChange={(e) =>
                    handleChange(index, "file", e.target.files?.[0] || null)
                  }
                />
              </div>
            </div>
          ))}
          {/* Buttons */}
          <div className="flex flex-1 justify-between items-center">
            <div className="border-2 p-1.5 rounded-lg hover:border-none transition duration-300  ">
              <button
                type="button"
                onClick={handleAddTimeTable}
                className="h-[30px]  btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white text-black border-none rounded shadow-md shadow-[#16FF00]-500/50 hover:bg-[#16FF00] hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300"
              >
                + Add Another Table
              </button>
            </div>
            <div className="border-2 p-1.5 rounded-lg hover:border-none transition duration-300  ">
              <button
                type="submit"
                className="h-[30px]  btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white text-black border-none rounded shadow-md shadow-[#16FF00]-500/50 hover:bg-[#16FF00] hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300"
              >
                Submit All
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
