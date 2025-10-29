import { navItems } from "../navBar/nav-items";
import NavMenu from "../navBar/nav-menu";

export default function Sidebar() {
  return (
    <aside className="w-[295px] bg-blue-950 text-white  h-[calc(100vh-90px)] p-2 flex flex-col fixed top-[90px] left-0 z-40 overflow-y-auto">
      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-1.5">
        <NavMenu items={navItems} />
      </div>
    </aside>
  );
}
