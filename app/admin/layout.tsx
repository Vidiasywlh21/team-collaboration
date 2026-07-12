"use client";

import { useEffect } from "react";
import { useAuth } from "../lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "../components/AdminSidebar";
import { initializeAdmin } from "../lib/admin-store";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Login page doesn't need auth guard or sidebar
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    initializeAdmin();
  }, []);

  useEffect(() => {
    // Skip redirect for login page
    if (isLoginPage) return;

    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/admin/login");
    }
  }, [user, isLoading, router, isLoginPage]);

  // Login page renders without layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6D2932]"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div
      className="flex min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #E8D8C4 0%, #C7B7A3 100%)",
      }}
    >
      <AdminSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
