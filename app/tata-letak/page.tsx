"use client";

import Link from "next/link";
import { IconLayoutGrid, IconArrowLeft, IconArmchair, IconCheck } from "@tabler/icons-react";

const seats = [
  { id: 1, status: "booked", user: "Andika W.", area: "Tim Kreatif" },
  { id: 2, status: "available", user: "", area: "Tim Kreatif" },
  { id: 3, status: "available", user: "", area: "Tim Kreatif" },
  { id: 4, status: "booked", user: "Clara S.", area: "Tim Kreatif" },
  { id: 5, status: "available", user: "", area: "Tim Produksi" },
  { id: 6, status: "booked", user: "Budi S.", area: "Tim Produksi" },
  { id: 7, status: "maintenance", user: "", area: "Tim Produksi" },
  { id: 8, status: "available", user: "", area: "Tim Produksi" },
  { id: 9, status: "booked", user: "Rizky P.", area: "Tim Admin" },
  { id: 10, status: "booked", user: "Siti A.", area: "Tim Admin" },
  { id: 11, status: "available", user: "", area: "Tim Admin" },
  { id: 12, status: "available", user: "", area: "Tim Admin" },
];

const MeetingRooms = [
  { id: "ruang_a", name: "Ruang Rapat Kreatif A", capacity: 8, status: "available" },
  { id: "ruang_b", name: "Ruang Rapat Eksekutif B", capacity: 6, status: "booked", bookedBy: "Manajemen" },
  { id: "ruang_c", name: "Booth Telepon Kedap Suara", capacity: 1, status: "available" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "booked": return "bg-indigo-600 dark:bg-indigo-500 shadow-indigo-600/30 dark:shadow-indigo-500/30 border-indigo-700 dark:border-indigo-600";
    case "available": return "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 cursor-pointer";
    case "maintenance": return "bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 opacity-50 cursor-not-allowed";
    default: return "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800";
  }
};

const getTextColor = (status: string) => {
  switch (status) {
    case "booked": return "text-white";
    case "available": return "text-emerald-700 dark:text-emerald-400";
    case "maintenance": return "text-zinc-500 dark:text-zinc-400";
    default: return "text-zinc-900 dark:text-zinc-100";
  }
};

export default function TataLetakPage() {
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
                <IconLayoutGrid size={18} />
              </div>
              <h1 className="text-lg font-bold">Denah Tata Letak Ruangan</h1>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-indigo-600 border border-indigo-700"></div> Terisi</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900"></div> Kosong</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700"></div> Perbaikan</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Workspace Area Grid */}
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Area Kerja Terbuka (Open Workspace)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {seats.map((seat) => (
              <div 
                key={seat.id} 
                className={`relative group flex flex-col items-center justify-center p-6 rounded-2xl border ${getStatusColor(seat.status)} transition-all duration-200 ${seat.status === "available" ? "hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1" : ""}`}
              >
                {seat.status === "available" && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconCheck size={14} className="text-emerald-600" />
                  </div>
                )}
                <IconArmchair size={32} className={`mb-2 ${getTextColor(seat.status)}`} />
                <span className={`text-sm font-bold tracking-tight ${getTextColor(seat.status)}`}>
                  Meja {seat.id}
                </span>
                <span className={`text-[10px] font-medium mt-0.5 ${getTextColor(seat.status)} opacity-70`}>
                  {seat.status === "booked" ? seat.user : seat.area}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Meeting Rooms */}
        <section>
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Ruang Meeting & Fasilitas Khusus
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {MeetingRooms.map((room) => (
              <div key={room.id} className={`p-6 rounded-2xl border ${room.status === "booked" ? "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg transition-all"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-xl ${room.status === "booked" ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400" : "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"}`}>
                    <IconLayoutGrid size={20} />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${room.status === "booked" ? "bg-indigo-600 text-white" : "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400"}`}>
                    {room.status === "booked" ? "Dipakai" : "Tersedia"}
                  </span>
                </div>
                <h3 className="text-base font-bold mb-1">{room.name}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Kapasitas: {room.capacity} orang</p>
                {room.status === "booked" ? (
                  <div className="text-xs bg-white dark:bg-zinc-900 rounded-lg p-3 border border-indigo-200 dark:border-indigo-800 text-zinc-700 dark:text-zinc-300">
                    Dibooking oleh: <strong>{room.bookedBy}</strong>
                  </div>
                ) : (
                  <Link href="/booking" className="block w-full text-center text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl transition-colors shadow-lg shadow-emerald-600/20">
                    Booking Sekarang
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
