"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconClock, IconArrowLeft, IconCircleCheck, IconCancel, IconRefresh, IconLogin, IconUserPlus, IconMail, IconLock, IconUser } from "@tabler/icons-react";
import { useAuth } from "../lib/auth-context";
import { getBookingsByEmail, Booking } from "../lib/booking-store";

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

const statusStyles: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  pending: { bg: "bg-amber-100 border-amber-300", text: "text-amber-700", icon: IconClock },
  dikonfirmasi: { bg: "bg-emerald-50 light:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900", text: "text-emerald-700 dark:text-emerald-400", icon: IconCircleCheck },
  ditolak: { bg: "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900", text: "text-rose-700 dark:text-rose-400", icon: IconCancel },
};

const ruanganLabels: Record<string, string> = {
  ruang_rapat_a: "Ruang Rapat Kreatif A",
  ruang_rapat_b: "Ruang Rapat Eksekutif B",
  booth_call: "Booth Telepon Kedap Suara",
  meja_kerja_t: "Meja Kerja Tim Tengah",
};

export default function StatusPage() {
  const { user, isLoading, login, register } = useAuth();
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authNama, setAuthNama] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  useScrollReveal();

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!authEmail || !authPassword || (authMode === "register" && !authNama)) {
      setAuthError("Semua field harus diisi");
      return;
    }
    if (authMode === "login") {
      const success = login(authEmail, authPassword);
      if (!success) {
        setAuthError("Email atau password salah");
      }
    } else {
      const success = register(authEmail, authNama, authPassword);
      if (!success) {
        setAuthError("Email sudah terdaftar");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="animate-fade-in min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#561C24]"></div>
        <p className="text-[#561C24] text-sm">Memuat riwayat booking...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className="animate-fade-in min-h-screen flex flex-col items-center justify-center p-4"
      >
        <div className="w-full max-w-md animate-fade-in-scale">
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium text-[#561C24] hover:text-white mb-8 transition-colors">
            <IconArrowLeft size={16} />
            Kembali ke Beranda
          </Link>

          <div className="bg-[#E8D8C4] rounded-2xl border border-[#C7B7A3] shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#561C24] rounded-xl text-[#E8D8C4] animate-scale-in">
                  {authMode === "login" ? <IconLogin size={24} /> : <IconUserPlus size={24} />}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#561C24]">{authMode === "login" ? "Masuk" : "Daftar"}</h1>
                  <p className="text-[#6D2932] text-sm">
                    {authMode === "login" ? "Masuk untuk melihat riwayat booking" : "Buat akun untuk melihat riwayat booking"}
                  </p>
                </div>
              </div>

              {authError && (
                <div className="mb-4 p-3 bg-rose-100 border border-rose-300 rounded-xl text-sm text-rose-700 animate-shake">
                  {authError}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === "register" && (
                  <div className="animate-fade-in-up animate-stagger-1">
                    <label className="block text-sm font-semibold text-[#561C24] mb-2">
                      <span className="flex items-center gap-1.5">
                        <IconUser size={14} />
                        Nama Lengkap
                      </span>
                    </label>
                    <input
                      type="text"
                      value={authNama}
                      onChange={(e) => setAuthNama(e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] placeholder-[#6D2932]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all duration-200 hover:border-[#6D2932]"
                    />
                  </div>
                )}

                <div className="animate-fade-in-up animate-stagger-2">
                  <label className="block text-sm font-semibold text-[#561C24] mb-2">
                    <span className="flex items-center gap-1.5">
                      <IconMail size={14} />
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] placeholder-[#6D2932]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all duration-200 hover:border-[#6D2932]"
                  />
                </div>

                <div className="animate-fade-in-up animate-stagger-3">
                  <label className="block text-sm font-semibold text-[#561C24] mb-2">
                    <span className="flex items-center gap-1.5">
                      <IconLock size={14} />
                      Password
                    </span>
                  </label>
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] placeholder-[#6D2932]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all duration-200 hover:border-[#6D2932]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full animate-fade-in-up animate-stagger-4 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#6D2932] hover:bg-[#561C24] text-white rounded-xl text-sm font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  {authMode === "login" ? (
                    <>
                      <IconLogin size={16} />
                      Masuk
                    </>
                  ) : (
                    <>
                      <IconUserPlus size={16} />
                      Daftar
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center animate-fade-in-up animate-stagger-5">
                <button
                  onClick={() => {
                    setAuthMode(authMode === "login" ? "register" : "login");
                    setAuthError("");
                  }}
                  className="text-sm text-[#561C24] hover:underline font-medium"
                >
                  {authMode === "login" ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const bookingHistory = getBookingsByEmail(user.email);

  return (
    <div
      className="animate-fade-in font-sans text-zinc-900 relative"
    >
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookingHistory.length === 0 ? (
          <div className="animate-fade-in-up text-center py-16">
            <div className="w-16 h-16 bg-[#561c24] rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
              <IconClock size={32} className="text-[#e8c8d4]" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-[#561c24]">Belum Ada Booking</h2>
            <p className="text-[#561c24] mb-6">Anda belum memiliki riwayat pemesanan ruangan.</p>
            <Link href="/booking" className="inline-flex items-center gap-2 bg-[#6D2932] hover:bg-[#561C24] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
              Buat Booking Sekarang
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="animate-fade-in-up animate-stagger-1 text-lg font-semibold text-[#561C24]">Riwayat Booking Anda</h2>
              <Link href="/booking" className="animate-fade-in-up animate-stagger-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#561C24] hover:text-white transition-all duration-200 hover:translate-x-1">
                <IconRefresh size={16} />
                Booking Baru
              </Link>
            </div>

            <div className="space-y-4">
              {bookingHistory.map((booking, index) => {
                const style = statusStyles[booking.status];
                const StatusIcon = style.icon;
                return (
                  <div key={booking.id} className="animate-fade-in-up bg-[#E8D8C4] rounded-2xl shadow-md p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-1" style={{ animationDelay: `${index * 0.15}s` }}>
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                      <div className="flex gap-4 items-start">
                        <div className={`p-2.5 rounded-xl border ${style.bg} ${style.text} flex-shrink-0 mt-1 transition-transform duration-200 hover:rotate-12`}>
                          <StatusIcon size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="text-base font-bold text-[#561C24]">{ruanganLabels[booking.ruangan] || booking.ruangan}</h3>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${style.bg} ${style.text} transition-all duration-200 hover:scale-105 ${booking.status === "pending" ? "animate-badge-pulse" : ""}`}>
                              {booking.status === "dikonfirmasi" ? "Dikonfirmasi" : booking.status === "pending" ? "Menunggu" : "Ditolak"}
                            </span>
                          </div>
                          <p className="text-sm text-[#6D2932]">
                            {booking.tanggal} &bull; {booking.waktu_mulai} - {booking.waktu_selesai}
                          </p>
                          <p className="text-xs text-[#6D2932]/70 mt-1">
                            Kode Booking: {booking.id}
                          </p>
                          {booking.keperluan && (
                            <p className="text-xs text-[#6D2932]/80 mt-1 italic">
                              &quot;{booking.keperluan}&quot;
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
