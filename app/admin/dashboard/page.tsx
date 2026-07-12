"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth-context";
import { useRouter } from "next/navigation";
import { getBookingStats, getAllBookings } from "../../lib/admin-store";
import { IconCalendarStats, IconClockHour4, IconCircleCheck, IconCircleX, IconTrendingUp } from "@tabler/icons-react";

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

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ total: 0, pending: 0, dikonfirmasi: 0, ditolak: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useScrollReveal();

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E8D8C4]"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-[#561C24]">Dashboard</h1>
            <p className="text-[#6D2932] mt-1">Selamat datang di panel administrasi BookNest</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="animate-fade-in-up animate-stagger-1 bg-[#6D2932] rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#E8D8C4]/20 rounded-lg">
                  <IconCalendarStats size={24} className="text-[#E8D8C4]" />
                </div>
                <IconTrendingUp size={20} className="text-[#C7B7A3]" />
              </div>
              <h3 className="text-2xl font-bold text-[#E8D8C4]">{stats.total}</h3>
              <p className="text-sm text-[#C7B7A3] mt-1">Total Booking</p>
            </div>

            <div className="animate-fade-in-up animate-stagger-2 bg-[#6D2932] rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#E8D8C4]/20 rounded-lg">
                  <IconClockHour4 size={24} className="text-[#E8D8C4]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#E8D8C4]">{stats.pending}</h3>
              <p className="text-sm text-[#C7B7A3] mt-1">Menunggu Verifikasi</p>
            </div>

            <div className="animate-fade-in-up animate-stagger-3 bg-[#6D2932] rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#E8D8C4]/20 rounded-lg">
                  <IconCircleCheck size={24} className="text-[#E8D8C4]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#E8D8C4]">{stats.dikonfirmasi}</h3>
              <p className="text-sm text-[#C7B7A3] mt-1">Disetujui</p>
            </div>

            <div className="animate-fade-in-up animate-stagger-4 bg-[#6D2932] rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#E8D8C4]/20 rounded-lg">
                  <IconCircleX size={24} className="text-[#E8D8C4]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#E8D8C4]">{stats.ditolak}</h3>
              <p className="text-sm text-[#C7B7A3] mt-1">Ditolak</p>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="scroll-reveal bg-[#6D2932] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#E8D8C4] mb-4">Booking Terbaru</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E8D8C4]/30">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#E8D8C4]">ID Booking</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#E8D8C4]">Nama</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#E8D8C4]">Ruangan</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#E8D8C4]">Tanggal</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#E8D8C4]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-[#C7B7A3] text-sm">
                        Belum ada booking
                      </td>
                    </tr>
                  ) : (
                    recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-[#E8D8C4]/20 hover:bg-[#E8D8C4]/10 transition-colors duration-200">
                        <td className="py-3 px-4 text-sm text-[#E8D8C4] font-mono">{booking.id}</td>
                        <td className="py-3 px-4 text-sm text-[#E8D8C4]">{booking.nama}</td>
                        <td className="py-3 px-4 text-sm text-[#C7B7A3]">{booking.ruangan}</td>
                        <td className="py-3 px-4 text-sm text-[#C7B7A3]">{booking.tanggal}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              booking.status === "pending"
                                ? "bg-[#C7B7A3] text-[#561C24]"
                                : booking.status === "dikonfirmasi"
                                ? "bg-[#E8D8C4]/20 text-[#E8D8C4]"
                                : "bg-[#E8D8C4]/10 text-[#C7B7A3]"
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
    </div>
  );
}
