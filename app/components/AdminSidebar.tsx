"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconLayoutDashboard, IconClipboardCheck, IconDoor, IconFileText, IconLogout, IconMenu2, IconX } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useAuth } from "../lib/auth-context";
import { useRouter } from "next/navigation";

const menuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: IconLayoutDashboard },
  { href: "/admin/verifikasi", label: "Verifikasi Booking", icon: IconClipboardCheck },
  { href: "/admin/ruangan", label: "Manajemen Ruangan", icon: IconDoor },
  { href: "/admin/laporan", label: "Laporan", icon: IconFileText },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#561C24] text-[#E8D8C4] rounded-lg shadow-lg border border-[#6D2932]"
      >
        {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#561C24] border-r border-[#6D2932] transition-transform duration-300 z-40 flex flex-col`}
      >
        {/* Logo - aligned with Dashboard header */}
        <div className="px-6 pt-8 animate-slide-in-left">
          <div className="group relative flex items-center select-none">
            <span className="text-white font-extrabold text-2xl tracking-tight">B</span>
            <svg className="w-8 h-6 mx-0.5" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="infGradNav" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B4553"/>
                  <stop offset="40%" stopColor="#C46B7A"/>
                  <stop offset="70%" stopColor="#D4AF37"/>
                  <stop offset="100%" stopColor="#E8C84A"/>
                </linearGradient>
              </defs>
              <circle cx="13" cy="14" r="7" stroke="url(#infGradNav)" strokeWidth="3.5" fill="none"/>
              <circle cx="27" cy="14" r="7" stroke="url(#infGradNav)" strokeWidth="3.5" fill="none"/>
            </svg>
            <span className="text-white font-extrabold text-2xl tracking-tight">kNest</span>
            <span className="relative ml-3">
              <span className="text-white font-extrabold text-2xl tracking-tight">UM</span>
              <span className="absolute top-0 right-[-5px] w-2 h-2 rounded-full bg-[#D4AF37]"></span>
            </span>
            <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-[#D4AF37] group-hover:w-full transition-all duration-300 ease-out rounded-full"></span>
          </div>
        </div>

        {/* User Info */}
        <div className="mx-6 mt-6 p-3 bg-[#6D2932] rounded-xl animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E8D8C4] rounded-full flex items-center justify-center text-[#561C24] font-bold transition-transform duration-300 hover:scale-110">
              {user?.nama.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#E8D8C4] truncate">{user?.nama}</p>
              <p className="text-xs text-[#C7B7A3] truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation - aligned with cards */}
        <nav className="flex-1 px-6 mt-8 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 animate-slide-in-left ${
                  isActive
                    ? "bg-[#E8D8C4] text-[#561C24]"
                    : "text-[#C7B7A3] hover:bg-[#6D2932] hover:text-[#E8D8C4] hover:translate-x-1"
                }`}
                style={{ animationDelay: `${0.15 + index * 0.05}s` }}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="px-6 pb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#E8D8C4] hover:bg-[#6D2932] transition-all duration-300 w-full animate-slide-in-left"
            style={{ animationDelay: "0.4s" }}
          >
            <IconLogout size={20} />
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}
