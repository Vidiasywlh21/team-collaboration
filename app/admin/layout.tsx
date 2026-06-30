"use client";

import { useEffect } from "react";
import { initializeAdmin } from "../lib/admin-store";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize admin account on first load
    initializeAdmin();
  }, []);

  return <>{children}</>;
}
