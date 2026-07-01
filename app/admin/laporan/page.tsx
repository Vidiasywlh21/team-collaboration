"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth-context";
import { useRouter } from "next/navigation";
import AdminSidebar from "../../components/AdminSidebar";
import { getAllBookings } from "../../lib/admin-store";
import { Booking } from "../../lib/booking-store";
import { IconDownload, IconCalendar, IconFilter } from "@tabler/icons-react";

export default function Laporan() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterMonth, setFilterMonth] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "dikonfirmasi" | "ditolak">("all");

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/admin/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user?.role === "admin") {
      loadBookings();
    }
  }, [user]);

  const loadBookings = () => {
    const allBookings = getAllBookings();
    setBookings(allBookings);
  };

  const filteredBookings = bookings.filter((b) => {
    const statusMatch = filterStatus === "all" || b.status === filterStatus;
    const monthMatch = !filterMonth || b.tanggal.startsWith(filterMonth);
    return statusMatch && monthMatch;
  });

  const stats = {
    total: filteredBookings.length,
    pending: filteredBookings.filter((b) => b.status === "pending").length,
    dikonfirmasi: filteredBookings.filter((b) => b.status === "dikonfirmasi").length,
    ditolak: filteredBookings.filter((b) => b.status === "ditolak").length,
  };

  const handleExport = () => {
    const csvContent = [
      ["ID Booking", "Nama", "NIM", "Email", "Telepon", "Fakultas", "Ruangan", "Tanggal", "Waktu Mulai", "Waktu Selesai", "Status", "Keperluan"],
      ...filteredBookings.map((b) => [
        b.id,
        b.nama,
        b.nim,
        b.email,
        b.telepon,
        b.fakultas,
        b.ruangan,
        b.tanggal,
        b.waktu_mulai,
        b.waktu_selesai,
        b.status,
        b.keperluan || "-",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `laporan-booking-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Laporan</h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1">Statistik dan laporan booking ruangan</p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <IconDownload size={18} />
              Export CSV
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <IconFilter size={20} className="text-zinc-500 dark:text-zinc-400" />
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Filter Laporan</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  <IconCalendar size={14} className="inline mr-1" />
                  Bulan
                </label>
                <input
                  type="month"
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                >
                  <option value="all">Semua Status</option>
                  <option value="pending">Pending</option>
                  <option value="dikonfirmasi">Disetujui</option>
                  <option value="ditolak">Ditolak</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Total Booking</p>
              <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{stats.total}</h3>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Pending</p>
              <h3 className="text-3xl font-bold text-amber-600 dark:text-amber-400">{stats.pending}</h3>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Disetujui</p>
              <h3 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.dikonfirmasi}</h3>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Ditolak</p>
              <h3 className="text-3xl font-bold text-rose-600 dark:text-rose-400">{stats.ditolak}</h3>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-800">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">ID Booking</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Nama</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Ruangan</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Tanggal</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Waktu</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-zinc-500 dark:text-zinc-400 text-sm">
                        Tidak ada data untuk filter yang dipilih
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-t border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                        <td className="py-4 px-6 text-sm text-zinc-900 dark:text-zinc-100 font-mono">{booking.id}</td>
                        <td className="py-4 px-6 text-sm text-zinc-900 dark:text-zinc-100">{booking.nama}</td>
                        <td className="py-4 px-6 text-sm text-zinc-600 dark:text-zinc-400">{booking.ruangan}</td>
                        <td className="py-4 px-6 text-sm text-zinc-600 dark:text-zinc-400">{booking.tanggal}</td>
                        <td className="py-4 px-6 text-sm text-zinc-600 dark:text-zinc-400">
                          {booking.waktu_mulai} - {booking.waktu_selesai}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              booking.status === "pending"
                                ? "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400"
                                : booking.status === "dikonfirmasi"
                                ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
                                : "bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400"
                            }`}
                          >
                            {booking.status === "pending" ? "Pending" : booking.status === "dikonfirmasi" ? "Disetujui" : "Ditolak"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
