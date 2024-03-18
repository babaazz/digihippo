"use client";
import { useState, useRef, useEffect } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

import { PRODUCT_CATEGORIES } from "@/config";
import NavItem from "./NavItem";

const NavItems = () => {
  const [activeIdx, setActiveIdx] = useState<null | number>(null);

  const isAnyOpen = activeIdx !== null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIdx(null);
      }
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIdx(null));

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIdx === i) {
            setActiveIdx(null);
          } else {
            setActiveIdx(i);
          }
        };

        const isOpen = i === activeIdx;

        return (
          <NavItem
            isOpen={isOpen}
            category={category}
            handleOpen={handleOpen}
            isAnyOpen={isAnyOpen}
            key={category.value}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
