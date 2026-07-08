"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu, IconX, IconLogin, IconLogout, IconUser } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useAuth } from "../app/lib/auth-context";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tata-letak", label: "Tata Letak" },
  { href: "/booking", label: "Booking" },
  { href: "/status", label: "Status" },
  { href: "/bantuan", label: "Bantuan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
      scrolled
        ? "bg-[#561C24]/95 backdrop-blur-md border-[#4a1520] shadow-lg"
        : "bg-[#561C24] border-[#4a1520]/50"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#E8D8C4] flex items-center justify-center text-[#561C24] font-bold text-xl shadow-lg">
            SS
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white">
              SinergiSpace
            </span>
            <span className="block text-[10px] text-[#E8D8C4]/60 font-medium tracking-wider uppercase -mt-1">
              Collaboration Hub
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-1.5 rounded-full transition-all ${
                pathname === link.href
                  ? "bg-[#E8D8C4] text-[#561C24] font-semibold"
                  : "text-[#E8D8C4]/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#E8D8C4]/20 rounded-full hover:bg-[#E8D8C4]/30 transition-all duration-200">
                <div className="w-6 h-6 bg-[#E8D8C4] rounded-full flex items-center justify-center text-[#561C24] font-bold text-xs animate-soft-pulse">
                  {user.nama.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-[#E8D8C4]">{user.nama}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 text-[#E8D8C4]/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-150 hover:scale-110 active:scale-95"
                title="Keluar"
              >
                <IconLogout size={18} />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#E8D8C4] hover:bg-[#C7B7A3] text-[#561C24] rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              <IconLogin size={16} />
              Masuk
            </Link>
          )}
          <button
            className="relative p-2 text-[#E8D8C4]/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <IconX size={20} /> : <IconMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu with CSS transition (no instant removal) */}
      <div className={`md:hidden border-t border-[#4a1520] bg-[#561C24]/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out ${
        mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-t-0"
      }`}>
        <div className="px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "bg-[#E8D8C4] text-[#561C24] font-semibold"
                  : "text-[#E8D8C4]/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="pt-2 mt-2 border-t border-[#4a1520]">
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="w-8 h-8 bg-[#E8D8C4] rounded-full flex items-center justify-center text-[#561C24] font-bold text-sm animate-soft-pulse">
                  {user.nama.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{user.nama}</p>
                  <p className="text-xs text-[#E8D8C4]/60">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#E8D8C4] hover:bg-white/10 rounded-full transition-all duration-200"
              >
                <IconLogout size={16} />
                Keluar
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block mt-2 px-3 py-2 bg-[#E8D8C4] hover:bg-[#C7B7A3] text-[#561C24] rounded-full text-sm font-semibold text-center transition-all duration-200 hover:shadow-lg"
            >
              <span className="flex items-center justify-center gap-1.5">
                <IconLogin size={16} />
                Masuk
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
