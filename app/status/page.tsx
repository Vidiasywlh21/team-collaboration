"use client";

import Link from "next/link";
import { IconClock, IconArrowLeft, IconCircleCheck, IconClockHour4, IconCancel, IconRefresh } from "@tabler/icons-react";

const bookingHistory = [
  { id: "INV-2023-0012", room: "Ruang Rapat Kreatif A", date: "15 Des 2023", time: "09:00 - 11:00 WIB", status: "confirmed", booker: "Andika Wijaya" },
  { id: "INV-2023-0011", room: "Booth Telepon 3", date: "14 Des 2023", time: "13:00 - 14:00 WIB", status: "completed", booker: "Andika Wijaya" },
  { id: "INV-2023-0010", room: "Meja Tim Tengah - 4", date: "14 Des 2023", time: "Full Day", status: "completed", booker: "Andika Wijaya" },
  { id: "INV-2023-0009", room: "Ruang Rapat Eksekutif B", date: "13 Des 2023", time: "15:00 - 16:30 WIB", status: "rejected", booker: "Andika Wijaya" },
];

const statusStyles: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  confirmed: { bg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900", text: "text-emerald-700 dark:text-emerald-400", icon: IconCircleCheck },
  completed: { bg: "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800", text: "text-zinc-600 dark:text-zinc-400", icon: IconClock },
  pending: { bg: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900", text: "text-amber-700 dark:text-amber-400", icon: IconClockHour4 },
  rejected: { bg: "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900", text: "text-rose-700 dark:text-rose-400", icon: IconCancel },
};

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
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
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Reservasi Aktif & Mendatang</h2>
          <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
            <IconRefresh size={16} />
            Segarkan
          </button>
        </div>
        
        <div className="space-y-4">
          {bookingHistory.filter(b => b.status === "confirmed").map((booking) => {
            const style = statusStyles[booking.status];
            const StatusIcon = style.icon;
            return (
              <div key={booking.id} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div className="flex gap-4 items-start">
                  <div className={`p-2.5 rounded-xl border ${style.bg} ${style.text} flex-shrink-0 mt-1`}>
                    <StatusIcon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-base font-bold">{booking.room}</h3>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                        Dikonfirmasi
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {booking.date} &bull; {booking.time}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                      Kode Booking: {booking.id}
                    </p>
                  </div>
                </div>
                <Link href="/tata-letak" className="text-center sm:text-right text-sm font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 px-4 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all">
                  Lihat di Tata Letak
                </Link>
              </div>
            );
          })}
        </div>

        <h2 className="text-lg font-bold mt-12 mb-6">Riwayat Booking</h2>
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400">
                <tr>
                  <th className="px-6 py-4">Detail Ruangan</th>
                  <th className="px-6 py-4">Tanggal & Waktu</th>
                  <th className="px-6 py-4">Kode</th>
                  <th className="px-6 py-4 text-center">Status Akhir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {bookingHistory.filter(b => b.status !== "confirmed").map((booking) => {
                  const style = statusStyles[booking.status];
                  const StatusIcon = style.icon;
                  return (
                    <tr key={booking.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4 font-medium">{booking.room}</td>
                      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{booking.date} <br/> <span className="text-xs">{booking.time}</span></td>
                      <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{booking.id}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
                          <StatusIcon size={14} />
                          {booking.status === "completed" ? "Selesai" : booking.status === "rejected" ? "Ditolak" : "Menunggu"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
