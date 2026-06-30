"use client";

import { useState } from "react";
import { bookingSchema } from "../lib/schema";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IconCalendarPlus, IconCircleCheck } from "@tabler/icons-react";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    nama: "",
    tanggal: "",
    waktu_mulai: "",
    waktu_selesai: "",
    ruangan: "",
    keperluan: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      bookingSchema.parse(formData);
      setErrors({});
      setSubmitted(true);
    } catch (err: any) {
      const formattedErrors: Record<string, string> = {};
      err.errors.forEach((error: any) => {
        if (error.path[0]) {
          formattedErrors[error.path[0]] = error.message;
        }
      });
      setErrors(formattedErrors);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
        <Navbar activePage="/booking" />
        <div className="flex flex-col items-center justify-center p-4 text-center flex-1 py-20">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center mb-6">
            <IconCircleCheck size={40} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">Booking Berhasil Dikirim!</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-sm">
            Permintaan reservasi ruangan <strong>{formData.ruangan}</strong> untuk <strong>{formData.nama}</strong> sedang diproses.
          </p>
          <div className="flex gap-3">
            <button 
              onClick={() => { setSubmitted(false); setFormData({ nama: "", tanggal: "", waktu_mulai: "", waktu_selesai: "", ruangan: "", keperluan: "" }); }}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
            >
              Buat Booking Lagi
            </button>
            <Link href="/" className="inline-flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
      <Navbar activePage="/booking" />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-indigo-600 dark:text-indigo-400">
            <IconCalendarPlus size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Formulir Booking Ruangan</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Isi detail berikut untuk mengajukan reservasi ruang rapat atau area kerja.</p>
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

              {/* Ruangan */}
              <div>
                <label htmlFor="ruangan" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Pilih Ruangan</label>
                <select
                  id="ruangan"
                  name="ruangan"
                  value={formData.ruangan}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                >
                  <option value="">-- Pilih Ruangan --</option>
                  <option value="ruang_rapat_a">Ruang Rapat Kreatif A</option>
                  <option value="ruang_rapat_b">Ruang Rapat Eksekutif B</option>
                  <option value="booth_call">Booth Telepon Kedap Suara</option>
                  <option value="meja_kerja_t">Meja Kerja Tim Tengah</option>
                </select>
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
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                />
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
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="waktu_selesai" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Jam Selesai</label>
                  <input
                    type="time"
                    id="waktu_selesai"
                    name="waktu_selesai"
                    value={formData.waktu_selesai}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  />
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

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <Link href="/" className="px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                Batal
              </Link>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
              >
                Ajukan Booking
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
