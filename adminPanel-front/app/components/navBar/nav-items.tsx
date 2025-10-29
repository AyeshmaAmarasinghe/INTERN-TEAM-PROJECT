import {
  BanknoteArrowDown,
  Component,
  FileText,
  GraduationCap,
  HandFist,
  MailWarning,
  Newspaper,
  RotateCcwKey,
  ShieldUserIcon,
  UserCheck,
} from "lucide-react";

export type NavItem = {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
};

export const navItems: NavItem[] = [
  {
    title: "Student Profile",
    icon: <GraduationCap size={22} />,
    children: [
      {
        title: "Register",
        children: [
          {
            title: "Registration",
            href: "/student-profile/register/registration",
          },
          {
            title: "Registered Info",
            href: "/student-profile/register/registered-info",
          },
        ],
      },
      {
        title: "Personal Info",
        children: [
          {
            title: "Add",
            href: "/student-profile/personal-info/add",
          },
          {
            title: "View",
            children: [
              {
                title: "Education",
                href: "/student-profile/personal-info/view/education",
              },
              {
                title: "Guardian Info",
                href: "/student-profile/personal-info/view/guardianInfo",
              },
              {
                title: "Personal",
                href: "/student-profile/personal-info/view/personal",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Examination",
    icon: <FileText size={22} />,
    children: [
      {
        title: "Time Tables",
        children: [
          {
            title: "Add",
            href: "/examination/time-tables/add",
          },
          {
            title: "View",
            href: "/examination/time-tables/view",
          },
        ],
      },
      {
        title: "Results",
        children: [
          {
            title: "Add",
            href: "/examination/results/add",
          },
          {
            title: "View",
            href: "/examination/results/view",
          },
        ],
      },
    ],
  },
  {
    title: "Payment Requests",
    icon: <BanknoteArrowDown size={22} />,
    children: [
      {
        title: "Pending Approval",
        children: [
          {
            title: "Degree Fee",
            href: "/payment-requests/pending/degree-fee",
          },
          {
            title: "Other Fee",
            href: "/payment-requests/pending/other-fee",
          },
        ],
      },
      {
        title: "Approved",
        href: "/payment-requests/approved",
      },
      {
        title: "Rejected",
        href: "/payment-requests/rejected",
      },
    ],
  },
  {
    title: "Attendance",
    icon: <UserCheck size={22} />,
    children: [
      {
        title: "View",
        children: [
          {
            title: "Lecture Attendance",
            href: "/attendance/view/lec-attendance",
          },
          {
            title: "Uni In/Out",
            children: [
              {
                title: "Attend. Details",
                href: "/attendance/view/uni-attendance/attendance-details",
              },
              {
                title: "Blocked Details",
                href: "/attendance/view/uni-attendance/blocked-details",
              },
            ],
          },
        ],
      },
      {
        title: "QR",
        children: [
          {
            title: "Issue QR",
            href: "/attendance/qr/issue-qr",
          },
          {
            title: "Issued History",
            href: "/attendance/qr/generated-history",
          },
        ],
      },
    ],
  },
  {
    title: "Programs & Modules",
    icon: <Component size={22} />,
    children: [
      {
        title: "Programs",
        children: [
          {
            title: "Create",
            href: "",
          },
          {
            title: "View",
            href: "",
          },
          {
            title: "Status",
            href: "",
          },
        ],
      },
      {
        title: "Modules",
        children: [
          {
            title: "Create",
            href: "",
          },
          {
            title: "View",
            href: "",
          },
        ],
      },
    ],
  },
  {
    title: "Manage Password",
    href: "/manage-password",
    icon: <RotateCcwKey size={26} />,
  },
  {
    title: "News",
    icon: <Newspaper size={22} />,
    children: [
      {
        title: "View",
        href: "",
      },
      {
        title: "Add",
        href: "",
      },
    ],
  },
  {
    title: "Request Letters",
    icon: <MailWarning size={22} />,
    children: [
      {
        title: "Submit",
        href: "",
      },
      {
        title: "History",
        href: "",
      },
    ],
  },
  {
    title: "Clubs & Societies",
    icon: <HandFist size={22} />,
    children: [
      {
        title: "Create",
        href: "",
      },
      {
        title: "Add Details",
        href: "",
      },
      {
        title: "View",
        children: [
          {
            title: "Clubs",
            href: "",
          },
          {
            title: "Club Details",
            href: "",
          },
        ],
      },
    ],
  },
  {
    title: "Manage Admins",
    icon: <ShieldUserIcon size={22} />,
    children: [
      {
        title: "Add",
        href: "/manage-admins/add",
      },
      {
        title: "View",
        children: [
          {
            title: "Details",
            href: "/manage-admins/view/details",
          },
          {
            title: "Activity Log",
            href: "/manage-admins/view/activity-log",
          },
        ],
      },
      {
        title: "Manage Password",
        href: "/manage-admins/manage-password",
      },
    ],
  },
];
