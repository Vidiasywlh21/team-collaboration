"use client";

import Link from "next/link";
import { IconArrowLeft, IconBell } from "@tabler/icons-react";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/tata-letak", label: "Tata Letak" },
  { href: "/booking", label: "Booking" },
  { href: "/status", label: "Status" },
  { href: "/bantuan", label: "Bantuan" },
];

export default function Navbar({ activePage }: { activePage: string }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#5a1f25]" style={{ background: "#561C24" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {activePage !== "/" && (
            <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors text-[#E8D8C4]">
              <IconArrowLeft size={20} />
            </Link>
          )}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#E8D8C4] flex items-center justify-center text-[#561C24] font-bold text-xl shadow-lg shadow-black/20">
              S
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-[#E8D8C4]">
                SinergiSpace
              </span>
              <span className="block text-[10px] text-[#E8D8C4]/60 font-medium tracking-wider uppercase -mt-1">
                Collaboration Hub
              </span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                activePage === item.href
                  ? "text-[#561C24] bg-[#E8D8C4] font-semibold"
                  : "text-[#E8D8C4]/80 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 text-[#E8D8C4] hover:bg-white/10 rounded-full transition-colors" aria-label="Notifikasi">
            <IconBell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#561C24]"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
