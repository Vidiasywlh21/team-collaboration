"use client";

import Link from "next/link";
import { useState } from "react";
import { IconLifebuoy, IconArrowLeft, IconChevronDown, IconSend, IconPhone, IconMail, IconMapPin } from "@tabler/icons-react";

const faqs = [
  {
    question: "Bagaimana cara melakukan booking ulang atau membatalkan reservasi?",
    answer: "Anda dapat membatalkan reservasi melalui halaman 'Status & Riwayat Booking'. Cukup klik tombol 'Batalkan' pada tiket booking aktif Anda. Batas waktu pembatalan adalah minimal 2 jam sebelum jadwal booking dimulai."
  },
  {
    question: "Apakah saya bisa booking ruangan untuk beberapa hari ke depan?",
    answer: "Ya, sistem SinergiSpace memungkinkan Anda melakukan reservasi hingga 7 hari ke depan. Silakan pilih tanggal yang diinginkan pada saat pengisian formulir booking."
  },
  {
    question: "Saya mengalami kendala teknis pada proyektor atau AC di ruangan, apa yang harus saya lakukan?",
    answer: "Segera laporkan kendala tersebut melalui formulir aduan di bawah halaman ini, atau hubungi nomor hotline operasional kami. Tim teknis akan segera menuju lokasi untuk melakukan pengecekan."
  },
  {
    question: "Apakah diperbolehkan membawa makanan dan minuman ke area ruang meeting?",
    answer: "Makanan ringan dan minuman dalam botol tertutup diperbolehkan. Namun, untuk menjaga kebersihan, mohon buang sisa makanan pada tempat sampah yang telah disediakan di akhir sesi."
  },
];

export default function BantuanPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
          <Link href="/" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-600 dark:text-zinc-300">
            <IconArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <IconLifebuoy size={18} />
            </div>
            <h1 className="text-lg font-bold">Pusat Bantuan & Dukungan Teknis</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-rose-600 to-orange-600 dark:from-rose-400 dark:to-orange-400 bg-clip-text text-transparent">
            Ada yang bisa kami bantu?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
            Temukan jawaban atas pertanyaan umum seputar pemesanan, fasilitas, atau laporkan kendala teknis langsung ke tim SinergiSpace.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-600 dark:text-indigo-400 flex-shrink-0">
              <IconPhone size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1">Hotline Operasional</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-2">Tersedia setiap hari kerja pukul 08.00 - 17.00 WIB</p>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">0812-3456-7890</span>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-emerald-600 dark:text-emerald-400 flex-shrink-0">
              <IconMail size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1">Surel Resmi</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-2">Kirim detail kendala Anda secara tertulis</p>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">support@sinergispace.co.id</span>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-amber-600 dark:text-amber-400 flex-shrink-0">
              <IconMapPin size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1">Lokasi Kantor Pusat</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-2">Kunjungi helpdesk di lantai dasar gedung utama</p>
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">Gedung Sinergi Lt. 1</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-6">Pertanyaan yang Sering Diajukan (FAQ)</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 pr-4">{faq.question}</span>
                  <IconChevronDown size={18} className={`text-zinc-500 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Form */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden border border-zinc-800 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.1),transparent_50%)]"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Kirim Aduan atau Pertanyaan</h3>
            <p className="text-zinc-400 text-sm mb-8 max-w-lg">Isi formulir di bawah ini, tim kami akan membalas dalam 1x24 jam kerja.</p>
            
            {submitted ? (
              <div className="bg-emerald-900/30 border border-emerald-700 rounded-xl p-6 text-center max-w-lg">
                <h4 className="text-lg font-bold text-emerald-400 mb-2">Aduan Berhasil Dikirim!</h4>
                <p className="text-emerald-200 text-sm">Terima kasih, tim operasional kami akan segera menindaklanjuti laporan ini.</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 text-sm font-semibold underline text-white/80 hover:text-white">Kirim aduan baru</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="max-w-lg space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1.5">Nama Lengkap</label>
                  <input type="text" id="name" required className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" placeholder="Masukkan nama Anda" />
                </div>
                <div>
                  <label htmlFor="issue" className="block text-sm font-medium text-zinc-300 mb-1.5">Topik Kendala</label>
                  <select id="issue" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all appearance-none">
                    <option value="ruangan">Kondisi Ruangan / Fasilitas</option>
                    <option value="sistem">Kendala Teknis Aplikasi</option>
                    <option value="booking">Masalah Booking / Reservasi</option>
                    <option value="lainnya">Pertanyaan Umum Lainnya</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-1.5">Detail Aduan / Pesan</label>
                  <textarea id="message" rows={4} required className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-none" placeholder="Jelaskan kendala Anda secara rinci..."></textarea>
                </div>
                <button type="submit" className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-rose-600/30">
                  <IconSend size={16} />
                  Kirim Laporan
                </button>
              </form>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
