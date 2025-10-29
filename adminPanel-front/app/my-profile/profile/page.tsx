"use client";

import Breadcrumbs from "@/app/components/breadcrumbs";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import LogoutButton from "./logout-popup";
import EditInfoButton from "./editInfo-popup";
import { UserInfo } from "@/app/types/user"; // ✅ shared type
import { useRouter } from "next/navigation";
import ManagePasswordButton from "./manage-password/page";

/* breadCrumbs mapping */
const nameMap = {
  app: "Home",
  "my-profile": "Profile Icon",
  profile: "My Profile",
  "activity-log": "Activity Log",
};

export default function ProfliePage() {
  const [profilePic, setProfilePic] = useState("/default-avatar.png");
  const router = useRouter();

  // Centralized user info state (shared with EditInfoButton)
  const [userInfo, setUserInfo] = useState<UserInfo>({
    Name: "John Doe",
    UserName: "john@example.com",
    Contact: "+1 (555) 123-4567",
  });

  const handleEditPic = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePic(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white pt-0 pb-10">
      {/* Breadcrumbs */}
            <div className="text-black mr-[970px] mt-[10px] ">
              <Breadcrumbs nameMap={nameMap} />
            </div>

      {/* Title */}
      <div className="top-10 pb-11 pt-0">
        <h1 className="text-[32px] font-bold text-black ">My Profile</h1>
      </div>

      {/* Profile picture */}
      <div className="relative">
        <Image
          src={profilePic}
          alt="Profile Picture"
          width={150}
          height={150}
          className="rounded-full border-2 border-black object-cover"
        />
        <button
          onClick={handleEditPic}
          className="absolute bottom-3 right-4 bg-blue-500 text-white px-1.5 py-1 text-sm rounded-full shadow-md hover:bg-blue-700 cursor-pointer"
        >
          <Pencil size="16" />
        </button>
      </div>

      {/* User Info */}
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{userInfo.Name}</h2>
        <p className="text-gray-600">{userInfo.UserName}</p>
        <p className="text-gray-600">{userInfo.Contact}</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-6 w-[1000px]">
        <LogoutButton />
        <EditInfoButton userInfo={userInfo} setUserInfo={setUserInfo} />
        <button className="w-[250px] font-bold text-[18px] py-2 cursor-pointer btn btn-outline  inset-ring-3 inset-ring-[#16FF00] bg-white text-black border-none rounded shadow-md shadow-[#16FF00]-500/50 hover:bg-[#16FF00] hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300" onClick={() => router.push("/my-profile/profile/my-activity-log")}>
          My Activity Log
        </button>
        <ManagePasswordButton/>
      </div>
    </div>
  );
}




{/* <Link
          href="/my-activity-log"
          className="w-full py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 cursor-pointer text-center"
        >
          My Activity Log
        </Link> */}
        {/* <button className="w-full py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 cursor-pointer">
          Manage Password
        </button> */}