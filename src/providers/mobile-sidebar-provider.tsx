"use client";

import { SidebarMobile } from "@/components/sidebar-mobile";
import { useEffect, useState } from "react";

export const MobileSidebarProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SidebarMobile />
    </>
  );
};
