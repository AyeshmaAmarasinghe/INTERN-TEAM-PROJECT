"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

interface BreadcrumbsProps {
  /** Optional mapping for friendly names */
  nameMap?: Record<string, string>;
}

export default function Breadcrumbs({ nameMap = {} }: BreadcrumbsProps) {
  const pathname = usePathname(); // e.g., /dashboard/my-profile
  const segments = pathname.split("/").filter(Boolean); // ["dashboard", "my-profile"]

  if (segments.length === 0) return null; // no breadcrumbs on root

  return (
    <nav className="flex items-center text-sm mb-4" aria-label="Breadcrumb">
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        // Use mapping for friendly name or convert segment to Title Case
        const name =
          nameMap[segment] ||
          segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

        return (
          <div key={href} className="flex items-center">
            <a className="hover:text-gray-600 font-bold text-black cursor-pointer">
              {name}
            </a>
            {!isLast && <ChevronRight className="w-4 h-4 mx-1 text-black" />}
          </div>
        );
      })}
    </nav>
  );
}
