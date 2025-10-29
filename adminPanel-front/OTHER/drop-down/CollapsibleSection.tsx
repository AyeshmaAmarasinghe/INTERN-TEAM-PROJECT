import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type SectionProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
};

const CollapsibleSection = ({ title, children }: SectionProps) => {
  const [open, setopen] = useState(false);
  const hasChildren = React.Children.toArray(children).length > 0;

  if (!title) return null;
  else if (!hasChildren) 
    return <div className="font-bold">{title}</div>;
  else
    return (
      <>
        <div className="mb-2">
          <button
            onClick={() => setopen(!open)}
            className="flex items-center gap-2 font-bold w-full text-left"
          >
            {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            {title}
          </button>
          {open && <div className="ml-6 mt-1 space-y-1">{children}</div>}
        </div>
      </>
    );
};

export default CollapsibleSection;
