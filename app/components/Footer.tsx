"use client";

import Link from "next/link";
import { IconBrandInstagram, IconMail, IconPhone } from "@tabler/icons-react";
import { useEffect } from "react";

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
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".footer-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-[#561C24] border-t border-[#4a1520] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="footer-reveal md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#E8D8C4] flex items-center justify-center text-[#561C24] font-bold text-sm">
                SS
              </div>
              <span className="font-bold text-lg text-white">SinergiSpace</span>
            </div>
            <p className="text-xs text-[#E8D8C4]/60 leading-relaxed mb-4">
              Sistem peminjaman ruang kampus Universitas Mulia Balikpapan. Booking ruang kelas, laboratorium, dan aula secara online.
            </p>
            <div className="flex gap-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#E8D8C4]/70 hover:bg-white/20 hover:text-white transition-all duration-200">
                <IconBrandInstagram size={16} />
              </a>
              <a href="mailto:info@sinergispace.com"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#E8D8C4]/70 hover:bg-white/20 hover:text-white transition-all duration-200">
                <IconMail size={16} />
              </a>
              <a href="tel:+62542123456"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#E8D8C4]/70 hover:bg-white/20 hover:text-white transition-all duration-200">
                <IconPhone size={16} />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div className="footer-reveal">
            <h4 className="font-bold text-sm text-white mb-3">Navigasi</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-[#E8D8C4]/60 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fakultas */}
          <div className="footer-reveal">
            <h4 className="font-bold text-sm text-white mb-3">Fakultas</h4>
            <ul className="space-y-2">
              {fakultasLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-[#E8D8C4]/60 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div className="footer-reveal">
            <h4 className="font-bold text-sm text-white mb-3">Kontak</h4>
            <ul className="space-y-2 text-xs text-[#E8D8C4]/60">
              <li>Universitas Mulia Balikpapan</li>
              <li>Jl. Gn. Empat, Balikpapan</li>
              <li>Kalimantan Timur, Indonesia</li>
              <li className="pt-1">
                <a href="mailto:info@sinergispace.com" className="hover:text-white transition-colors">info@sinergispace.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-[#E8D8C4]/40">
            &copy; {new Date().getFullYear()} SinergiSpace. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex gap-4 text-[10px] font-medium text-[#E8D8C4]/50">
            <Link href="/bantuan" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="/bantuan" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
