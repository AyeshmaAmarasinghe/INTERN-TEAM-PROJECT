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

type Student = {
  saegisID: string;
  nameWithInitials: string;
  fullName: string;
  nic_passport: string;
  email: string;
  saegisEmail: string;
  mobilePhone: string;
  homePhone: string;
  faculty: string;
  programType: string;
  programName: string;
  offeredBy: string;
  intake: string;
  password: string;
};

export default function StudentTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 500;

  // fake data
  const [students, setStudents] = useState<Student[]>([
    {
      saegisID: "S001",
      nameWithInitials: "A. Perera",
      fullName: "Amal Perera",
      nic_passport: "199812345678",
      email: "amal.perera@gmail.com",
      saegisEmail: "amal.perera@saegis.ac.lk",
      mobilePhone: "0771234567",
      homePhone: "0112345678",
      faculty: "Computing & Technology",
      programType: "Undergraduate - Information Technology",
      programName: "BSc (Hons) in Software Engineering",
      offeredBy: "Faculty of Computing",
      intake: "February 2025",
      password: "Pass@1234",
    },
    {
      saegisID: "S002",
      nameWithInitials: "K. Silva",
      fullName: "Kavindi Silva",
      nic_passport: "200056789123",
      email: "kavindi.silva@yahoo.com",
      saegisEmail: "kavindi.silva@saegis.ac.lk",
      mobilePhone: "0719876543",
      homePhone: "0112987654",
      faculty: "Management, Humanities & Social Sciences",
      programType: "Undergraduate - Management",
      programName: "Bachelor of Business Management (Hons) in HR Management",
      offeredBy: "Faculty of Management",
      intake: "September 2025",
      password: "Admin@5678",
    },
    {
      saegisID: "S003",
      nameWithInitials: "R. Fernando",
      fullName: "Ruwan Fernando",
      nic_passport: "198945612378",
      email: "ruwan.fernando@hotmail.com",
      saegisEmail: "ruwan.fernando@saegis.ac.lk",
      mobilePhone: "0756543210",
      homePhone: "0112654321",
      faculty: "Postgraduate Studies",
      programType: "Postgraduate",
      programName: "Master of Business Administration International",
      offeredBy: "Faculty of Postgraduate Studies",
      intake: "July 2025",
      password: "Temp@9999",
    },
  ]);

  const programsByType: Record<string, string[]> = {
    Certificate: ["Dual Certificate in English and Information Technology"],
    Foundation: [
      "Pearson BTEC Level 3 International Foundation Program for Higher Education in Business",
      "Pearson BTEC International Level 3 Foundation Diploma in Information Technology",
    ],
    Diploma: ["Diploma in English", "Diploma in Management, IT & English"],
    "Higher National Diploma": [
      "BTEC HND in Business Management",
      "BTEC Level 5 HND in Business Accounting and Finance",
      "BTEC HND in Computing (Software Engineering)",
      "BTEC Higher Nationals Computing (Network Engineering)",
    ],
    "Top up - Business": [
      "BSc. (Hons) Business Management (Top-Up)",
      "BSc. (Hons) in Accounting and Finance (Top-Up)",
    ],
    "Top up - Computing": [
      "Bachelor of Engineering (Hons) in Software Engineering (Top-Up)",
    ],
    "Undergraduate - Management": [
      "Bachelor of Business Administration",
      "Bachelor of Business Management (Hons) in Tourism and Hospitality Management",
      "Bachelor of Business Management (Hons)",
      "Bachelor of Business Management (Hons) in Accounting & Finance",
      "Bachelor of Business Management (Hons) in HR Management",
      "Bachelor of Business Management (Hons) in Marketing",
    ],
    "Undergraduate - Information Technology": [
      "Bachelor of Information Technology - BIT",
      "BSc (Hons) in IT",
      "BSc (Hons) in SE",
      "BSc (Hons) in CS",
    ],
    "Undergraduate - Languages": ["BA in English"],
    Postgraduate: ["Master of Business Administration International"],
  };

  // state for editing
  const [editStudent, setEditStudent] = useState<Student | null>(null);

  // state for "view more"
  const [viewStudent, setViewStudent] = useState<Student | null>(null);

  //  Remove student
  const handleRemove = (saegisID: string) => {
    setStudents(students.filter((student) => student.saegisID !== saegisID));
  };

  //  Open edit modal
  const handleEdit = (student: Student) => {
    setEditStudent(student);
  };

  // update student details
  const handleUpdate = () => {
    if (editStudent) {
      setStudents((prev) =>
        prev.map((a) => (a.saegisID === editStudent.saegisID ? editStudent : a))
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
          Student List
        </h1>
      </div>

      <div className="p-6 ml-[50px] mt-[300px]">
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table w-full ">
            <thead className=" bg-white shadow-lg inset-ring-1 inset-ring-black rounded-t-lg items-center ">
              <tr className="text-black text-center">
                <th>Saegis ID</th>
                <th>Full Name</th>
                <th>Academic Email</th>
                <th>Mobile Phone</th>
                <th>Program Name</th>
                <th>Intake</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="inset-ring-1 inset-ring-black rounded-b-lg text-[16px] text-black bg-white text-center ">
              {currentLogs.map((student) => (
                <tr key={student.saegisID} className="border-t-2 ">
                  <td>{student.saegisID}</td>
                  <td>{student.fullName}</td>
                  <td>{student.saegisEmail}</td>
                  <td>{student.mobilePhone}</td>
                  <td>{student.programName}</td>
                  <td>{student.intake}</td>
                  <td className="flex justify-center ">
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
                        onClick={() => handleRemove(student.saegisID)}
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
              <table className="table w-full text-left ">
                <tbody>
                  <tr>
                    <td className="font-bold text-[12px]">
                      Name with Initials
                    </td>
                    <td className="text-yellow-300 text-[18px]">
                      {viewStudent.nameWithInitials}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">NIC / Passport</td>
                    <td className="text-yellow-300 text-[18px]">
                      {viewStudent.nic_passport}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">Faculty</td>
                    <td className="text-yellow-300 text-[18px]">
                      {viewStudent.faculty}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">Program Type</td>
                    <td className="text-yellow-300 text-[18px]">
                      {viewStudent.programType}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">Private Email</td>
                    <td className="text-yellow-300 text-[18px]">
                      {viewStudent.email}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">Home Phone</td>
                    <td className="text-yellow-300 text-[18px]">
                      {viewStudent.homePhone}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-[12px]">Offered By</td>
                    <td className="text-yellow-300 text-[18px]">
                      {viewStudent.offeredBy}
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
              <h3 className="font-bold text-[25px]">Edit Student Details</h3>

              <div className="mt-4 space-y-3 ">
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.saegisID}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, saegisID: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.nameWithInitials}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      nameWithInitials: e.target.value,
                    })
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
                  value={editStudent.nic_passport}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      nic_passport: e.target.value,
                    })
                  }
                />
                <input
                  type="email"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.email}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, email: e.target.value })
                  }
                />
                <input
                  type="email"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.saegisEmail}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      saegisEmail: e.target.value,
                    })
                  }
                />
                <input
                  type="tel"
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
                  type="tel"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.homePhone}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      homePhone: e.target.value,
                    })
                  }
                />
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.faculty}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      faculty: e.target.value as
                        | "Management, Humanities & Social Sciences"
                        | "Computing & Technology"
                        | "Postgraduate Studies"
                        | "International Programmes",
                    })
                  }
                >
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
                  value={editStudent.programType}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      programType: e.target.value,
                      programName: "", // reset programName when type changes
                    })
                  }
                >
                  <option value="">Select Program Type</option>
                  {Object.keys(programsByType).map((programType) => (
                    <option value={programType} key={programType}>
                      {programType}
                    </option>
                  ))}
                </select>
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.programName}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      programName: e.target.value,
                    })
                  }
                  disabled={!editStudent.programType} // disable if no program type
                >
                  {editStudent.programType &&
                    programsByType[editStudent.programType]?.map(
                      (programName) => (
                        <option value={programName} key={programName}>
                          {" "}
                          {programName}{" "}
                        </option>
                      )
                    )}{" "}
                </select>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.offeredBy}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      offeredBy: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editStudent.intake}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      intake: e.target.value,
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
