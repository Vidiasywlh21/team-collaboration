"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconClock, IconArrowLeft, IconCircleCheck, IconClockHour4, IconCancel, IconRefresh, IconLogin } from "@tabler/icons-react";
import { useAuth } from "../lib/auth-context";
import { getBookingsByEmail, Booking } from "../lib/booking-store";

const statusStyles: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  dikonfirmasi: { bg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900", text: "text-emerald-700 dark:text-emerald-400", icon: IconCircleCheck },
  ditolak: { bg: "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900", text: "text-rose-700 dark:text-rose-400", icon: IconCancel },
};

const ruanganLabels: Record<string, string> = {
  ruang_rapat_a: "Ruang Rapat Kreatif A",
  ruang_rapat_b: "Ruang Rapat Eksekutif B",
  booth_call: "Booth Telepon Kedap Suara",
  meja_kerja_t: "Meja Kerja Tim Tengah",
};

export default function StatusPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const bookingHistory = getBookingsByEmail(user.email);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-600 dark:text-zinc-300">
              <IconArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <IconClock size={18} />
              </div>
              <h1 className="text-lg font-bold">Status & Riwayat Booking</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">
              {user.nama.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium">{user.nama}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookingHistory.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconClock size={32} className="text-zinc-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">Belum Ada Booking</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6">Anda belum memiliki riwayat pemesanan ruangan.</p>
            <Link href="/booking" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all">
              Buat Booking Sekarang
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Riwayat Booking Anda</h2>
              <Link href="/booking" className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                <IconRefresh size={16} />
                Booking Baru
              </Link>
            </div>
            
            <div className="space-y-4">
              {bookingHistory.map((booking) => {
                const style = statusStyles[booking.status];
                const StatusIcon = style.icon;
                return (
                  <div key={booking.id} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-5">
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                      <div className="flex gap-4 items-start">
                        <div className={`p-2.5 rounded-xl border ${style.bg} ${style.text} flex-shrink-0 mt-1`}>
                          <StatusIcon size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="text-base font-bold">{ruanganLabels[booking.ruangan] || booking.ruangan}</h3>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                              {booking.status === "dikonfirmasi" ? "Dikonfirmasi" : "Ditolak"}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {booking.tanggal} &bull; {booking.waktu_mulai} - {booking.waktu_selesai}
                          </p>
                          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                            Kode Booking: {booking.id}
                          </p>
                          {booking.keperluan && (
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 italic">
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
