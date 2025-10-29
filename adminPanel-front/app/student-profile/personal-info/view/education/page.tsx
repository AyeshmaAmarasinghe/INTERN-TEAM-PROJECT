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

  /* al details */
  al_syllabus: string;
  al_school: string;
  al_year: string;
  al_status: string;
  al_index: string;
  al_stream: string;
  al_english: string;

  /* ol details */
  ol_syllabus: string;
  ol_school: string;
  ol_year: string;
  ol_status: string;
  ol_index: string;
  ol_maths: string;
  ol_english: string;

  other_qualification: string;
};

export default function EducationPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 500;

  // fake data
  const [students, setStudents] = useState<StudentPersonalInfo[]>([
    {
      saegisId: "CH001",
      fullName: "Chamath Perera",

      // A/L details
      al_syllabus: "Local",
      al_school: "Ananda College, Colombo",
      al_year: "2022",
      al_status: "Passed",
      al_index: "4523689",
      al_stream: "Commerce",
      al_english: "B",

      // O/L details
      ol_syllabus: "Local",
      ol_school: "Ananda College, Colombo",
      ol_year: "2019",
      ol_status: "Passed",
      ol_index: "8945632",
      ol_maths: "A",
      ol_english: "A",

      other_qualification: "Diploma in Business English",
    },
    {
      saegisId: "CH002",
      fullName: "Nimal Silva",

      // A/L details
      al_syllabus: "London",
      al_school: "Gateway College, Colombo",
      al_year: "2021",
      al_status: "Passed",
      al_index: "LON-221134",
      al_stream: "Science",
      al_english: "A",

      // O/L details
      ol_syllabus: "London",
      ol_school: "Gateway College, Colombo",
      ol_year: "2018",
      ol_status: "Passed",
      ol_index: "LON-198745",
      ol_maths: "A*",
      ol_english: "A",

      other_qualification: "Pearson BTEC Level 3 Foundation in IT",
    },
    {
      saegisId: "CH003",
      fullName: "Kumari Jayasuriya",

      // A/L details
      al_syllabus: "Local",
      al_school: "Girls’ High School, Kandy",
      al_year: "2023",
      al_status: "Pending Results",
      al_index: "5789342",
      al_stream: "Arts",
      al_english: "C",

      // O/L details
      ol_syllabus: "Local",
      ol_school: "Girls’ High School, Kandy",
      ol_year: "2020",
      ol_status: "Passed",
      ol_index: "6754892",
      ol_maths: "B",
      ol_english: "A",

      other_qualification: "Certificate in Graphic Design",
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
        <h1 className="text-4xl mt-[40px] font-bold mb-6 ml-[30px] text-black">
          Students' Education Information
        </h1>
      </div>

      {/* table */}
      <div className="p-6 ml-[50px] mt-[305px]">
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table w-full">
            <thead className="bg-white  inset-ring-1 inset-ring-black rounded-t-lg items-center">
              <tr className="text-black text-center">
                <th>Saegis ID</th>
                <th>O/L Status</th>
                <th>O/L Maths</th>
                <th>O/L English</th>
                <th>A/L Status</th>
                <th>A/L English</th>
                <th>Other Qualifications</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-black bg-white text-center inset-ring-1 inset-ring-black rounded-b-lg">
              {currentLogs.map((student) => (
                <tr key={student.saegisId} className="border-t-2">
                  <td>{student.saegisId}</td>
                  <td>{student.ol_status}</td>
                  <td>{student.ol_maths}</td>
                  <td>{student.ol_english}</td>
                  <td>{student.al_status}</td>
                  <td>{student.al_english}</td>
                  <td>{student.other_qualification}</td>
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
                    <td className="font-bold text-[12px]">O/L School</td>
                    <td className="text-yellow-300 text-[16px]">
                      {viewStudent.ol_school}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">O/L Year</td>
                    <td className="text-yellow-300 text-[16px]">
                      {viewStudent.ol_year}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">O/L Index</td>
                    <td className="text-yellow-300 text-[16px]">
                      {viewStudent.ol_index}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">A/L School</td>
                    <td className="text-yellow-300 text-[16px]">
                      {viewStudent.al_school}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">A/L Year</td>
                    <td className="text-yellow-300 text-[16px]">
                      {viewStudent.al_year}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">A/L Index</td>
                    <td className="text-yellow-300 text-[16px]">
                      {viewStudent.al_index}
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
                Edit Education Information
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
                  value={editStudent.ol_school}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      ol_school: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.ol_year}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, ol_year: e.target.value })
                  }
                />
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.ol_status}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      ol_status: e.target.value as
                        | "O/L Status"
                        | "Pass"
                        | "Fail"
                        | "Incomplete"
                        | "Non-Participant",
                    })
                  }
                >
                  <option value="O/L Status">O/L Status</option>
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                  <option value="Incomplete">Incomplete</option>
                  <option value="Non-Participant">Non-Participant</option>
                </select>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.ol_index}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, ol_index: e.target.value })
                  }
                />
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.ol_maths}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      ol_maths: e.target.value as
                        | "O/L Maths"
                        | "A"
                        | "B"
                        | "C"
                        | "S"
                        | "F"
                        | "Absent"
                        | "Pending",
                    })
                  }
                >
                  <option value="O/L Maths">O/L Maths</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="S">S</option>
                  <option value="F">F</option>
                  <option value="Absent">Absent</option>
                  <option value="Pending">Pending</option>
                </select>
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.ol_english}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      ol_english: e.target.value as
                        | "O/L English"
                        | "A"
                        | "B"
                        | "C"
                        | "S"
                        | "F"
                        | "Absent"
                        | "Pending",
                    })
                  }
                >
                  <option value="O/L English">O/L English</option>
                  <option value="A">A</option>

                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="S">S</option>
                  <option value="F">F</option>
                  <option value="Absent">Absent</option>
                  <option value="Pending">Pending</option>
                </select>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.al_school}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      al_school: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.al_year}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, al_year: e.target.value })
                  }
                />
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.al_status}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      al_status: e.target.value as
                        | "A/L Status"
                        | "Pass"
                        | "Fail"
                        | "Incomplete"
                        | "Non-Participant",
                    })
                  }
                >
                  <option value="A/L Status">A/L Status</option>
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                  <option value="Incomplete">Incomplete</option>
                  <option value="Non-Participant">Non-Participant</option>
                </select>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.al_index}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, al_index: e.target.value })
                  }
                />
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.al_stream}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      al_stream: e.target.value as
                        | "Physical Science"
                        | "Biological Science"
                        | "Arts"
                        | "Commerce"
                        | "Engineering Technology"
                        | "Bio Technology",
                    })
                  }
                >
                  <option value="Physical Science">Physical Science</option>
                  <option value="Biological Science">Biological Science</option>
                  <option value="Arts">Arts</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Engineering Technology">
                    Engineering Technology
                  </option>
                  <option value="Bio Technology">Bio Technology</option>
                </select>
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.al_english}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      al_english: e.target.value as
                        | "A/L English"
                        | "A"
                        | "B"
                        | "C"
                        | "S"
                        | "F"
                        | "Absent"
                        | "Pending",
                    })
                  }
                >
                  <option value="A/L English">A/L English</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="S">S</option>
                  <option value="F">F</option>
                  <option value="Absent">Absent</option>
                  <option value="Pending">Pending</option>
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