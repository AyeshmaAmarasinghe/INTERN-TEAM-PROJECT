"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import Breadcrumbs from "@/app/components/breadcrumbs";

/* breadCrumbs mapping */
const nameMap = {
  app: "Home",
  "my-profile": "Profile Icon",
  profile: "My Profile",
  "activity-log": "Activity Log",
};

export default function GenerateTempPasswordForm() {
  const [userName, setUserName] = useState("");
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fake password generator
  const generateRandomPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    return Array.from({ length: 10 })
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("");
  };

  const handleGenerate = async () => {
    if (!userName) {
      alert("Please enter a valid academic email!");
      return;
    }
    setLoading(true);

    // 🔹 Fake API logic for now
    setTimeout(() => {
      const newPassword = generateRandomPassword();
      setTempPassword(newPassword);
      setShowModal(true); // open modal
      setLoading(false);

      // later: replace with real API call
      /*
      await fetch(`https://localhost:7181/api/admins/generate-temp-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName }),
      }).then(res => res.json()).then(data => {
        setTempPassword(data.tempPassword);
      });
      */

      setLoading(false);
    }, 1000);
  };

  const handleCopy = () => {
    if (tempPassword) {
      navigator.clipboard.writeText(tempPassword);
      alert("Password copied to clipboard!");
    }
  };

  return (
    <>
      <div className="mt-[120px]">
        {/* Breadcrumbs */}
        <div className="text-black ml-[40px]">
          <Breadcrumbs nameMap={nameMap} />
        </div>
        <div className="p-[40px] max-w-md mx-auto mt-[100px] bg-gradient-to-br from-blue-950 from-20%  via-sky-600  to-70% to-blue-950 rounded-lg shadow-lg">
          <h2 className="text-[27px] font-bold mb-4 text-center text-white">
            Generate Temporary Password
          </h2>

          <div className="form-control mb-4">
            <label className="label text-white pb-4 pl-3">
              Academic Email :{" "}
            </label>
            <input
              type="email"
              className="input input-bordered w-full bg-white text-black"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="admin@uni.edu"
            />
          </div>
          <div className="w-[318px] ml-[30px] mt-7 border-2 p-1.5 rounded-lg hover:border-none transition duration-300">
            <button
              className="w-[300px] h-[30px]  btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white text-black border-none rounded shadow-md shadow-[#16FF00]-500/50 hover:bg-[#16FF00] hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300
 "
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Temporary Password"}
            </button>
          </div>

          {/* 🔹 Popup Modal */}
          {showModal && tempPassword && (
            <dialog
              open
              className="modal modal-open bg-transparent"
              style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
            >
              <div className="modal-box relative bg-blue-950 shadow-lg">
                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 btn btn-xs btn-outline"
                >
                  <Copy size={16} />
                </button>

                <h3 className="font-bold mb-3 text-center text-[25px] text-white">
                  Temporary Password
                </h3>
                <div className="flex flex-col items-center justify-center text-center">
                  <p className="mt-3 ml-5 text-white">
                    For <b className="text-[20px]">{userName}</b>, the temporary
                    password is:
                  </p>

                  <p className="text-2xl font-bold mt-4 text-white bg-black px-3 py-1 rounded">
                    {tempPassword}
                  </p>
                </div>

                <p className="text-[17px] font-bold text-red-500 mt-4 ">
                  ⚠️ This password will expire in 24 hours.
                </p>

                <div className="modal-action">
                  <button
                    onClick={() => setShowModal(false)}
                    className=" w-[60px] h-[30px] font-bold text-[12px] py-2 cursor-pointer btn btn-outline inset-ring-2 inset-ring-black-500 bg-white border-none rounded hover:bg-black hover:inset-ring-0 hover:text-white hover:shadow-xl hover:shadow-black-500/50 text-black shadow-md shadow-black-500/50 hover:scale-110 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </dialog>
          )}
        </div>
      </div>
    </>
  );
}
