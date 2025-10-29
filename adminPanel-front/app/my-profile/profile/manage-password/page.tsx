"use client";

import { useRef, useState } from "react";

export default function ManagePasswordButton() {
  const modalRef = useRef<HTMLDialogElement>(null);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [strength, setStrength] = useState("");

  const handleOpen = () => modalRef.current?.showModal();
  const handleClose = () => modalRef.current?.close();

  //  Check password strength
  const evaluateStrength = (password: string) => {
    // Strong: At least 8 chars, uppercase, number, special char
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return "Strong";
    }

    // Medium: At least 6 chars, uppercase, number
    if (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return "Medium";
    }

    // Otherwise Weak
    return "Weak";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "newPassword") {
      setStrength(evaluateStrength(value));
    }
  };

  const handleResetPassword = () => {
    console.log("Resetting password with:", formData); // Replace with API later
    modalRef.current?.close();
  };

  //  Disable Reset until valid
  const isValid =
    formData.newPassword === formData.confirmPassword &&
    (strength === "Medium" || strength === "Strong");

  return (
    <>
      <button
        className="w-[250px] font-bold text-[18px] py-2 cursor-pointer btn btn-outline  inset-ring-3 inset-ring-[#16FF00] bg-white text-black border-none rounded shadow-md shadow-[#16FF00]-500/50 hover:bg-[#16FF00] hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300"
        onClick={handleOpen}
      >
        Manage Password
      </button>

      <dialog
        ref={modalRef}
        className="modal "
        style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
      >
        <div className="modal-box p-10 rounded-lg shadow-lg bg-gradient-to-br from-blue-950 from-20%  via-sky-500  to-80% to-blue-950 ">
          <h3 className="font-bold text-2xl mb-7 text-white">
            Manage Password
          </h3>

          {/* Current Password */}
          <label className="input input-bordered flex items-center gap-2 mb-3 bg-white">
            <span className="text-black w-40">Current Password:</span>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="grow text-black"
              required
            />
          </label>

          {/* New Password */}
          <label className="input input-bordered flex items-center gap-2 mb-1 bg-white">
            <span className="text-black w-40">New Password:</span>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="grow text-black"
              required
            />
          </label>
          {/* Password Strength Indicator */}
          <div className="bg-white w-[150px] font-bold rounded-[3px] mt-2">
            {formData.newPassword && (
              <p
                className={`text-sm mt-1 pl-3  ${
                  strength === "Weak"
                    ? "text-red-500"
                    : strength === "Medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                Strength: {strength}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <label className="input input-bordered flex items-center gap-2 mb-3 mt-3 bg-white">
            <span className="text-black w-40">Confirm Password:</span>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="grow text-black"
              required
            />
          </label>

          {/* Actions */}
          <div className="modal-action gap-5 ">
            <div className="border-1 p-1 rounded-lg hover:border-none transition duration-300  ">
              <button
                className="btn inset-ring-2 inset-ring-[#FF3EA5] bg-white text-black border-none shadow-[#FF3EA5] hover:bg-[#FF3EA5] hover:inset-ring-0 hover:text-black  hover:scale-110 transition duration-300 h-[30px] w-[75px] rounded-[7px] shadow-none"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
            <div className="border-1 p-1 rounded-lg hover:border-none transition duration-300  ">
              <button
                className={`btn h-[30px] w-[75px] rounded-[7px] border-none shadow-none  ${
                  isValid
                    ? "inset-ring-2 inset-ring-[#FF3EA5] bg-white text-black border-none rounded shadow-md shadow-[#FF3EA5]-500/50 hover:bg-[#FF3EA5] hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300"
                    : "bg-gray-200 text-gray-700 cursor-not-allowed"
                }`}
                disabled={!isValid}
                onClick={handleResetPassword}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
