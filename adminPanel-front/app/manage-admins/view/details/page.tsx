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

type Admin = {
  id: number;
  name: string;
  userName: string;
  role: "Admin" | "Super Admin";
  faculty: string;
  contact?: string;
};

export default function AdminTable() {
  //  State for editing
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  //  Fake data for now
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: 1,
      name: "John Doe",
      userName: "john.doe@uni.edu",
      role: "Admin",
      faculty: "Engineering",
      contact: "123-456-7890",
    },
    {
      id: 2,
      name: "Jane Smith",
      userName: "jane.smith@uni.edu",
      role: "Super Admin",
      faculty: "Science",
      contact: "123-456-7890",

    },
    {
      id: 3,
      name: "Mike Johnson",
      userName: "mike.johnson@uni.edu",
      role: "Admin",
      faculty: "Business",
      contact: "123-456-7890",

    },
  ]);

  /* useEffect(() => {
    fetch("https://localhost:7181/api/admins") //  your C# API endpoint
      .then((res) => res.json())
      .then((data) => setAdmins(data))
      .catch((err) => console.error("Error fetching admins:", err));
  }, []); */

  //  Remove admin
  const handleRemove = (id: number) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  //  Open edit modal
  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin);
  };

  //  Update admin details
  const handleUpdate = () => {
    if (editingAdmin) {
      setAdmins((prev) =>
        prev.map((a) => (a.id === editingAdmin.id ? editingAdmin : a))
      );
      setEditingAdmin(null); // close modal
    }
  };

  /* const handleUpdate = async () => {
    if (editingAdmin) {
      await fetch(`https://localhost:7181/api/admins/${editingAdmin.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingAdmin),
      });

      // Refresh local state
      setAdmins((prev) =>
        prev.map((a) => (a.id === editingAdmin.id ? editingAdmin : a))
      );
      setEditingAdmin(null);
    }
  }; */

  // Pagination logic
  const totalPages = Math.ceil(admins.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentLogs = admins.slice(startIndex, startIndex + pageSize);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="text-black ml-7 mt-[130px] ">
        <Breadcrumbs nameMap={nameMap} />
      </div>

      <div className="p-6 ml-[50px] mt-[20px]">
        <div className="mb-3 mt-0 ml-[680px]">
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

        <h1 className="text-4xl font-bold mb-6 text-black">Admin List</h1>

        <div className="overflow-x-auto  bg-white rounded-lg shadow">
          <table className="table w-full">
            <thead className=" bg-white inset-ring-1 inset-ring-black rounded-t-lg items-center">
              <tr className="text-black text-center">
                <th>Admin ID</th>
                <th>Name</th>
                <th>User Name (Academic Email)</th>
                <th>Role</th>
                <th>Faculty</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-black bg-white text-center inset-ring-1 inset-ring-black rounded-b-lg">
              {currentLogs.map((admin) => (
                <tr key={admin.id} className="border-t-2">
                  <td>{admin.id}</td>
                  <td>{admin.name}</td>
                  <td>{admin.userName}</td>
                  <td>{admin.role}</td>
                  <td>{admin.faculty}</td>
                  <td>{admin.contact}</td>
                  <td className="flex justify-center gap-2 ">
                    <button
                      onClick={() => handleEdit(admin)}
                      className="w-[60px] h-[30px] font-bold text-[12px] py-2 cursor-pointer btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white border-none rounded hover:bg-[#16FF00] hover:inset-ring-0 text-black hover:scale-110 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemove(admin.id)}
                      className="w-[60px] h-[30px] font-bold text-[12px] py-2 cursor-pointer btn btn-outline inset-ring-2 inset-ring-red-700 bg-white border-none rounded hover:bg-red-700 hover:inset-ring-0   text-black  hover:scale-110 transition duration-300"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              {admins.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-600">
                    No admins found.
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
        {editingAdmin && (
          <dialog
            className="modal modal-open bg-transparent"
            style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
          >
            <div className="modal-box w-96 bg-gradient-to-br from-blue-950 from-20%  via-sky-600  to-80% to-blue-950  shadow-lg">
              <h3 className="font-bold text-[25px]">Edit Admin</h3>

              <div className="mt-4 space-y-3 ">
                <input
                  type="text"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editingAdmin.name}
                  onChange={(e) =>
                    setEditingAdmin({ ...editingAdmin, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editingAdmin.userName}
                  onChange={(e) =>
                    setEditingAdmin({
                      ...editingAdmin,
                      userName: e.target.value,
                    })
                  }
                />
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editingAdmin.role}
                  onChange={(e) =>
                    setEditingAdmin({
                      ...editingAdmin,
                      role: e.target.value as "Admin" | "Super Admin",
                    })
                  }
                >
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editingAdmin.faculty}
                  onChange={(e) =>
                    setEditingAdmin({
                      ...editingAdmin,
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
                <input
                  type="tel"
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-[#FF3EA5] border-none"
                  value={editingAdmin.contact}
                  onChange={(e) =>
                    setEditingAdmin({
                      ...editingAdmin,
                      contact: e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-action gap-3">
                <div className="border-1 p-1 rounded-lg hover:border-none transition duration-300  ">
                  <button
                    className="w-[60px] font-bold text-[12px] btn inset-ring-2 inset-ring-[#FF3EA5] bg-white text-black border-none shadow-[#FF3EA5] hover:bg-[#FF3EA5] hover:inset-ring-0 hover:text-black  hover:scale-110 transition duration-300 h-[30px] rounded-[7px]"
                    onClick={() => setEditingAdmin(null)}
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
