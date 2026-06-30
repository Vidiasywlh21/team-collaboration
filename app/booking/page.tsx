"use client";

import { useState, useEffect } from "react";
import { bookingSchema } from "../lib/schema";
import { checkTimeOverlap, saveBooking, generateBookingId, Booking } from "../lib/booking-store";
import { useAuth } from "../lib/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconCalendarPlus, IconCircleCheck, IconArrowLeft, IconPhone, IconAlertCircle, IconLogin, IconId } from "@tabler/icons-react";
import SearchableSelect from "../components/SearchableSelect";
import AnggotaForm from "../components/AnggotaForm";

const fakultasOptions = [
  { value: "fakultas_ilmu_komputer", label: "Fakultas Ilmu Komputer" },
  { value: "fakultas_humaniora_kesehatan", label: "Fakultas Humaniora dan Kesehatan" },
  { value: "fakultas_ekonomi_bisnis", label: "Fakultas Ekonomi dan Bisnis" },
  { value: "fakultas_teknik", label: "Fakultas Teknik" },
  { value: "lainnya", label: "Lainnya" },
];

const dataRuangan: Record<string, { value: string; label: string }[]> = {
  fakultas_ilmu_komputer: [
    // Lab
    { value: "lab_a", label: "Ruang Lab A" },
    { value: "lab_b", label: "Ruang Lab B" },
    { value: "lab_c", label: "Ruang Lab C" },
    { value: "lab_robotika", label: "Ruang Lab Robotika" },
    { value: "lab_jaringan", label: "Ruang Lab Jaringan" },
    { value: "lab_multimedia", label: "Ruang Lab Multimedia" },
    { value: "lab_manajemen", label: "Ruang Lab Manajemen" },
    // Ruang Kelas
    { value: "ruang_201", label: "Ruang 201" },
    { value: "ruang_202", label: "Ruang 202" },
    { value: "ruang_203", label: "Ruang 203" },
    { value: "ruang_204", label: "Ruang 204" },
    { value: "ruang_301", label: "Ruang 301" },
    { value: "ruang_304", label: "Ruang 304" },
    { value: "ruang_305", label: "Ruang 305" },
    { value: "ruang_306", label: "Ruang 306" },
    { value: "ruang_308", label: "Ruang 308" },
    // Ruang Lainnya
    { value: "ruang_eksekutif", label: "Ruang Eksekutif" },
    { value: "ruang_smart_class", label: "Ruang Smart Class" },
  ],
  fakultas_ekonomi_bisnis: [
    { value: "ruang_c201", label: "Ruang Kelas C201" },
    { value: "ruang_c202", label: "Ruang Kelas C202" },
    { value: "ruang_c203", label: "Ruang Kelas C203" },
  ],
  fakultas_humaniora_kesehatan: [
    { value: "ruang_202", label: "Ruang 202" },
    { value: "ruang_204", label: "Ruang 204" },
    { value: "ruang_206", label: "Ruang 206" },
    { value: "ruang_208", label: "Ruang 208" },
    { value: "ruang_210", label: "Ruang 210" },
    { value: "ruang_212", label: "Ruang 212" },
    { value: "ruang_b201", label: "Ruang B201" },
    { value: "ruang_b203", label: "Ruang B203" },
    { value: "ruang_b205", label: "Ruang B205" },
    { value: "ruang_b207", label: "Ruang B207" },
  ],
  fakultas_teknik: [
    { value: "lab_teknik", label: "Lab Teknik" },
    { value: "ruang_d201", label: "Ruang D201" },
    { value: "ruang_d202", label: "Ruang D202" },
    { value: "ruang_d203", label: "Ruang D203" },
    { value: "ruang_d301", label: "Ruang D301" },
    { value: "ruang_d302", label: "Ruang D302" },
  ],
  lainnya: [
    { value: "domain_space", label: "Domain Space" },
  ],
};

export default function BookingPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    telepon: "",
    tanggal: "",
    waktu_mulai: "",
    waktu_selesai: "",
    fakultas: "",
    ruangan: "",
    keperluan: "",
    anggota: [] as { nama: string; nim: string }[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ status: "dikonfirmasi" | "ditolak"; message: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, nama: user.nama }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Jika user mengubah fakultas, reset pilihan ruangan
    if (name === "fakultas") {
      setFormData({ ...formData, fakultas: value, ruangan: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Dapatkan daftar ruangan berdasarkan fakultas yang dipilih
  const availableRuangan = formData.fakultas ? dataRuangan[formData.fakultas] || [] : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      bookingSchema.parse(formData);
      setErrors({});
    } catch (err: any) {
      const formattedErrors: Record<string, string> = {};
      err.errors.forEach((error: any) => {
        if (error.path[0]) {
          formattedErrors[error.path[0]] = error.message;
        }
      });
      setErrors(formattedErrors);
      return;
    }

    const isOverlap = checkTimeOverlap(
      formData.ruangan,
      formData.tanggal,
      formData.waktu_mulai,
      formData.waktu_selesai
    );

    const status = "pending";
    const message = "Booking berhasil diajukan! Menunggu verifikasi admin.";

    const booking: Booking = {
      id: generateBookingId(),
      email: user.email,
      nama: formData.nama,
      nim: formData.nim,
      telepon: formData.telepon,
      fakultas: formData.fakultas,
      ruangan: formData.ruangan,
      tanggal: formData.tanggal,
      waktu_mulai: formData.waktu_mulai,
      waktu_selesai: formData.waktu_selesai,
      keperluan: formData.keperluan,
      anggota: formData.anggota.length > 0 ? formData.anggota : undefined,
      status,
      created_at: new Date().toISOString(),
    };

    saveBooking(booking);
    setBookingResult({ status, message });
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      nama: user?.nama || "",
      nim: "",
      telepon: "",
      tanggal: "",
      waktu_mulai: "",
      waktu_selesai: "",
      fakultas: "",
      ruangan: "",
      keperluan: "",
      anggota: [],
    });
    setSubmitted(false);
    setBookingResult(null);
  };

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

  if (submitted && bookingResult) {
    const isConfirmed = bookingResult.status === "dikonfirmasi";
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 text-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isConfirmed ? "bg-emerald-100 dark:bg-emerald-950/50" : "bg-rose-100 dark:bg-rose-950/50"}`}>
          {isConfirmed ? (
            <IconCircleCheck size={40} className="text-emerald-600 dark:text-emerald-400" />
          ) : (
            <IconAlertCircle size={40} className="text-rose-600 dark:text-rose-400" />
          )}
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${isConfirmed ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}>
          {isConfirmed ? "Booking Dikonfirmasi!" : "Booking Ditolak"}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-sm">
          {bookingResult.message}
        </p>
        {isConfirmed && (
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 mb-6 text-sm text-left max-w-sm w-full">
            <p className="text-zinc-500 dark:text-zinc-400">Detail Booking:</p>
            <p className="font-semibold">{ruanganOptions.find(r => r.value === formData.ruangan)?.label}</p>
            <p className="text-zinc-600 dark:text-zinc-300">{formData.tanggal} • {formData.waktu_mulai} - {formData.waktu_selesai}</p>
          </div>
        )}
        <div className="flex gap-3">
          <button 
            onClick={resetForm}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
          >
            Buat Booking Lagi
          </button>
          <Link href="/status" className="inline-flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all">
            Lihat Riwayat
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans py-12 px-4 sm:px-6 lg:px-8 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors">
          <IconArrowLeft size={16} />
          Kembali ke Beranda
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-indigo-600 dark:text-indigo-400">
              <IconCalendarPlus size={28} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Formulir Booking Ruangan</h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Isi detail berikut untuk mengajukan reservasi ruang rapat atau area kerja.</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              {user.nama.charAt(0).toUpperCase()}
            </div>
            <div className="text-sm">
              <p className="font-semibold">{user.nama}</p>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Nama */}
              <div>
                <label htmlFor="nama" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Nama Pemesan</label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.nama ? 'border-rose-500 focus:ring-rose-500' : 'border-zinc-300 dark:border-zinc-700 focus:ring-indigo-600'} bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 transition-all`}
                />
                {errors.nama && <p className="mt-1.5 text-xs text-rose-500">{errors.nama}</p>}
              </div>

              {/* NIM */}
              <div>
                <label htmlFor="nim" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <IconId size={14} />
                    NIM Pemesan
                  </span>
                </label>
                <input
                  type="text"
                  id="nim"
                  name="nim"
                  value={formData.nim}
                  onChange={handleChange}
                  placeholder="Nomor Induk Mahasiswa"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.nim ? 'border-rose-500 focus:ring-rose-500' : 'border-zinc-300 dark:border-zinc-700 focus:ring-indigo-600'} bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 transition-all`}
                />
                {errors.nim && <p className="mt-1.5 text-xs text-rose-500">{errors.nim}</p>}
              </div>

              {/* Telepon */}
              <div>
                <label htmlFor="telepon" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <IconPhone size={14} />
                    Nomor Telepon Aktif
                  </span>
                </label>
                <input
                  type="tel"
                  id="telepon"
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.telepon ? 'border-rose-500 focus:ring-rose-500' : 'border-zinc-300 dark:border-zinc-700 focus:ring-indigo-600'} bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 transition-all`}
                />
                {errors.telepon && <p className="mt-1.5 text-xs text-rose-500">{errors.telepon}</p>}
              </div>

              {/* Fakultas dan Lainnya */}
              <div>
                <label htmlFor="fakultas" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Fakultas dan Lainnya</label>
                <select
                  id="fakultas"
                  name="fakultas"
                  value={formData.fakultas}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.fakultas ? 'border-rose-500 focus:ring-rose-500' : 'border-zinc-300 dark:border-zinc-700 focus:ring-indigo-600'} bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 transition-all`}
                >
                  <option value="">-- Pilih Fakultas --</option>
                  {fakultasOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {errors.fakultas && <p className="mt-1.5 text-xs text-rose-500">{errors.fakultas}</p>}
              </div>

              {/* Ruangan */}
              <div>
                <label htmlFor="ruangan" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Pilih Ruangan</label>
                {!formData.fakultas ? (
                  <div className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/30 text-sm text-zinc-400 cursor-not-allowed">
                    Pilih fakultas terlebih dahulu
                  </div>
                ) : (
                  <SearchableSelect
                    id="ruangan"
                    name="ruangan"
                    value={formData.ruangan}
                    options={availableRuangan}
                    onChange={(value) => setFormData({ ...formData, ruangan: value })}
                    placeholder="-- Pilih Ruangan --"
                    error={!!errors.ruangan}
                  />
                )}
                {errors.ruangan && <p className="mt-1.5 text-xs text-rose-500">{errors.ruangan}</p>}
              </div>

              {/* Tanggal */}
              <div>
                <label htmlFor="tanggal" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Tanggal Booking</label>
                <input
                  type="date"
                  id="tanggal"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.tanggal ? 'border-rose-500 focus:ring-rose-500' : 'border-zinc-300 dark:border-zinc-700 focus:ring-indigo-600'} bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 transition-all`}
                />
                {errors.tanggal && <p className="mt-1.5 text-xs text-rose-500">{errors.tanggal}</p>}
              </div>

              {/* Waktu */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="waktu_mulai" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Jam Mulai</label>
                  <input
                    type="time"
                    id="waktu_mulai"
                    name="waktu_mulai"
                    value={formData.waktu_mulai}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.waktu_mulai ? 'border-rose-500 focus:ring-rose-500' : 'border-zinc-300 dark:border-zinc-700 focus:ring-indigo-600'} bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 transition-all`}
                  />
                  {errors.waktu_mulai && <p className="mt-1.5 text-xs text-rose-500">{errors.waktu_mulai}</p>}
                </div>
                <div>
                  <label htmlFor="waktu_selesai" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Jam Selesai</label>
                  <input
                    type="time"
                    id="waktu_selesai"
                    name="waktu_selesai"
                    value={formData.waktu_selesai}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.waktu_selesai ? 'border-rose-500 focus:ring-rose-500' : 'border-zinc-300 dark:border-zinc-700 focus:ring-indigo-600'} bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 transition-all`}
                  />
                  {errors.waktu_selesai && <p className="mt-1.5 text-xs text-rose-500">{errors.waktu_selesai}</p>}
                </div>
              </div>
            </div>

            {/* Keperluan */}
            <div>
              <label htmlFor="keperluan" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Keperluan / Catatan</label>
              <textarea
                id="keperluan"
                name="keperluan"
                value={formData.keperluan}
                onChange={handleChange}
                rows={4}
                placeholder="Jelaskan secara singkat agenda penggunaan ruangan..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all resize-none"
              ></textarea>
            </div>

            {/* Anggota Kelompok */}
            <AnggotaForm
              anggota={formData.anggota}
              onChange={(anggota) => setFormData({ ...formData, anggota })}
              errors={errors}
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <Link href="/" className="px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                Batal
              </Link>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
              >
                <IconCalendarPlus size={16} />
                Ajukan Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
