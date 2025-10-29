"use client";

import Breadcrumbs from "@/app/components/breadcrumbs";
import { useState } from "react";

/* breadCrumbs mapping */
const nameMap = {
  app: "Home",
  "manage-admins": "Manage Admins",
  profile: "My Profile",
  add: "Add Admins",
};

type Admin = {
  name: string;
  userName: string;
  role: string;
  password: string;
  confirmPassword: string;
  faculty: string;
  contact: string;
  strength: string;
};

export default function AddAdminPage() {
  const [admins, setAdmins] = useState<Admin[]>([
    {
      name: "",
      userName: "",
      role: "Admin",
      password: "",
      confirmPassword: "",
      faculty: "",
      contact: "",
      strength: "",
    },
  ]);
  //  Function to evaluate strength
  const evaluateStrength = (password: string) => {
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return "Strong";
    }
    if (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return "Medium";
    }
    return "Weak";
  };

  // ✅ Handle input changes
  const handleChange = (index: number, field: keyof Admin, value: string) => {
    const updated = [...admins];
    updated[index][field] = value;

    // If password is being updated, also update strength
    if (field === "password") {
      updated[index].strength = evaluateStrength(value);
    }

    setAdmins(updated);
  };

  const handleAddAdmin = () => {
    setAdmins([
      ...admins,
      {
        name: "",
        userName: "",
        role: "Admin",
        password: "",
        confirmPassword: "",
        faculty: "",
        contact: "",
        strength: "",
      },
    ]);
  };

  const handleRemoveAdmin = (index: number) => {
    setAdmins(admins.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    for (const admin of admins) {
      if (admin.password !== admin.confirmPassword) {
        alert(
          `Passwords do not match for ${admin.userName || "one of the admins"}`
        );
        return;
      }
      if (admin.strength === "Weak") {
        alert(
          `Password for ${admin.userName || "one of the admins"} is too weak!`
        );
        return;
      }
    }

    console.log("Submitting admins:", admins);
    alert("Admins submitted! Check console for details.");
  };
  return (
    <>
      {/* Fixed Header + Breadcrumbs */}
      <div className="fixed ml-[35.5px] top-[95px] left-[260px] right-[1px] z-50 bg-white">
        <div className="ml-[45px] mt-[25px] ">
          {/* Breadcrumbs stays fixed */}
          <Breadcrumbs nameMap={nameMap} />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="min-h-screen bg-gradient-to-br from-blue-950 from-20%  via-sky-500  to-70% to-blue-950  p-8 pt-5 ml-[250px] mt-[195px] w-[700px] ">
        <h1 className="text-[33px] font-black mb-6 text-center text-white ">
          ADD ADMINS
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
          {admins.map((admin, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-6 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-blue-900 text-[20px] font-semibold">
                  ADMIN {index + 1}
                </h2>
                {admins.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAdmin(index)}
                    className="h-[30px] btn btn-sm btn-error inset-ring-3 inset-ring-red-500 bg-white border-none rounded hover:bg-red-700 hover:inset-ring-0 hover:text-white  text-black shadow-md shadow-red-500/50 hover:scale-110 transition duration-300"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={admin.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                  required
                />
              </div>

              {/* UserName */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">
                    User Name (Academic Email)
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Enter academic email"
                  value={admin.userName}
                  onChange={(e) =>
                    handleChange(index, "userName", e.target.value)
                  }
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                  required
                />
              </div>
              {/* Faculty */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">
                    Faculty
                  </span>
                </label>
                <select
                  className="select selected-border w-full bg-white text-black   hover:ring-2 hover:ring-blue-800 transition duration-200"
                  value={admin.faculty}
                  onChange={(e) =>
                    handleChange(index, "faculty", e.target.value)
                  }
                >
                  <option>Management, Humanities & Social Sciences</option>
                  <option>Computing & Technology</option>
                  <option>Postgraduate Studies</option>
                  <option>International Programmes</option>
                </select>
              </div>

              {/* Contact */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">
                    Contact
                  </span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter contact number"
                  value={admin.contact}
                  onChange={(e) =>
                    handleChange(index, "contact", e.target.value)
                  }
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                  required
                />
              </div>

              {/* Role */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">Role</span>
                </label>
                <select
                  className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                  value={admin.role}
                  onChange={(e) => handleChange(index, "role", e.target.value)}
                >
                  <option>Admin</option>
                  <option>Super Admin</option>
                </select>
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={admin.password}
                  onChange={(e) =>
                    handleChange(index, "password", e.target.value)
                  }
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                  required
                />
                {/* Strength Indicator */}
                {admin.password && (
                  <p
                    className={`text-sm mt-1 ${
                      admin.strength === "Weak"
                        ? "text-red-500"
                        : admin.strength === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    Strength: {admin.strength}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={admin.confirmPassword}
                  onChange={(e) =>
                    handleChange(index, "confirmPassword", e.target.value)
                  }
                  className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                  required
                />
              </div>
            </div>
          ))}

          {/* Buttons */}
          <div className="flex flex-1 justify-between items-center">
            <div className="border-2 p-1.5 rounded-lg hover:border-none transition duration-300  ">
              <button
                type="button"
                onClick={handleAddAdmin}
                className="h-[30px]  btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white text-black border-none rounded shadow-md shadow-[#16FF00]-500/50 hover:bg-[#16FF00] hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300"
              >
                + Add Another Admin
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
