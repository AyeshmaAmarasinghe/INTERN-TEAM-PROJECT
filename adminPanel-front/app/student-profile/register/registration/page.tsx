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

export default function RegisterStudentPage() {
  const [students, setStudents] = useState<Student[]>([
    {
      saegisID: "",
      nameWithInitials: "",
      fullName: "",
      nic_passport: "",
      email: "",
      saegisEmail: "",
      mobilePhone: "",
      homePhone: "",
      faculty: "",
      programType: "",
      programName: "",
      offeredBy: "",
      intake: "",
      password: "",
    },
  ]);

  // handle input changes
  const handleChange = (index: number, field: keyof Student, value: string) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };

  const handleRegisterStudent = () => {
    setStudents([
      ...students,
      {
        saegisID: "",
        nameWithInitials: "",
        fullName: "",
        nic_passport: "",
        email: "",
        saegisEmail: "",
        mobilePhone: "",
        homePhone: "",
        faculty: "",
        programType: "",
        programName: "",
        offeredBy: "",
        intake: "",
        password: "",
      },
    ]);
  };

  const handleRemoveStudent = (index: number) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting Students: ", students);
    alert("Students Submitted! ");
  };

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

  return (
    <>
      <div className="">
        {/* Fixed Header + Breadcrumbs */}
        <div className="fixed ml-[35.5px] top-[95px] left-[260px] right-[1px] z-50 bg-white">
          <div className="ml-[45px] mt-[25px]">
            {/* Breadcrumbs stays fixed */}
            <Breadcrumbs nameMap={nameMap} />
          </div>
        </div>
        {/* Scrollable Content */}
        <div className="min-h-screen bg-gradient-to-br from-blue-950 from-20%  via-sky-500  to-70% to-blue-950  p-8 pt-5 ml-[250px] mt-[195px] w-[700px] ">
          <h1 className="text-[33px] font-black mb-6 text-center text-white ">
            ADD STUDENTS
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
            {students.map((student, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-blue-900 text-[20px] font-semibold">
                    STUDENT {index + 1}
                  </h2>
                  {students.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveStudent(index)}
                      className="h-[30px] btn btn-sm btn-error inset-ring-3 inset-ring-red-500 bg-white border-none rounded hover:bg-red-700 hover:inset-ring-0 hover:text-white  text-black shadow-md shadow-red-500/50 hover:scale-110 transition duration-300"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Saegis Id */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      Saegis ID
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Saegis ID"
                    value={student.saegisID}
                    onChange={(e) =>
                      handleChange(index, "saegisID", e.target.value)
                    }
                    className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                    required
                  />
                </div>

                {/* Name with Initials */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      Name with Initials
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the name with initials"
                    value={student.nameWithInitials}
                    onChange={(e) =>
                      handleChange(index, "nameWithInitials", e.target.value)
                    }
                    className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                    required
                  />
                </div>

                {/* Full name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the full name"
                    value={student.fullName}
                    onChange={(e) =>
                      handleChange(index, "fullName", e.target.value)
                    }
                    className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                    required
                  />
                </div>

                {/* nic / passport */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      NIC / Passport
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter NIC / Passport"
                    value={student.nic_passport}
                    onChange={(e) =>
                      handleChange(index, "nic_passport", e.target.value)
                    }
                    className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                    required
                  />
                </div>

                {/* email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      Email (private)
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter the private Email Address"
                    value={student.email}
                    onChange={(e) =>
                      handleChange(index, "email", e.target.value)
                    }
                    className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                    required
                  />
                </div>

                {/*saegis email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      Academic Email
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter the Saegis Email Address"
                    value={student.saegisEmail}
                    onChange={(e) =>
                      handleChange(index, "saegisEmail", e.target.value)
                    }
                    className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                    required
                  />
                </div>

                {/*mobile phone */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      Mobile Phone
                    </span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter the mobile phone number"
                    value={student.mobilePhone}
                    onChange={(e) =>
                      handleChange(index, "mobilePhone", e.target.value)
                    }
                    className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                    required
                  />
                </div>

                {/*home phone */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      Home Phone
                    </span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter the home phone number"
                    value={student.homePhone}
                    onChange={(e) =>
                      handleChange(index, "homePhone", e.target.value)
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
                    className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                    value={student.faculty}
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

                {/* Program type */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      Program Type
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                    value={student.programType}
                    onChange={(e) =>
                      handleChange(index, "programType", e.target.value)
                    }
                  >
                    <option value="">Select Program Type</option>
                    {Object.keys(programsByType).map((programType) => (
                      <option value={programType} key={programType}>
                        {programType}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Program name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      Program Name
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                    value={student.programName}
                    onChange={(e) =>
                      handleChange(index, "programName", e.target.value)
                    }
                    disabled={!student.programType} // diable if no program type is selected
                  >
                    {/* <option value="">Select Program Name</option> */}
                    {student.programType &&
                      programsByType[student.programType]?.map(
                        (programName) => (
                          <option value={programName} key={programName}>
                            {programName}
                          </option>
                        )
                      )}
                  </select>
                </div>

                {/* Offered By */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      Offered By
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter offerer"
                    value={student.offeredBy}
                    onChange={(e) =>
                      handleChange(index, "offeredBy", e.target.value)
                    }
                    className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                    required
                  />
                </div>

                {/* Intake */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-bold">
                      Intake
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the intake"
                    value={student.intake}
                    onChange={(e) =>
                      handleChange(index, "intake", e.target.value)
                    }
                    className="input input-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                    required
                  />
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
                    placeholder="Enter the Password"
                    value={student.password}
                    onChange={(e) =>
                      handleChange(index, "password", e.target.value)
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
                  onClick={handleRegisterStudent}
                  className="h-[30px]  btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white text-black border-none rounded shadow-md shadow-[#16FF00]-500/50 hover:bg-[#16FF00] hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300"
                >
                  + Add Another Student
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
      </div>
    </>
  );
}
