"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth-context";
import { useRouter } from "next/navigation";
import { getAllBookings } from "../../lib/admin-store";
import { Booking } from "../../lib/booking-store";
import { IconDownload, IconCalendar, IconFilter } from "@tabler/icons-react";

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

export default function Laporan() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterMonth, setFilterMonth] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "dikonfirmasi" | "ditolak">("all");

  useScrollReveal();

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
          <div className="flex items-center justify-between mb-8 animate-fade-in-up">
            <div>
              <h1 className="text-3xl font-bold text-[#561C24]">Laporan</h1>
              <p className="text-[#6D2932] mt-1">Statistik dan laporan booking ruangan</p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-[#6D2932] hover:bg-[#561C24] text-[#E8D8C4] px-6 py-3 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
              <IconDownload size={18} />
              Export CSV
            </button>
          </div>

          {/* Filters */}
          <div className="scroll-reveal bg-[#E8D8C4]/80 backdrop-blur-sm rounded-xl border border-[#C7B7A3] p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <IconFilter size={20} className="text-[#6D2932]" />
              <h2 className="text-lg font-semibold text-[#561C24]">Filter Laporan</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#6D2932] mb-2">
                  <IconCalendar size={14} className="inline mr-1" />
                  Bulan
                </label>
                <input
                  type="month"
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6D2932] mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all"
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
            <div className="animate-fade-in-up animate-stagger-1 bg-[#E8D8C4]/80 backdrop-blur-sm rounded-xl border border-[#C7B7A3] p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <p className="text-sm text-[#6D2932] mb-1">Total Booking</p>
              <h3 className="text-3xl font-bold text-[#561C24]">{stats.total}</h3>
            </div>
            <div className="animate-fade-in-up animate-stagger-2 bg-[#E8D8C4]/80 backdrop-blur-sm rounded-xl border border-[#C7B7A3] p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <p className="text-sm text-[#6D2932] mb-1">Pending</p>
              <h3 className="text-3xl font-bold text-[#6D2932]">{stats.pending}</h3>
            </div>
            <div className="animate-fade-in-up animate-stagger-3 bg-[#E8D8C4]/80 backdrop-blur-sm rounded-xl border border-[#C7B7A3] p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <p className="text-sm text-[#6D2932] mb-1">Disetujui</p>
              <h3 className="text-3xl font-bold text-[#6D2932]">{stats.dikonfirmasi}</h3>
            </div>
            <div className="animate-fade-in-up animate-stagger-4 bg-[#E8D8C4]/80 backdrop-blur-sm rounded-xl border border-[#C7B7A3] p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <p className="text-sm text-[#6D2932] mb-1">Ditolak</p>
              <h3 className="text-3xl font-bold text-[#561C24]">{stats.ditolak}</h3>
            </div>
          </div>

          {/* Table */}
          <div className="scroll-reveal bg-[#E8D8C4]/80 backdrop-blur-sm rounded-xl border border-[#C7B7A3] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#C7B7A3]/50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">ID Booking</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">Nama</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">Ruangan</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">Tanggal</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">Waktu</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-[#6D2932] text-sm">
                        Tidak ada data untuk filter yang dipilih
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-t border-[#C7B7A3]/50 hover:bg-[#C7B7A3]/30 transition-colors duration-200">
                        <td className="py-4 px-6 text-sm text-[#561C24] font-mono">{booking.id}</td>
                        <td className="py-4 px-6 text-sm text-[#561C24]">{booking.nama}</td>
                        <td className="py-4 px-6 text-sm text-[#6D2932]">{booking.ruangan}</td>
                        <td className="py-4 px-6 text-sm text-[#6D2932]">{booking.tanggal}</td>
                        <td className="py-4 px-6 text-sm text-[#6D2932]">
                          {booking.waktu_mulai} - {booking.waktu_selesai}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              booking.status === "pending"
                                ? "bg-[#C7B7A3] text-[#561C24]"
                                : booking.status === "dikonfirmasi"
                                ? "bg-[#6D2932]/20 text-[#561C24]"
                                : "bg-[#561C24]/20 text-[#561C24]"
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
