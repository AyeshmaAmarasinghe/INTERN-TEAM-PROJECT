"use client";

import Breadcrumbs from "@/app/components/breadcrumbs";
import { Calendar } from "lucide-react";
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

  /* personal */
  curAddress: string;
  perAddress: string;
  DOB: string;
  nationality: string;
  religion: string;
  district: string;
  province: string;

  /* guardian's details */
  gName: string;
  relationship: string;
  occupation: string;
  mobilePhone: string;
  homePhone: string;
  officePhone: string;
  gCuAddress: string;
  gPerAddress: string;
};

export default function AddPersonalInfoPage() {
  const [students, setStudents] = useState<StudentPersonalInfo[]>([
    {
      saegisId: "",
      al_syllabus: "",
      al_school: "",
      al_year: "",
      al_status: "",
      al_index: "",
      al_stream: "",
      al_english: "",
      ol_syllabus: "",
      ol_school: "",
      ol_year: "",
      ol_status: "",
      ol_index: "",
      ol_maths: "",
      ol_english: "",
      other_qualification: "",
      curAddress: "",
      perAddress: "",
      DOB: "",
      nationality: "",
      religion: "",
      district: "",
      province: "",
      gName: "",
      relationship: "",
      occupation: "",
      mobilePhone: "",
      homePhone: "",
      officePhone: "",
      gCuAddress: "",
      gPerAddress: "",
    },
  ]);

  const districtsByProvince: Record<string, string[]> = {
    "Western Province": ["Colombo", "Gampaha", "Kalutara"],
    "Central Province": ["Kandy", "Matale", "Nuwara Eliya"],
    "Southern Province": ["Galle", "Matara", "Hambantota"],
    "Northern Province": [
      "Jaffna",
      "Kilinochchi",
      "Mannar",
      "Vavuniya",
      "Mullaitivu",
    ],
    "Eastern Province": ["Trincomalee", "Batticaloa", "Ampara"],
    "North Western Province": ["Kurunegala", "Puttalam"],
    "North Central Province": ["Anuradhapura", "Polonnaruwa"],
    "Uva Province": ["Badulla", "Moneragala"],
    "Sabaragamuwa Province": ["Ratnapura", "Kegalle"],
  };

  // handle input changes
  const handleChange = (
    index: number,
    field: keyof StudentPersonalInfo,
    value: string
  ) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };

  const handleAddPersonalInfo = () => {
    setStudents([
      ...students,
      {
        saegisId: "",
        al_syllabus: "",
        al_school: "",
        al_year: "",
        al_status: "",
        al_index: "",
        al_stream: "",
        al_english: "",
        ol_syllabus: "",
        ol_school: "",
        ol_year: "",
        ol_status: "",
        ol_index: "",
        ol_maths: "",
        ol_english: "",
        other_qualification: "",
        curAddress: "",
        perAddress: "",
        DOB: "",
        nationality: "",
        religion: "",
        district: "",
        province: "",
        gName: "",
        relationship: "",
        occupation: "",
        mobilePhone: "",
        homePhone: "",
        officePhone: "",
        gCuAddress: "",
        gPerAddress: "",
      },
    ]);
  };

  const handleRemoveStudent = (index: number) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting Personal Details of Students: ", students);
    alert("Details Submitted! ");
  };

  return (
    <>
      <div className="fixed top-[95px] left-[295px] right-[1px] z-50 bg-white">
        <div className="ml-[45px] mt-[25px]">
          {/* Breadcrumbs stays fixed */}
          <Breadcrumbs nameMap={nameMap} />
        </div>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-blue-950 from-20%  via-sky-500  to-70% to-blue-950  p-8 pt-5 ml-[250px] mt-[195px] w-[700px] ">
        <h1 className="text-[33px] font-black mb-6 text-center text-white ">
          STUDENT PERSONAL INFORMATION
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
          {students.map((student, index) => (
            <div
              className="bg-white shadow rounded-lg p-6 space-y-4"
              key={index}
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
                  value={student.saegisId}
                  onChange={(e) =>
                    handleChange(index, "saegisId", e.target.value)
                  }
                  className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                  required
                />
              </div>

              {/*al / ol */}
              <div className="flex flex-row justify-items gap-[156px] text-blue-900 text-[20px] font-semibold">
                <h2>Advanced Level</h2>
                <h2>Ordinary Level</h2>
              </div>

              {/* a/l | o/l */}
              <div className="flex flex-row justify-between gap-8">
                {/*a/l */}
                <div className="flex-1">
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Syllabus
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      value={student.al_syllabus}
                      onChange={(e) =>
                        handleChange(index, "al_syllabus", e.target.value)
                      }
                    >
                      <option>Local</option>
                      <option>London</option>
                    </select>
                  </div>
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        School
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the A/L school"
                      value={student.al_school}
                      onChange={(e) =>
                        handleChange(index, "al_school", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Year
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the A/L year"
                      value={student.al_year}
                      onChange={(e) =>
                        handleChange(index, "al_year", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Index Number
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the A/L index number"
                      value={student.al_index}
                      onChange={(e) =>
                        handleChange(index, "al_index", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Status
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      value={student.al_status}
                      onChange={(e) =>
                        handleChange(index, "al_status", e.target.value)
                      }
                    >
                      <option>Pass</option>
                      <option>Fail</option>
                      <option>Incomplete</option>
                      <option>Non-Participant</option>
                    </select>
                  </div>
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Stream
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      value={student.al_stream}
                      onChange={(e) =>
                        handleChange(index, "al_stream", e.target.value)
                      }
                    >
                      <option>Physical Science</option>
                      <option>Biological Science</option>
                      <option>Arts</option>
                      <option>Commerce</option>
                      <option>Engineering Technology</option>
                      <option>Bio Technology</option>
                    </select>
                  </div>
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        English
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      value={student.al_english}
                      onChange={(e) =>
                        handleChange(index, "al_english", e.target.value)
                      }
                    >
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                      <option>S</option>
                      <option>F</option>
                      <option>Absent</option>
                      <option>Pending</option>
                    </select>
                  </div>
                </div>
                {/*o/l */}
                <div className="flex-1">
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Syllabus
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      value={student.ol_syllabus}
                      onChange={(e) =>
                        handleChange(index, "ol_syllabus", e.target.value)
                      }
                    >
                      <option>Local</option>
                      <option>London</option>
                    </select>
                  </div>
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        School
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the O/L school"
                      value={student.ol_school}
                      onChange={(e) =>
                        handleChange(index, "ol_school", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Year
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the O/L year"
                      value={student.ol_year}
                      onChange={(e) =>
                        handleChange(index, "ol_year", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>

                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Index Number
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the O/L index number"
                      value={student.ol_index}
                      onChange={(e) =>
                        handleChange(index, "ol_index", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>

                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Status
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      value={student.ol_status}
                      onChange={(e) =>
                        handleChange(index, "ol_status", e.target.value)
                      }
                    >
                      <option>Pass</option>
                      <option>Fail</option>
                      <option>Incomplete</option>
                      <option>Non-Participant</option>
                    </select>
                  </div>
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Mathematics
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      value={student.ol_maths}
                      onChange={(e) =>
                        handleChange(index, "ol_maths", e.target.value)
                      }
                    >
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                      <option>S</option>
                      <option>F</option>
                      <option>Absent</option>
                      <option>Pending</option>
                    </select>
                  </div>
                  <div className="form-control flex-1">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        English
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      value={student.ol_english}
                      onChange={(e) =>
                        handleChange(index, "ol_english", e.target.value)
                      }
                    >
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                      <option>S</option>
                      <option>F</option>
                      <option>Absent</option>
                      <option>Pending</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* other qualifications */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black font-bold">
                    Other Qualifications
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter the other qualifications that you own"
                  value={student.other_qualification}
                  onChange={(e) =>
                    handleChange(index, "other_qualification", e.target.value)
                  }
                  className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                  required
                />
              </div>

              {/*guardian / personal heading */}
              <div className="flex flex-row justify-items gap-[80px] text-blue-900 text-[20px] font-semibold">
                <h1>Guardin's Information</h1>
                <h2>Personal Information</h2>
              </div>

              {/* guardian / personal details */}
              <div className="flex flex-row justify-between gap-8">
                {/*guardian */}
                <div className="flex-1">
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the guardian's name"
                      value={student.gName}
                      onChange={(e) =>
                        handleChange(index, "gName", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Relationship
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Relationship with the student"
                      value={student.relationship}
                      onChange={(e) =>
                        handleChange(index, "relationship", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Occupation
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Occupation of the guardian"
                      value={student.relationship}
                      onChange={(e) =>
                        handleChange(index, "relationship", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Mobile Phone
                      </span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter guardian's mobile phone "
                      value={student.mobilePhone}
                      onChange={(e) =>
                        handleChange(index, "mobilePhone", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Home Phone
                      </span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter guardian's home phone "
                      value={student.homePhone}
                      onChange={(e) =>
                        handleChange(index, "homePhone", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Office Phone
                      </span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter guardian's Office phone "
                      value={student.officePhone}
                      onChange={(e) =>
                        handleChange(index, "officePhone", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Current Address
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter guardian's current address"
                      value={student.gCuAddress}
                      onChange={(e) =>
                        handleChange(index, "gCuAddress", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Permanent Address
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter guardian's permanent addr.."
                      value={student.gPerAddress}
                      onChange={(e) =>
                        handleChange(index, "gPerAddress", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>
                </div>

                {/*personal */}
                <div className="flex-1">
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Current Address
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter student's current address"
                      value={student.curAddress}
                      onChange={(e) =>
                        handleChange(index, "curAddress", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Permanent Address
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter student's permanent address"
                      value={student.perAddress}
                      onChange={(e) =>
                        handleChange(index, "perAddress", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        DOB
                      </span>
                    </label>

                    {/* Wrapper to hold input + custom button */}
                    <div className="relative">
                      <input
                        ref={(el) => {
                          (window as any).dobInput = el;
                        }} // keep ref simple for button click
                        type="date"
                        placeholder="Enter student's date of birth"
                        value={student.DOB}
                        onChange={(e) =>
                          handleChange(index, "DOB", e.target.value)
                        }
                        className="date-input input input-bordered w-full pr-10 bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                        required
                      />

                      {/* custom black calendar icon */}
                      <button
                        type="button"
                        onClick={() => {
                          const el: any = (window as any).dobInput;
                          if (el?.showPicker) {
                            el.showPicker();
                          } else {
                            el?.focus();
                          }
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-black p-1 rounded hover:bg-black/5"
                      >
                        <Calendar className="w-5 h-5" />
                      </button>
                    </div>

                    <style jsx>{`
                      /* hide only the native picker for this field */
                      .date-input::-webkit-calendar-picker-indicator {
                        opacity: 0;
                        pointer-events: none;
                      }
                      .date-input::-webkit-clear-button,
                      .date-input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        display: none;
                      }
                      .date-input::-moz-calendar-picker-indicator {
                        opacity: 0;
                        pointer-events: none;
                      }
                    `}</style>
                  </div>

                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Nationality
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter student's nationality"
                      value={student.nationality}
                      onChange={(e) =>
                        handleChange(index, "nationality", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Religion
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter student's religion"
                      value={student.religion}
                      onChange={(e) =>
                        handleChange(index, "religion", e.target.value)
                      }
                      className="input input-bordered w-full bg-white hover:inset-ring-2 hover:inset-ring-blue-800 border-none text-black"
                      required
                    />
                  </div>

                  {/* Province */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        Province
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                      value={student.province}
                      onChange={(e) =>
                        handleChange(index, "province", e.target.value)
                      }
                    >
                      <option value="">Select Province</option>
                      {Object.keys(districtsByProvince).map((province) => (
                        <option value={province} key={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black font-bold">
                        District
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full bg-white text-black hover:inset-ring-2 hover:inset-ring-blue-800 border-none"
                      value={student.district}
                      onChange={(e) =>
                        handleChange(index, "district", e.target.value)
                      }
                      disabled={!student.province} // diable if no province is selected
                    >
                      {/* <option value="">Select Program Name</option> */}
                      {student.province &&
                        districtsByProvince[student.province]?.map(
                          (districtName) => (
                            <option value={districtName} key={districtName}>
                              {districtName}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Buttons */}
          <div className="flex flex-1 justify-between items-center">
            <div className="border-2 p-1.5 rounded-lg hover:border-none transition duration-300  ">
              <button
                type="button"
                onClick={handleAddPersonalInfo}
                className="h-[30px]  btn btn-outline inset-ring-3 inset-ring-[#16FF00] bg-white text-black border-none rounded shadow-md shadow-[#16FF00]-500/50 hover:bg-[#16FF00] hover:inset-ring-0 hover:text-black hover:shadow-xl hover:scale-110 transition duration-300"
              >
                + Add Another Set
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
