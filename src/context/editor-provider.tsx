"use client";

import { EditorComponent } from "@/components/editor-component";
import { useEffect, useState } from "react";

export const EditorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
};
