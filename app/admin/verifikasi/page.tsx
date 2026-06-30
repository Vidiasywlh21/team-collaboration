"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth-context";
import { useRouter } from "next/navigation";
import AdminSidebar from "../../components/AdminSidebar";
import { getAllBookings, updateBookingStatus } from "../../lib/admin-store";
import { Booking } from "../../lib/booking-store";
import { IconCheck, IconX, IconEye, IconClock, IconUser, IconPhone, IconDoor, IconCalendar, IconUsers } from "@tabler/icons-react";

export default function VerifikasiBooking() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "dikonfirmasi" | "ditolak">("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetail, setShowDetail] = useState(false);

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

  const handleStatusUpdate = (bookingId: string, status: "dikonfirmasi" | "ditolak") => {
    const success = updateBookingStatus(bookingId, status);
    if (success) {
      loadBookings();
      setShowDetail(false);
      setSelectedBooking(null);
    }
  };

  const filteredBookings = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

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
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Verifikasi Booking</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">Kelola dan verifikasi booking ruangan</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {[
              { value: "all", label: "Semua" },
              { value: "pending", label: "Pending" },
              { value: "dikonfirmasi", label: "Disetujui" },
              { value: "ditolak", label: "Ditolak" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  filter === tab.value
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-800">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">ID Booking</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Nama Pemesan</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Ruangan</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Tanggal</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Waktu</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-zinc-500 dark:text-zinc-400 text-sm">
                        Tidak ada data booking
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
                            {booking.status === "pending" ? (
                              <><IconClock size={12} className="mr-1" /> Pending</>
                            ) : booking.status === "dikonfirmasi" ? (
                              <><IconCheck size={12} className="mr-1" /> Disetujui</>
                            ) : (
                              <><IconX size={12} className="mr-1" /> Ditolak</>
                            )}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedBooking(booking);
                                setShowDetail(true);
                              }}
                              className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition-all"
                              title="Lihat Detail"
                            >
                              <IconEye size={18} />
                            </button>
                            {booking.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleStatusUpdate(booking.id, "dikonfirmasi")}
                                  className="p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-lg transition-all"
                                  title="Setujui"
                                >
                                  <IconCheck size={18} />
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(booking.id, "ditolak")}
                                  className="p-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all"
                                  title="Tolak"
                                >
                                  <IconX size={18} />
                                </button>
                              </>
                            )}
                          </div>
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

      {/* Detail Modal */}
      {showDetail && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Detail Booking</h2>
                <button
                  onClick={() => {
                    setShowDetail(false);
                    setSelectedBooking(null);
                  }}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all"
                >
                  <IconX size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Booking Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mb-1">
                    <IconUser size={14} /> Nama Pemesan
                  </label>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{selectedBooking.nama}</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mb-1">
                    NIM
                  </label>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{selectedBooking.nim}</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mb-1">
                    <IconPhone size={14} /> Telepon
                  </label>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{selectedBooking.telepon}</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Email</label>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{selectedBooking.email}</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mb-1">
                    <IconDoor size={14} /> Ruangan
                  </label>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{selectedBooking.ruangan}</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mb-1">
                    <IconCalendar size={14} /> Tanggal
                  </label>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{selectedBooking.tanggal}</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Jam Mulai</label>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{selectedBooking.waktu_mulai}</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Jam Selesai</label>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{selectedBooking.waktu_selesai}</p>
                </div>
              </div>

              {/* Keperluan */}
              {selectedBooking.keperluan && (
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 block">Keperluan</label>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
                    {selectedBooking.keperluan}
                  </p>
                </div>
              )}

              {/* Anggota */}
              {selectedBooking.anggota && selectedBooking.anggota.length > 0 && (
                <div>
                  <label className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mb-2">
                    <IconUsers size={14} /> Anggota Kelompok ({selectedBooking.anggota.length})
                  </label>
                  <div className="space-y-2">
                    {selectedBooking.anggota.map((anggota, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
                        <span className="text-sm text-zinc-900 dark:text-zinc-100">{anggota.nama}</span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">{anggota.nim}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status */}
              <div>
                <label className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 block">Status</label>
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                    selectedBooking.status === "pending"
                      ? "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400"
                      : selectedBooking.status === "dikonfirmasi"
                      ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
                      : "bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400"
                  }`}
                >
                  {selectedBooking.status === "pending" ? "Pending" : selectedBooking.status === "dikonfirmasi" ? "Disetujui" : "Ditolak"}
                </span>
              </div>

              {/* Actions */}
              {selectedBooking.status === "pending" && (
                <div className="flex gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <button
                    onClick={() => handleStatusUpdate(selectedBooking.id, "dikonfirmasi")}
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                  >
                    <IconCheck size={18} />
                    Setujui Booking
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedBooking.id, "ditolak")}
                    className="flex-1 flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                  >
                    <IconX size={18} />
                    Tolak Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
