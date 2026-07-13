"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  IconLayout,
  IconCalendarPlus,
  IconClock,
  IconHelpCircle,
  IconArrowRight,
  IconMapPin,
  IconUsers,
  IconCircleCheck,
  IconX
} from "@tabler/icons-react";
import { getBookings, Booking } from "./lib/booking-store";

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          } else {
            entry.target.classList.remove("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const totalRooms = 38;

export default function Home() {
  useScrollReveal();
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [bookedRooms, setBookedRooms] = useState<Booking[]>([]);
  const [bookedCount, setBookedCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setIsMounted(true);
    const bookings = getBookings().filter(b => b.status === "dikonfirmasi");
    setBookedCount(bookings.length);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <section className="mb-10 p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-lg">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/um_beranda2.png')" }}
        ></div>
        <div className="absolute inset-0 bg-[#561C24]/30"></div>
        <div className="relative max-w-2xl">
          <span className="animate-fade-in-up animate-stagger-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8D8C4] text-[#561C24] mb-6">
            <span className="w-1.5 h-1.5 bg-[#6D2932] rounded-full animate-ping"></span>
            Sistem Aktif & Terpadu
          </span>
          <h1 className="animate-fade-in-up animate-stagger-2 text-3xl md:text-4xl tracking-tight mb-4 leading-tight text-white" style={{ fontFamily: "var(--font-heading), Georgia, serif", fontWeight: 900 }}>
            Booking Ruangan Mudah untuk <br />
            Seluruh Civitas Universitas Mulia Balikpapan
          </h1>
          <p className="animate-fade-in-up animate-stagger-3 text-[#E8D8C4] text-sm md:text-base mb-8 leading-relaxed drop-shadow-md">
            BookNest adalah platform booking ruangan yang diperuntukkan bagi mahasiswa dan seluruh warga Universitas Mulia Balikpapan. Anda dapat dengan mudah membuat atau melakukan booking ruangan untuk belajar mandiri, belajar kelompok, maupun diskusi UKM — tersedia untuk semua ruangan di setiap fakultas.
          </p>
          <div className="animate-fade-in-up animate-stagger-4 flex flex-wrap gap-3">
            <Link href="/booking" className="inline-flex items-center gap-2 bg-[#E8D8C4] hover:bg-[#C7B7A3] text-[#561C24] font-semibold text-sm px-5 py-3 rounded-xl transition-all shadow-lg">
              Pilih Ruangan Sekarang
              <IconArrowRight size={16} />
            </Link>
            <Link href="/tata-letak" className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all border border-white/30">
              Lihat Denah Tata Letak
            </Link>
          </div>
        </div>
      </section>

      {/* Live Statistics Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
        <button
          onClick={() => {
            const bookings = getBookings().filter(b => b.status === "dikonfirmasi");
            setBookedRooms(bookings);
            setBookedCount(bookings.length);
            setShowBookingPopup(true);
          }}
          className="scroll-reveal bg-[#E8D8C4] p-5 rounded-2xl border border-[#C7B7A3] shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-left w-full"
          style={{ transitionDelay: "0s" }}
        >
          <div className="w-12 h-12 rounded-xl bg-[#561C24] flex items-center justify-center text-[#E8D8C4]">
            <IconMapPin size={24} />
          </div>
          <div>
            <span className="text-xs text-[#6D2932] block mb-0.5">Ruangan Terbooking</span>
            <span className="text-xl font-bold tracking-tight text-[#561C24]">{isMounted ? bookedCount : 0} <span className="text-xs text-[#6D2932]/60 font-normal">/ {totalRooms} ruangan</span></span>
          </div>
        </button>

        <div className="scroll-reveal bg-[#E8D8C4] p-5 rounded-2xl border border-[#C7B7A3] shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" style={{ transitionDelay: "0.1s" }}>
          <div className="w-12 h-12 rounded-xl bg-[#6D2932] flex items-center justify-center text-[#E8D8C4]">
            <IconUsers size={24} />
          </div>
          <div>
            <span className="text-xs text-[#6D2932] block mb-0.5">Kapasitas Hari Ini</span>
            <span className="text-xl font-bold tracking-tight text-[#561C24]">75% <span className="text-xs text-[#6D2932] font-semibold">(Terisi)</span></span>
          </div>
        </div>

        <div className="scroll-reveal bg-[#E8D8C4] p-5 rounded-2xl border border-[#C7B7A3] shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" style={{ transitionDelay: "0.2s" }}>
          <div className="w-12 h-12 rounded-xl bg-[#561C24] flex items-center justify-center text-[#E8D8C4]">
            <IconClock size={24} />
          </div>
          <div>
            <span className="text-xs text-[#6D2932] block mb-0.5">Booking Aktif</span>
            <span className="text-xl font-bold tracking-tight text-[#561C24]">5 <span className="text-xs text-[#6D2932]/60 font-normal">reservasi</span></span>
          </div>
        </div>

        <div className="scroll-reveal bg-[#E8D8C4] p-5 rounded-2xl border border-[#C7B7A3] shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" style={{ transitionDelay: "0.3s" }}>
          <div className="w-12 h-12 rounded-xl bg-[#6D2932] flex items-center justify-center text-[#E8D8C4]">
            <IconCircleCheck size={24} />
          </div>
          <div>
            <span className="text-xs text-[#6D2932] block mb-0.5">Status Server</span>
            <span className="text-xl font-bold tracking-tight text-[#561C24]">Normal</span>
          </div>
        </div>
      </section>

      {/* Booking Popup */}
      {showBookingPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowBookingPopup(false)}>
          <div className="bg-[#E8D8C4] rounded-2xl max-w-md w-full max-h-[70vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-[#C7B7A3]">
              <h3 className="font-bold text-[#561C24]">Ruangan Terbooking</h3>
              <button onClick={() => setShowBookingPopup(false)} className="p-1 hover:bg-[#C7B7A3] rounded-lg transition-colors">
                <IconX size={18} className="text-[#561C24]" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto max-h-[50vh]">
              {bookedRooms.length === 0 ? (
                <p className="text-sm text-[#6D2932]/60 text-center py-4">Tidak ada ruangan terbooking</p>
              ) : (
                <div className="space-y-3">
                  {bookedRooms.map((b) => (
                    <div key={b.id} className="bg-white rounded-xl p-3 border border-[#C7B7A3]">
                      <p className="font-semibold text-[#561C24] text-sm">{b.ruangan}</p>
                      <p className="text-xs text-[#6D2932]">{b.tanggal} • {b.waktu_mulai} - {b.waktu_selesai}</p>
                      <p className="text-xs text-[#6D2932]/60">{b.nama}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Core Menu Grid */}
      <section className="mb-12">
        <div className="scroll-reveal mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Menu Utama Sistem
          </h2>
          <p className="text-[#E8D8C4] text-sm md:text-base mt-2 drop-shadow-md">
            Akses cepat ke seluruh modul operasional BookNest
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="scroll-reveal group bg-[#E8D8C4] rounded-2xl p-6 border border-[#C7B7A3] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" style={{ transitionDelay: "0s" }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#561C24] text-[#E8D8C4] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <IconLayout size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#561C24] mb-1">Tata Letak Ruangan</h3>
                <p className="text-[#6D2932] text-sm leading-relaxed">Lihat denah interaktif ruang kerja, ketersediaan meja, dan koordinat area tim secara real-time.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#C7B7A3]">
              <Link href="/tata-letak" className="inline-flex items-center gap-2 text-[#561C24] font-semibold text-sm hover:gap-3 transition-all">
                Buka Denah Tata Letak <IconArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="scroll-reveal group bg-[#561c24] rounded-2xl p-6 border border-[#561c24] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" style={{ transitionDelay: "0.1s" }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#E8D8C4] text-[#561C24] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <IconCalendarPlus size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">Reservasi / Booking</h3>
                <p className="text-[#E8D8C4] text-sm leading-relaxed">Buat reservasi meja harian, ruang meeting eksekutif, atau bilik telepon kedap suara dengan mudah.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#C7B7A3]">
              <Link href="/booking" className="inline-flex items-center gap-2 text-[#E8D8C4] font-semibold text-sm hover:gap-3 transition-all">
                Mulai Pesan Ruangan <IconArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="scroll-reveal group bg-[#561c24] rounded-2xl p-6 border border-[#4a1520] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" style={{ transitionDelay: "0.2s" }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#E8D8C4] text-[#561C24] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <IconClock size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">Status & Riwayat</h3>
                <p className="text-[#E8D8C4]/80 text-sm leading-relaxed">Pantau persetujuan admin untuk reservasi yang Anda ajukan dan cek riwayat booking.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#C7B7A3]">
              <Link href="/status" className="inline-flex items-center gap-2 text-[#E8D8C4] font-semibold text-sm hover:gap-3 transition-all">
                Cek Status Booking <IconArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="scroll-reveal group bg-[#E8D8C4] rounded-2xl p-6 border border-[#C7B7A3] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" style={{ transitionDelay: "0.3s" }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#561C24] text-[#E8D8C4] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <IconHelpCircle size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#561C24] mb-1">Pusat Bantuan & FAQ</h3>
                <p className="text-[#6D2932] text-sm leading-relaxed">Temukan panduan penggunaan ruang kerja atau kirimkan tiket aduan ke tim operasional kami.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#C7B7A3]">
              <Link href="/bantuan" className="inline-flex items-center gap-2 text-[#561C24] font-semibold text-sm hover:gap-3 transition-all">
                Butuh Bantuan Teknis <IconArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="scroll-reveal bg-[#E8D8C4] rounded-3xl p-6 md:p-8 border border-[#C7B7A3] shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#561C24]">Informasi & Aktivitas Terkini</h2>
            <p className="text-[#6D2932] text-xs">Pembaruan harian seputar operasional BookNest</p>
          </div>
          <span className="text-xs bg-[#561C24] text-[#E8D8C4] font-semibold px-3 py-1 rounded-full self-start sm:self-center">
            Pembaruan Terakhir: Hari Ini, 09:15
          </span>
        </div>
        <div className="space-y-4">
          <div className="scroll-reveal flex gap-4 p-3 rounded-xl hover:bg-white/50 transition-colors" style={{ transitionDelay: "0s" }}>
            <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[#561C24]"></span>
            <div>
              <p className="text-xs text-[#6D2932]/70 mb-0.5">09:00 WIB · Booking Baru</p>
              <p className="text-sm font-medium text-[#561C24]">Budi Santoso telah memesan <strong className="text-[#6D2932]">Ruang Rapat Kreatif A</strong> untuk jam 13:00 - 15:00 WIB.</p>
            </div>
          </div>
          <div className="h-[1px] w-full bg-[#C7B7A3]"></div>
          <div className="scroll-reveal flex gap-4 p-3 rounded-xl hover:bg-white/50 transition-colors" style={{ transitionDelay: "0.1s" }}>
            <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[#6D2932]"></span>
            <div>
              <p className="text-xs text-[#6D2932]/70 mb-0.5">08:30 WIB · Pengumuman</p>
              <p className="text-sm font-medium text-[#561C24]">Perawatan berkala jaringan Wi-Fi Area Timur selesai lebih cepat. Seluruh jaringan kembali beroperasi normal.</p>
            </div>
          </div>
          <div className="h-[1px] w-full bg-[#C7B7A3]"></div>
          <div className="scroll-reveal flex gap-4 p-3 rounded-xl hover:bg-white/50 transition-colors" style={{ transitionDelay: "0.2s" }}>
            <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[#561c24]"></span>
            <div>
              <p className="text-xs text-[#6D2932]/70 mb-0.5">Kemarin, 16:45 WIB · Status Booking</p>
              <p className="text-sm font-medium text-[#561C24]">Reservasi Meja 12 oleh Clara Sitorus telah dikonfirmasi oleh Admin.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
