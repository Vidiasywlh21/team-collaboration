"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth-context";
import { useRouter } from "next/navigation";
import { getAllBookings, updateBookingStatus } from "../../lib/admin-store";
import { Booking } from "../../lib/booking-store";
import { IconCheck, IconX, IconEye, IconClock, IconUser, IconPhone, IconDoor, IconCalendar, IconUsers, IconFile } from "@tabler/icons-react";

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

export default function VerifikasiBooking() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "dikonfirmasi" | "ditolak">("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetail, setShowDetail] = useState(false);

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
            <h1 className="text-3xl font-bold text-[#561C24]">Verifikasi Booking</h1>
            <p className="text-[#6D2932] mt-1">Kelola dan verifikasi booking ruangan</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto animate-fade-in-up animate-stagger-1">
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
                    ? "bg-[#561C24] text-[#E8D8C4]"
                    : "bg-[#E8D8C4]/80 text-[#6D2932] border border-[#C7B7A3] hover:bg-[#C7B7A3]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="scroll-reveal bg-[#E8D8C4]/80 backdrop-blur-sm rounded-xl border border-[#C7B7A3] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#C7B7A3]/50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">ID Booking</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">Nama Pemesan</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">Ruangan</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">Tanggal</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">Waktu</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-[#6D2932] text-sm">
                        Tidak ada data booking
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
                              className="p-2 text-[#6D2932] hover:bg-[#C7B7A3] rounded-lg transition-all"
                              title="Lihat Detail"
                            >
                              <IconEye size={18} />
                            </button>
                            {booking.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleStatusUpdate(booking.id, "dikonfirmasi")}
                                  className="p-2 text-[#6D2932] hover:bg-[#C7B7A3] rounded-lg transition-all"
                                  title="Setujui"
                                >
                                  <IconCheck size={18} />
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(booking.id, "ditolak")}
                                  className="p-2 text-[#561C24] hover:bg-[#561C24]/20 rounded-lg transition-all"
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

      {/* Detail Modal */}
      {showDetail && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-modal-fade">
          <div className="bg-[#E8D8C4] rounded-2xl border border-[#C7B7A3] max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-scale">
            <div className="p-6 border-b border-[#C7B7A3]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#561C24]">Detail Booking</h2>
                <button
                  onClick={() => {
                    setShowDetail(false);
                    setSelectedBooking(null);
                  }}
                  className="p-2 hover:bg-[#C7B7A3] rounded-lg transition-all"
                >
                  <IconX size={20} className="text-[#6D2932]" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Booking Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#6D2932] flex items-center gap-1 mb-1">
                    <IconUser size={14} /> Nama Pemesan
                  </label>
                  <p className="text-sm font-medium text-[#561C24]">{selectedBooking.nama}</p>
                </div>
                <div>
                  <label className="text-xs text-[#6D2932] flex items-center gap-1 mb-1">
                    NIM
                  </label>
                  <p className="text-sm font-medium text-[#561C24]">{selectedBooking.nim}</p>
                </div>
                <div>
                  <label className="text-xs text-[#6D2932] flex items-center gap-1 mb-1">
                    <IconPhone size={14} /> Telepon
                  </label>
                  <p className="text-sm font-medium text-[#561C24]">{selectedBooking.telepon}</p>
                </div>
                <div>
                  <label className="text-xs text-[#6D2932] mb-1">Email</label>
                  <p className="text-sm font-medium text-[#561C24]">{selectedBooking.email}</p>
                </div>
                <div>
                  <label className="text-xs text-[#6D2932] flex items-center gap-1 mb-1">
                    <IconDoor size={14} /> Ruangan
                  </label>
                  <p className="text-sm font-medium text-[#561C24]">{selectedBooking.ruangan}</p>
                </div>
                <div>
                  <label className="text-xs text-[#6D2932] flex items-center gap-1 mb-1">
                    <IconCalendar size={14} /> Tanggal
                  </label>
                  <p className="text-sm font-medium text-[#561C24]">{selectedBooking.tanggal}</p>
                </div>
                <div>
                  <label className="text-xs text-[#6D2932] mb-1">Jam Mulai</label>
                  <p className="text-sm font-medium text-[#561C24]">{selectedBooking.waktu_mulai}</p>
                </div>
                <div>
                  <label className="text-xs text-[#6D2932] mb-1">Jam Selesai</label>
                  <p className="text-sm font-medium text-[#561C24]">{selectedBooking.waktu_selesai}</p>
                </div>
              </div>

              {/* Keperluan */}
              {selectedBooking.keperluan && (
                <div>
                  <label className="text-xs text-[#6D2932] mb-1 block">Keperluan</label>
                  <p className="text-sm text-[#561C24] bg-[#C7B7A3]/50 p-3 rounded-lg">
                    {selectedBooking.keperluan}
                  </p>
                </div>
              )}

              {/* Anggota */}
              {selectedBooking.anggota && selectedBooking.anggota.length > 0 && (
                <div>
                  <label className="text-xs text-[#6D2932] flex items-center gap-1 mb-2">
                    <IconUsers size={14} /> Anggota Kelompok ({selectedBooking.anggota.length})
                  </label>
                  <div className="space-y-2">
                    {selectedBooking.anggota.map((anggota, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-[#C7B7A3]/50 p-3 rounded-lg">
                        <span className="text-sm text-[#561C24]">{anggota.nama}</span>
                        <span className="text-xs text-[#6D2932] font-mono">{anggota.nim}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Surat Resmi Pembina */}
              {selectedBooking.surat_pembina && (
                <div>
                  <label className="text-xs text-[#6D2932] mb-1 block">Surat Resmi dari Pembina</label>
                  <a href={selectedBooking.surat_pembina} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#6D2932] hover:bg-[#561C24] text-[#E8D8C4] rounded-lg text-xs font-medium transition-all">
                    <IconFile size={14} /> Lihat Surat
                  </a>
                </div>
              )}

              {/* UKM-specific fields */}
              {selectedBooking.nama_acara && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#6D2932] mb-1 block">Nama Acara</label>
                    <p className="text-sm font-medium text-[#561C24]">{selectedBooking.nama_acara}</p>
                  </div>
                  <div>
                    <label className="text-xs text-[#6D2932] mb-1 block">Ketua / Penanggung Jawab</label>
                    <p className="text-sm font-medium text-[#561C24]">{selectedBooking.nama_ketua}</p>
                  </div>
                </div>
              )}
              {selectedBooking.estimasi_peserta && (
                <div>
                  <label className="text-xs text-[#6D2932] mb-1 block">Estimasi Jumlah Peserta</label>
                  <p className="text-sm font-medium text-[#561C24]">{selectedBooking.estimasi_peserta} orang</p>
                </div>
              )}

              {/* Status */}
              <div>
                <label className="text-xs text-[#6D2932] mb-1 block">Status</label>
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                    selectedBooking.status === "pending"
                      ? "bg-[#C7B7A3] text-[#561C24]"
                      : selectedBooking.status === "dikonfirmasi"
                      ? "bg-[#6D2932]/20 text-[#561C24]"
                      : "bg-[#561C24]/20 text-[#561C24]"
                  }`}
                >
                  {selectedBooking.status === "pending" ? "Pending" : selectedBooking.status === "dikonfirmasi" ? "Disetujui" : "Ditolak"}
                </span>
              </div>

              {/* Actions */}
              {selectedBooking.status === "pending" && (
                <div className="flex gap-3 pt-4 border-t border-[#C7B7A3]">
                  <button
                    onClick={() => handleStatusUpdate(selectedBooking.id, "dikonfirmasi")}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#6D2932] hover:bg-[#561C24] text-[#E8D8C4] px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                  >
                    <IconCheck size={18} />
                    Setujui Booking
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedBooking.id, "ditolak")}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#561C24]/80 hover:bg-[#561C24] text-[#E8D8C4] px-6 py-3 rounded-xl text-sm font-semibold transition-all"
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
