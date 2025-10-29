"use client";

import { useRef } from "react";

export default function LogoutButton() {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleLogout = () => {
    window.location.href = "/app"; 
  };

  return (
    <>
      {/* Logout button */}
      <button
        className="w-[250px] font-bold text-[18px] py-2 cursor-pointer btn btn-outline  inset-ring-3 inset-ring-red-600 bg-white text-black border-none rounded shadow-md shadow-red-500/50 hover:bg-red-600 hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300"
        onClick={() => modalRef.current?.showModal()}
      >
        Log Out
      </button>

      {/* DaisyUI modal */}
      <dialog ref={modalRef} className="modal ">
        <div className="modal-box text-white bg-gradient-to-br from-blue-950 from-20%  via-sky-600  to-80% to-blue-950">
          <h3 className="font-bold text-[21px]">Confirm Logout</h3>
          <p className="py-2 text-[17px] mt-3">Are you sure you want to log out?</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <div className="border-1 p-1 rounded-lg hover:border-none transition duration-300  ">
              {/* Cancel button (closes modal) */}
              <button className="btn inset-ring-2 inset-ring-[#FF3EA5] bg-white text-black border-none rounded shadow-md shadow-[#FF3EA5]-500/50 hover:bg-[#FF3EA5] hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300 h-[30px]">Cancel</button>
              </div>
              <div className="border-1 p-1 rounded-lg hover:border-none transition duration-300  ">
              {/* Logout button */}
              <button
                type="button"
                className="btn btn-error inset-ring-2 inset-ring-red-600 bg-white text-black border-none rounded shadow-md shadow-red-500/50 hover:bg-red-600 hover:inset-ring-0 hover:text-black hover:shadow-md hover:scale-110 transition duration-300  h-[30px]"
                onClick={handleLogout}
              >
                Log Out
              </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
