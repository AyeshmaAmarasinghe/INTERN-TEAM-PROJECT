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

type StudentPersonalInfo = {
  saegisId: string;
  fullName: string;

  /* guardian's details */
  gName: string;
  relationship: string;
  occupation: string;
  mobilePhone: string;
  homePhone: string;
  officePhone: string;
  gCuAddress: string;
  gPerAddress: string;
};

export default function EducationPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 500;

  // fake data
  const [students, setStudents] = useState<StudentPersonalInfo[]>([
    {
      saegisId: "S1001",
      fullName: "Amal Perera",
      gName: "Sunil Perera",
      relationship: "Father",
      occupation: "Engineer",
      mobilePhone: "0771234567",
      homePhone: "0112345678",
      officePhone: "0112987654",
      gCuAddress: "45/A, Lake Road, Nugegoda",
      gPerAddress: "45/A, Lake Road, Nugegoda",
    },
    {
      saegisId: "S1002",
      fullName: "Kavindi Silva",
      gName: "Sandhya Silva",
      relationship: "Mother",
      occupation: "Teacher",
      mobilePhone: "0719876543",
      homePhone: "0112233445",
      officePhone: "0113344556",
      gCuAddress: "12/3, Hill Street, Dehiwala",
      gPerAddress: "12/3, Hill Street, Dehiwala",
    },
    {
      saegisId: "S1003",
      fullName: "Ruwan Fernando",
      gName: "Nimal Fernando",
      relationship: "Uncle",
      occupation: "Businessman",
      mobilePhone: "0756543210",
      homePhone: "0112765432",
      officePhone: "0113654789",
      gCuAddress: "89, Temple Road, Kandy",
      gPerAddress: "89, Temple Road, Kandy",
    },
  ]);

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

  // state for view more
  const [viewStudent, setViewStudent] = useState<StudentPersonalInfo | null>(
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
          Guardian's Information
        </h1>
      </div>

      {/* table */}
      <div className="p-6 ml-[50px] mt-[305px]">
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table w-full">
            <thead className="bg-white  inset-ring-1 inset-ring-black rounded-t-lg items-center">
              <tr className="text-black text-center">
                <th>Saegis ID</th>
                <th>Guardian</th>
                <th>Relationship</th>
                <th>Mobile Phone</th>
                <th>Office Phone</th>
                <th>Current Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-black bg-white text-center inset-ring-1 inset-ring-black rounded-b-lg">
              {currentLogs.map((student) => (
                <tr key={student.saegisId} className="border-t-2">
                  <td>{student.saegisId}</td>
                  <td>{student.gName}</td>
                  <td>{student.relationship}</td>
                  <td>{student.mobilePhone}</td>
                  <td>{student.officePhone}</td>
                  <td>{student.gCuAddress}</td>
                  <td className="flex justify-center">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setViewStudent(student)}
                        className="w-[92px] h-[30px] font-bold text-[12px] py-2 cursor-pointer btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white border-none rounded hover:bg-[#16FF00] hover:inset-ring-0 text-black hover:scale-110 transition duration-300"
                      >
                        View More
                      </button>
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
        {/* View More Modal */}
        {viewStudent && (
          <dialog
            className="modal modal-open bg-transparent text-white"
            style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
          >
            <div className="modal-box w-[500px] bg-gradient-to-br from-blue-950 from-20%  via-sky-700  to-80% to-blue-950 shadow-lg">
              <h3 className="font-bold text-[22px] mb-4">
                More Details - {viewStudent.fullName}
              </h3>
              <table className="table w-full text-left">
                <tbody>
                  <tr>
                    <td className="font-bold text-[12px]">Occupation</td>
                    <td className="text-yellow-300 text-[16px]">
                      {viewStudent.occupation}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">Home Phone</td>
                    <td className="text-yellow-300 text-[16px]">
                      {viewStudent.homePhone}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">Permanent Address</td>
                    <td className="text-yellow-300 text-[16px]">
                      {viewStudent.gPerAddress}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="modal-action inline-flex border-2 p-1.5 rounded-lg hover:border-none transition duration-300 ml-[350px]">
                <button
                  onClick={() => setViewStudent(null)}
                  className="h-[30px]  btn btn-outline inset-ring-3 inset-ring-[#FF3EA5] bg-white text-black border-none rounded shadow-md shadow-[#FF3EA5]-500/50 hover:bg-[#FF3EA5] hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}

        {/* Edit Modal */}
        {editStudent && (
          <dialog
            className="modal modal-open bg-transparent"
            style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
          >
            <div className="modal-box w-96 bg-gradient-to-br from-blue-950 from-20%  via-sky-600  to-80% to-blue-950 shadow-lg">
              <h3 className="font-bold text-[22px]">
                Edit Guardian's Information
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
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.fullName}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, fullName: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.gName}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      gName: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.relationship}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      relationship: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.occupation}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      occupation: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.mobilePhone}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      mobilePhone: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.homePhone}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      homePhone: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.officePhone}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      officePhone: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.gCuAddress}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      gCuAddress: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.gPerAddress}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      gPerAddress: e.target.value,
                    })
                  }
                />
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
