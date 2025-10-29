"use client";

import { useState } from "react";
import Link from "next/link";
import { NavItem } from "../navBar/nav-items";

function NavMenu({ items }: { items: NavItem[] }) {
  return (
    <ul className="space-y-1 text-[18px] ">
      {items.map((item) => (
        <NavItemComponent key={item.title} item={item} />
      ))}
    </ul>
  );
}

function NavItemComponent({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <div
        className="flex justify-between items-center cursor-pointer p-2 pl-1 pb-3 rounded hover:bg-transparent hover:shadow-lg hover:border  hover:scale-105 transition duration-200 "
        onClick={() => item.children && setOpen(!open)}
      >
        <div className="flex items-center gap-1.5 pl-0 ml-0 flex-1">
          {item.icon && <span>{item.icon}</span>}
          {item.href ? (
            <Link href={item.href}>{item.title}</Link>
          ) : (
            <span>{item.title}</span>
          )}
        </div>

        {item.children && <span>{open ? "▾" : "▸"}</span>}
      </div>

      {item.children && open && (
        <div className="ml-4 border-0 pl-2.5">
          <NavMenu items={item.children} />
        </div>
      )}
    </li>
  );
}

export default NavMenu;
