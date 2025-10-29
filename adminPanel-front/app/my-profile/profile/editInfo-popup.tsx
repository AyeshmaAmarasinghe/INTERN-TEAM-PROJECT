"use client";

import { useRef, useState, useEffect } from "react";
import { UserInfo } from "@/app/types/user";

export default function EditInfoButton({
  userInfo,
  setUserInfo,
}: {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);

  // Local form state
  const [formData, setFormData] = useState<UserInfo>(userInfo);

  // 🔑 Sync formData whenever userInfo changes
  useEffect(() => {
    setFormData(userInfo);
  }, [userInfo]);

  const handleOpen = () => {
    modalRef.current?.showModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInfo = () => {
    setUserInfo(formData); // update parent state
    modalRef.current?.close();
  };

  return (
    <>
      <button
        className="w-[250px] font-bold text-[18px] py-2 cursor-pointer btn btn-outline  inset-ring-3 inset-ring-[#16FF00] bg-white text-black border-none rounded shadow-md shadow-[#16FF00]-500/50 hover:bg-[#16FF00] hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300"
        onClick={handleOpen}
      >
        Edit Info
      </button>

      <dialog ref={modalRef} className="modal ">
        <div className="modal-box  p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-950 from-20%  via-sky-500  to-80% to-blue-950">
          <h3 className="font-bold text-[24px] mb-4 text-white">
            Edit Information
          </h3>

          {/* Name */}
          <label className="input input-bordered flex items-center gap-2 mb-3 bg-white">
            <span className="text-black text-[15px]">Name:</span>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="grow text-black font-bold text-[16px] "
              required
            />
          </label>

          {/* Username */}
          <label className="input input-bordered flex items-center gap-2 mb-3 bg-white">
            <span className="text-black text-[15px]">Username:</span>
            <input
              type="email"
              name="UserName"
              value={formData.UserName}
              onChange={handleChange}
              className="grow text-black font-bold text-[16px]"
              required
            />
          </label>

          {/* Phone */}
          <label className="input input-bordered flex items-center gap-2 mb-3 bg-white">
            <span className="text-black text-[15px]">Phone:</span>
            <input
              type="tel"
              name="Contact"
              value={formData.Contact}
              onChange={handleChange}
              className="grow text-black font-bold text-[16px]"
              required
            />
          </label>

          {/* Actions */}
          <div className="modal-action">
            <div className="border-1 p-1 rounded-lg hover:border-none transition duration-300  ">
            <button
              className="btn inset-ring-2 inset-ring-[#FF3EA5] bg-white text-black border-none shadow-[#FF3EA5] hover:bg-[#FF3EA5] hover:inset-ring-0 hover:text-black  hover:scale-110 transition duration-300 h-[30px] rounded-[7px]"
              onClick={() => modalRef.current?.close()}
            >
              Cancel
            </button>
            </div>
            <div className="border-1 p-1 rounded-lg hover:border-none transition duration-300  ">
            <button
              className="btn inset-ring-2 inset-ring-[#FF3EA5] bg-white text-black border-none shadow-[#FF3EA5] hover:bg-[#FF3EA5] hover:inset-ring-0 hover:text-black  hover:scale-110 transition duration-300 h-[30px] rounded-[7px]"
              onClick={handleEditInfo}
            >
              Update
            </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
