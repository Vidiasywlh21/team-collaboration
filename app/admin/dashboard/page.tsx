"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth-context";
import { useRouter } from "next/navigation";
import AdminSidebar from "../../components/AdminSidebar";
import { getBookingStats, getAllBookings } from "../../lib/admin-store";
import { IconCalendarStats, IconClockHour4, IconCircleCheck, IconCircleX, IconTrendingUp } from "@tabler/icons-react";

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ total: 0, pending: 0, dikonfirmasi: 0, ditolak: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/admin/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user?.role === "admin") {
      const bookingStats = getBookingStats();
      setStats(bookingStats);

      const allBookings = getAllBookings();
      const recent = allBookings
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);
      setRecentBookings(recent);
    }
  }, [user]);

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Dashboard</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">Selamat datang di panel administrasi SinergiSpace</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                  <IconCalendarStats size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                <IconTrendingUp size={20} className="text-zinc-400" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stats.total}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Total Booking</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/50 rounded-lg">
                  <IconClockHour4 size={24} className="text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stats.pending}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Menunggu Verifikasi</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg">
                  <IconCircleCheck size={24} className="text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stats.dikonfirmasi}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Disetujui</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-rose-50 dark:bg-rose-950/50 rounded-lg">
                  <IconCircleX size={24} className="text-rose-600 dark:text-rose-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stats.ditolak}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Ditolak</p>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Booking Terbaru</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">ID Booking</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Nama</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Ruangan</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Tanggal</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-zinc-500 dark:text-zinc-400 text-sm">
                        Belum ada booking
                      </td>
                    </tr>
                  ) : (
                    recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                        <td className="py-3 px-4 text-sm text-zinc-900 dark:text-zinc-100 font-mono">{booking.id}</td>
                        <td className="py-3 px-4 text-sm text-zinc-900 dark:text-zinc-100">{booking.nama}</td>
                        <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{booking.ruangan}</td>
                        <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">{booking.tanggal}</td>
                        <td className="py-3 px-4">
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
