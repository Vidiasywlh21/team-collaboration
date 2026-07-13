"use client";

import Link from "next/link";
import { IconBrandInstagram, IconMail, IconPhone, IconCompass, IconSchool, IconUser, IconMapPin, IconBuilding, IconMap, IconMailFilled } from "@tabler/icons-react";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tata-letak", label: "Tata Letak" },
  { href: "/booking", label: "Booking" },
  { href: "/status", label: "Status" },
  { href: "/bantuan", label: "Bantuan" },
];

const fakultasLinks = [
  { href: "/tata-letak/fikom?lantai=1", label: "FIKOM" },
  { href: "/tata-letak/feb?lantai=1", label: "FEB" },
  { href: "/tata-letak/humaniora-kesehatan?lantai=1", label: "Humaniora & Kesehatan" },
  { href: "/tata-letak/teknik?lantai=1", label: "Teknik" },
];

export default function Footer() {
  return (
    <footer className="relative mt-16">
      {/* Wave Layer 2 - belakang (#6D2932) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none" style={{ transform: "translateY(-99%)" }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block w-full h-20 md:h-28">
          <path fill="#6D2932" d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,120L0,120Z"></path>
        </svg>
      </div>
      {/* Wave Layer 1 - depan (#561C24) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none" style={{ transform: "translateY(-98%)" }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block w-full h-16 md:h-24">
          <path fill="#561C24" d="M0,80L60,74.7C120,69,240,59,360,64C480,69,600,91,720,96C840,101,960,91,1080,80C1200,69,1320,59,1380,53.3L1440,48L1440,120L0,120Z"></path>
        </svg>
      </div>
      {/* Main footer background */}
      <div className="bg-[#561C24] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center select-none mb-1">
              <span className="text-white font-extrabold text-2xl tracking-tight">B</span>
              <svg className="w-8 h-6 mx-0.5" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="infGradFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B4553"/>
                    <stop offset="40%" stopColor="#C46B7A"/>
                    <stop offset="70%" stopColor="#D4AF37"/>
                    <stop offset="100%" stopColor="#E8C84A"/>
                  </linearGradient>
                </defs>
                <circle cx="13" cy="14" r="7" stroke="url(#infGradFooter)" strokeWidth="3.5" fill="none"/>
                <circle cx="27" cy="14" r="7" stroke="url(#infGradFooter)" strokeWidth="3.5" fill="none"/>
              </svg>
              <span className="text-white font-extrabold text-2xl tracking-tight">kNest</span>
              <span className="relative ml-3">
                <span className="text-white font-extrabold text-2xl tracking-tight">UM</span>
                <span className="absolute top-0 right-[-5px] w-2 h-2 rounded-full bg-[#D4AF37]"></span>
              </span>
            </div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent mb-4"></div>
            <p className="text-xs text-[#E8D8C4]/70 leading-relaxed mb-5">
              Sistem peminjaman ruang kampus Universitas Mulia Balikpapan. Booking ruang kelas, laboratorium, dan aula secara online.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E8D8C4]/70 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-all duration-300">
                <IconBrandInstagram size={18} />
              </a>
              <a href="mailto:info@booknest.com"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E8D8C4]/70 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-all duration-300">
                <IconMail size={18} />
              </a>
              <a href="tel:+62542123456"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E8D8C4]/70 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-all duration-300">
                <IconPhone size={18} />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <IconCompass size={18} className="text-[#D4AF37]" />
              <h4 className="font-bold text-sm text-white">Navigasi</h4>
            </div>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-xs text-[#E8D8C4]/70 hover:text-[#D4AF37] transition-colors duration-200 group">
                    <span className="text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors">&gt;</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fakultas */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <IconSchool size={18} className="text-[#D4AF37]" />
              <h4 className="font-bold text-sm text-white">Fakultas</h4>
            </div>
            <ul className="space-y-2.5">
              {fakultasLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-xs text-[#E8D8C4]/70 hover:text-[#D4AF37] transition-colors duration-200 group">
                    <span className="text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors">&gt;</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <IconUser size={18} className="text-[#D4AF37]" />
              <h4 className="font-bold text-sm text-white">Kontak</h4>
            </div>
            <ul className="space-y-3 text-xs text-[#E8D8C4]/70">
              <li className="flex items-start gap-2">
                <IconMapPin size={14} className="text-[#D4AF37]/70 mt-0.5 flex-shrink-0" />
                <span>Universitas Mulia Balikpapan</span>
              </li>
              <li className="flex items-start gap-2">
                <IconBuilding size={14} className="text-[#D4AF37]/70 mt-0.5 flex-shrink-0" />
                <span>Jl. Gn. Empat, Balikpapan</span>
              </li>
              <li className="flex items-start gap-2">
                <IconMap size={14} className="text-[#D4AF37]/70 mt-0.5 flex-shrink-0" />
                <span>Kalimantan Timur, Indonesia</span>
              </li>
              <li className="flex items-start gap-2">
                <IconMailFilled size={14} className="text-[#D4AF37]/70 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@booknest.com" className="hover:text-[#D4AF37] transition-colors">info@booknest.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E8D8C4]/10 border border-[#E8D8C4]/20 flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <p className="text-xs text-[#E8D8C4]/50">
              &copy; {new Date().getFullYear()} BookNest. Hak Cipta Dilindungi Undang-Undang.
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium">
            <Link href="/bantuan" className="px-4 py-2 text-[#E8D8C4]/60 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">Kebijakan Privasi</Link>
            <span className="text-white/20">|</span>
            <Link href="/bantuan" className="px-4 py-2 text-[#E8D8C4]/60 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
