"use client";

import { useState } from "react";
import Link from "next/link";
import { IconChevronDown, IconSend, IconPhone, IconMail, IconMapPin} from "@tabler/icons-react";

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
    <div
      className="min-h-screen font-sans text-zinc-900 dark:text-zinc-100"
      style={{
        background: "linear-gradient(to bottom, #f8f3ec 0%, #f5efe6 10%, #ede4d4 20%, #e4d7c3 30%, #dccfb9 40%, #d4c4ac 48%, #c8b89a 50%, #b09078 53%, #9a7060 57%, #8a5a50 62%, #7a4040 68%, #6D2931 75%, #622530 82%, #5a1f25 88%, #511a20 94%, #4a1520 100%)",
      }}
    >

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold mb-3 text-[#561C24]">
            Ada yang bisa kami bantu?
          </h2>
          <p className="text-[#6D2932] max-w-lg mx-auto leading-relaxed">
            Temukan jawaban atas pertanyaan umum seputar pemesanan, fasilitas, atau laporkan kendala teknis langsung ke tim UMSpace.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-[#E8D8C4]/80 p-6 rounded-2xl border border-[#C7B7A3] flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-[#561C24]/10 rounded-xl text-[#561C24] flex-shrink-0">
              <IconPhone size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1 text-[#561C24]">Hotline Operasional</h3>
              <p className="text-[#6D2932]/70 text-xs mb-2">Tersedia setiap hari kerja pukul 08.00 - 17.00 WIB</p>
              <span className="text-sm font-semibold text-[#561C24]">0895-7043-96770</span>
            </div>
          </div>
          <div className="bg-[#E8D8C4]/80 p-6 rounded-2xl border border-[#C7B7A3] flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-[#561C24]/10 rounded-xl text-[#561C24] flex-shrink-0">
              <IconMail size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1 text-[#561C24]">Surel Resmi</h3>
              <p className="text-[#6D2932]/70 text-xs mb-2">Kirim detail kendala Anda secara tertulis</p>
              <span className="text-sm font-semibold text-[#561C24]">support@sinergispace.co.id</span>
            </div>
          </div>
          <div className="bg-[#E8D8C4]/80 p-6 rounded-2xl border border-[#C7B7A3] flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-[#561C24]/10 rounded-xl text-[#561C24] flex-shrink-0">
              <IconMapPin size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1 text-[#561C24]">Lokasi Kantor Pusat</h3>
              <p className="text-[#6D2932]/70 text-xs mb-2">Kunjungi helpdesk di Gedung Putih FIKOM</p>
              <span className="text-sm font-semibold text-[#561C24]">Gedung Putih Lt. 1</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-6 text-[#561C24]">Pertanyaan yang Sering Diajukan (FAQ)</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#E8D8C4]/80 border border-[#C7B7A3] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#E8D8C4] transition-colors"
                >
                  <span className="font-semibold text-sm text-[#561C24] pr-4">{faq.question}</span>
                  <IconChevronDown size={18} className={`text-[#6D2932] transition-transform duration-300 flex-shrink-0 ${openIndex === index ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-5 pb-5 text-sm text-[#6D2932] leading-relaxed border-t border-[#C7B7A3] pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Form */}
        <div className="bg-[#561C24] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden border border-[#4a1520] shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Kirim Aduan atau Pertanyaan</h3>
            <p className="text-[#E8D8C4]/70 text-sm mb-8 max-w-lg">Isi formulir di bawah ini, tim kami akan membalas dalam 1x24 jam kerja.</p>

            {submitted ? (
              <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center max-w-lg">
                <h4 className="text-lg font-bold text-[#E8D8C4] mb-2">Aduan Berhasil Dikirim!</h4>
                <p className="text-white text-sm">Terima kasih, tim operasional kami akan segera menindaklanjuti laporan ini.</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 text-sm font-semibold underline text-[#E8D8C4] hover:text-white">Kirim aduan baru</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="max-w-lg space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#E8D8C4] mb-1.5">Nama Lengkap</label>
                  <input type="text" id="name" required className="w-full bg-white border border-[#C7B7A3] rounded-xl px-4 py-3 text-sm text-[#561C24] placeholder-[#6D2932]/50 focus:outline-none focus:ring-2 focus:ring-[#E8D8C4] transition-all" placeholder="Masukkan nama Anda" />
                </div>
                <div>
                  <label htmlFor="issue" className="block text-sm font-medium text-[#E8D8C4] mb-1.5">Topik Kendala</label>
                  <select id="issue" className="w-full bg-white border border-[#C7B7A3] rounded-xl px-4 py-3 text-sm text-[#561C24] focus:outline-none focus:ring-2 focus:ring-[#E8D8C4] transition-all appearance-none">
                    <option value="ruangan">Kondisi Ruangan / Fasilitas</option>
                    <option value="pemesanan">Kendala Pemesanan</option>
                    <option value="akun">Masalah Akun / Login</option>
                    <option value="jadwal">Informasi Jadwal</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#E8D8C4] mb-1.5">Detail Aduan / Pesan</label>
                  <textarea id="message" rows={4} required className="w-full bg-white border border-[#C7B7A3] rounded-xl px-4 py-3 text-sm text-[#561C24] placeholder-[#6D2932]/50 focus:outline-none focus:ring-2 focus:ring-[#E8D8C4] transition-all resize-none" placeholder="Jelaskan kendala Anda secara rinci..."></textarea>
                </div>
                <button type="submit" className="inline-flex items-center gap-2 bg-[#E8D8C4] hover:bg-[#C7B7A3] text-[#561C24] font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-lg">
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
