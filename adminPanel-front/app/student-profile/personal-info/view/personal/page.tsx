"use client";

import Breadcrumbs from "@/app/components/breadcrumbs";
import { Calendar } from "lucide-react";
import { useState } from "react";

/* breadCrumbs mapping */
const nameMap = {
  app: "Home",
  "my-profile": "Profile Icon",
  profile: "My Profile",
  "activity-log": "Activity Log",
};

type StudentPersonalInfo = {
  saegisId: string;

  /* personal */
  curAddress: string;
  perAddress: string;
  DOB: string;
  nationality: string;
  religion: string;
  district: string;
  province: string;
};

export default function EducationPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 500;

  // fake data
  const [students, setStudents] = useState<StudentPersonalInfo[]>([
    {
      saegisId: "S001",
      curAddress: "No. 45, Temple Road, Nugegoda",
      perAddress: "No. 12, Lake View, Kandy",
      DOB: "1998-05-14",
      nationality: "Sri Lankan",
      religion: "Buddhism",
      district: "Colombo",
      province: "Western Province",
    },
    {
      saegisId: "S002",
      curAddress: "23/7, Galle Road, Mount Lavinia",
      perAddress: "56, Hill Side, Matara",
      DOB: "2000-09-28",
      nationality: "Sri Lankan",
      religion: "Christianity",
      district: "Galle",
      province: "Southern Province",
    },
    {
      saegisId: "S003",
      curAddress: "78, Station Road, Negombo",
      perAddress: "101, Coconut Grove, Kurunegala",
      DOB: "1997-12-03",
      nationality: "Sri Lankan",
      religion: "Hinduism",
      district: "Kurunegala",
      province: "North Western Province",
    },
  ]);

  const districtsByProvince: Record<string, string[]> = {
    "Western Province": ["Colombo", "Gampaha", "Kalutara"],
    "Central Province": ["Kandy", "Matale", "Nuwara Eliya"],
    "Southern Province": ["Galle", "Matara", "Hambantota"],
    "Northern Province": [
      "Jaffna",
      "Kilinochchi",
      "Mannar",
      "Vavuniya",
      "Mullaitivu",
    ],
    "Eastern Province": ["Trincomalee", "Batticaloa", "Ampara"],
    "North Western Province": ["Kurunegala", "Puttalam"],
    "North Central Province": ["Anuradhapura", "Polonnaruwa"],
    "Uva Province": ["Badulla", "Moneragala"],
    "Sabaragamuwa Province": ["Ratnapura", "Kegalle"],
  };

  /* useEffect(() => {
    fetch("https://localhost:7181/api/admins") //  your C# API endpoint
      .then((res) => res.json())
      .then((data) => setAdmins(data))
      .catch((err) => console.error("Error fetching admins:", err));
  }, []); */

  // state for editing
  const [editStudent, setEditStudent] = useState<StudentPersonalInfo | null>(
    null
  );

  //  Remove student
  const handleRemove = (saegisID: string) => {
    setStudents(students.filter((student) => student.saegisId !== saegisID));
  };

  //  Open edit modal
  const handleEdit = (student: StudentPersonalInfo) => {
    setEditStudent(student);
  };

  // update student details
  const handleUpdate = () => {
    if (editStudent) {
      setStudents((prev) =>
        prev.map((a) => (a.saegisId === editStudent.saegisId ? editStudent : a))
      );
      setEditStudent(null);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(students.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentLogs = students.slice(startIndex, startIndex + pageSize);

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
        <h1 className="text-4xl font-bold mb-6 ml-[30px] text-black mt-[40px]">
          Student's Personal Information
        </h1>
      </div>

      {/* table */}
      <div className="p-6 ml-[50px] mt-[305px]">
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table w-full">
            <thead className="bg-white shadow-lg inset-ring-1 inset-ring-black rounded-t-lg items-center">
              <tr className="text-black text-center">
                <th>Saegis ID</th>
                <th>DOB</th>
                <th>Current Address</th>
                <th>Permanent Address</th>
                <th>Nationality</th>
                <th>Religion</th>
                <th>Province</th>
                <th>District</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-black inset-ring-1 inset-ring-black rounded-b-lg bg-white text-center">
              {currentLogs.map((student) => (
                <tr key={student.saegisId} className="border-t-2">
                  <td>{student.saegisId}</td>
                  <td>{student.DOB}</td>
                  <td>{student.curAddress}</td>
                  <td>{student.perAddress}</td>
                  <td>{student.nationality}</td>
                  <td>{student.religion}</td>
                  <td>{student.province}</td>
                  <td>{student.district}</td>
                  <td className="flex justify-center">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="w-[92px] h-[30px] font-bold text-[12px] py-2 cursor-pointer btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white border-none rounded hover:bg-[#16FF00] hover:inset-ring-0 text-black hover:scale-110 transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemove(student.saegisId)}
                        className="w-[92px] h-[30px] font-bold text-[12px] py-2 cursor-pointer btn btn-outline inset-ring-3 inset-ring-red-600 bg-white border-none rounded hover:bg-red-600 hover:inset-ring-0 text-black hover:scale-110 transition duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
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
        {editStudent && (
          <dialog
            className="modal modal-open bg-transparent"
            style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
          >
            <div className="modal-box w-96 bg-gradient-to-br from-blue-950 from-20%  via-sky-600  to-80% to-blue-950 shadow-lg">
              <h3 className="font-bold text-[23px]">
                Edit Personal Information
              </h3>
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.saegisId}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, saegisId: e.target.value })
                  }
                />
                <div className="relative w-full">
                  <input
                    ref={(el) => {
                      (window as any).dobInput = el;
                    }}
                    type="date"
                    className="date-input input input-bordered w-full bg-white text-black pr-10 hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                    value={editStudent.DOB}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, DOB: e.target.value })
                    }
                  />

                  {/* Custom calendar button */}
                  <button
                    type="button"
                    onClick={() => {
                      const el: any = (window as any).dobInput;
                      if (el?.showPicker) {
                        el.showPicker();
                      } else {
                        el?.focus();
                      }
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black p-1 rounded hover:bg-[#FF3EA5]/10"
                  >
                    <Calendar className="w-5 h-5" />
                  </button>

                  <style jsx>{`
                    /* Hide only the native picker for this field */
                    .date-input::-webkit-calendar-picker-indicator {
                      opacity: 0;
                      pointer-events: none;
                    }
                    .date-input::-webkit-clear-button,
                    .date-input::-webkit-inner-spin-button {
                      -webkit-appearance: none;
                      display: none;
                    }
                    .date-input::-moz-calendar-picker-indicator {
                      opacity: 0;
                      pointer-events: none;
                    }
                  `}</style>
                </div>

                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.curAddress}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      curAddress: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.perAddress}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      perAddress: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.nationality}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      nationality: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.religion}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      religion: e.target.value,
                    })
                  }
                />
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.province}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      province: e.target.value,
                      district: "", // reset programName when type changes
                    })
                  }
                >
                  <option value="">Select Province</option>
                  {Object.keys(districtsByProvince).map((province) => (
                    <option value={province} key={province}>
                      {province}
                    </option>
                  ))}
                </select>
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.district}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      district: e.target.value,
                    })
                  }
                  disabled={!editStudent.province} // disable if no program type
                >
                  {editStudent.province &&
                    districtsByProvince[editStudent.province]?.map(
                      (district) => (
                        <option value={district} key={district}>
                          {" "}
                          {district}{" "}
                        </option>
                      )
                    )}{" "}
                </select>
              </div>
              <div className="modal-action gap-3">
                <div className="border-1 p-1 rounded-lg hover:border-none transition duration-300  ">
                  <button
                    className="w-[60px] font-bold text-[12px] btn inset-ring-2 inset-ring-[#FF3EA5] bg-white text-black border-none shadow-[#FF3EA5] hover:bg-[#FF3EA5] hover:inset-ring-0 hover:text-black  hover:scale-110 transition duration-300 h-[30px] rounded-[7px]"
                    onClick={() => setEditStudent(null)}
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
