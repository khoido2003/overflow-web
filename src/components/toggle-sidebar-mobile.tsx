"use client";

import { useMobileSidebar } from "@/stores/use-mobile-sidebar";
import { Menu } from "lucide-react";

export const ToggleSidebarMobile = () => {
  const { isOpen, onClose, onOpen } = useMobileSidebar();

  return (
    <div onClick={() => onOpen()} className="block cursor-pointer sm:hidden">
      <Menu className="h-7 w-7" />
    </div>
  );
};
