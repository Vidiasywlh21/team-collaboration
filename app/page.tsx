"use client";

import Link from "next/link";
import { 
  IconLayout, 
  IconCalendarPlus, 
  IconClock, 
  IconHelpCircle,
  IconArrowRight,
  IconMapPin,
  IconUsers,
  IconCircleCheck
} from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-100 font-sans" style={{background: "linear-gradient(to bottom, #e4d7c3 0%, #dccfb9 12%, #511821 22%, #60232c 35%, #68242e 45%, #c6b9a3 55%, #e6d9c3 65%, #e7dac4 75%, #e6d9c3 82%, #581b23 90%, #561d23 100%)"}}>
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> 
        {/* Welcome Section */}
        <section className="mb-10 p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-[0_0_40px_rgba(99,102,241,0.15),0_0_80px_rgba(99,102,241,0.08)]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/um_beranda2.png')" }}
          ></div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200 mb-6">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              Sistem Aktif & Terpadu
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 leading-tight text-zinc-900">
              Booking Ruangan Mudah untuk <br />
              Seluruh Civitas Universitas Mulia Balikpapan
            </h1>
            <p className="text-zinc-100 text-sm md:text-base mb-8 leading-relaxed drop-shadow-md">
              SinergiSpace adalah platform booking ruangan yang diperuntukkan bagi mahasiswa dan seluruh warga Universitas Mulia Balikpapan. Anda dapat dengan mudah membuat atau melakukan booking ruangan untuk belajar mandiri, belajar kelompok, maupun diskusi UKM — tersedia untuk semua ruangan di setiap fakultas.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/booking" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40">
                Pilih Ruangan Sekarang  
                <IconArrowRight size={16} />
              </Link>
              <Link href="/tata-letak" className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold text-sm px-5 py-3 rounded-xl transition-all border border-zinc-200">
                Lihat Denah Tata Letak
              </Link>
            </div>
          </div>
        </section>

        {/* Live Statistics Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <IconMapPin size={24} />
            </div>
            <div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-0.5">Meja Terbooking</span>
              <span className="text-xl font-bold tracking-tight">18 <span className="text-xs text-zinc-400 dark:text-zinc-500 font-normal">/ 24 meja</span></span>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <IconUsers size={24} />
            </div>
            <div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-0.5">Kapasitas Hari Ini</span>
              <span className="text-xl font-bold tracking-tight">75% <span className="text-xs text-emerald-500 font-semibold">(Terisi)</span></span>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <IconClock size={24} />
            </div>
            <div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-0.5">Booking Aktif</span>
              <span className="text-xl font-bold tracking-tight">5 <span className="text-xs text-zinc-400 dark:text-zinc-500 font-normal">reservasi</span></span>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <IconCircleCheck size={24} />
            </div>
            <div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-0.5">Status Server</span>
              <span className="text-xl font-bold tracking-tight text-teal-600 dark:text-teal-400">Normal</span>
            </div>
          </div>
        </section>

        {/* Core Menu Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Menu Utama Sistem</h2>
              <p className="text-zinc-500 dark:text-zinc-100 text-xs md:text-sm">Akses cepat ke seluruh modul operasional SinergiSpace</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Tata Letak Card */}
            <div className="group bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-6 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-lg hover:border-indigo-500/20 dark:hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <IconLayout size={26} />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Tata Letak Ruangan
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                  Lihat denah interaktif ruang kerja, ketersediaan meja, dan koordinat area tim secara real-time. Membantu Anda menemukan rekan kerja atau meja yang siap pakai.
                </p>
              </div>
              <div>
                <div className="h-[1px] w-full bg-zinc-100 dark:bg-zinc-800 mb-5"></div>
                <Link href="/tata-letak" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:gap-3 transition-all">
                  Buka Denah Tata Letak
                  <IconArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Booking Card */}
            <div className="group bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-6 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-lg hover:border-indigo-500/20 dark:hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <IconCalendarPlus size={26} />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Reservasi / Booking
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                  Buat reservasi meja harian, ruang meeting eksekutif, atau bilik telepon kedap suara. Proses pengisian formulir mudah, cepat, dan terintegrasi aturan validasi.
                </p>
              </div>
              <div>
                <div className="h-[1px] w-full bg-zinc-100 dark:bg-zinc-800 mb-5"></div>
                <Link href="/booking" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm hover:gap-3 transition-all">
                  Mulai Pesan Ruangan
                  <IconArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Status Booking Card */}
            <div className="group bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-6 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-lg hover:border-indigo-500/20 dark:hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <IconClock size={26} />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Status & Riwayat Booking
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                  Pantau persetujuan admin untuk reservasi yang Anda ajukan. Periksa detail tiket reservasi aktif, jadwal mendatang, serta riwayat booking yang telah selesai.
                </p>
              </div>
              <div>
                <div className="h-[1px] w-full bg-zinc-100 dark:bg-zinc-800 mb-5"></div>
                <Link href="/status" className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm hover:gap-3 transition-all">
                  Cek Status Booking
                  <IconArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Bantuan Card */}
            <div className="group bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-6 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-lg hover:border-indigo-500/20 dark:hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <IconHelpCircle size={26} />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  Pusat Bantuan & FAQ
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                  Temukan panduan praktis penggunaan ruang kerja, tanyakan kendala teknis (wi-fi, AC, proyektor), atau kirimkan tiket aduan langsung ke tim operasional kami.
                </p>
              </div>
              <div>
                <div className="h-[1px] w-full bg-zinc-100 dark:bg-zinc-800 mb-5"></div>
                <Link href="/bantuan" className="inline-flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-sm hover:gap-3 transition-all">
                  Butuh Bantuan Teknis
                  <IconArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Recent Activity / Information Logs Section */}
        <section className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold">Informasi & Aktivitas Terkini</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs">Pembaruan harian seputar operasional SinergiSpace</p>
            </div>
            <span className="text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold px-3 py-1 rounded-full self-start sm:self-center">
              Pembaruan Terakhir: Hari Ini, 09:15
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-emerald-500"></span>
              <div>
                <p className="text-xs text-zinc-400 mb-0.5">09:00 WIB · Booking Baru</p>
                <p className="text-sm font-medium">Budi Santoso telah memesan <strong className="text-indigo-600 dark:text-indigo-400">Ruang Rapat Kreatif A</strong> untuk jam 13:00 - 15:00 WIB.</p>
              </div>
            </div>
            <div className="h-[1px] w-full bg-zinc-100 dark:bg-zinc-800"></div>
            
            <div className="flex gap-4 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-indigo-500"></span>
              <div>
                <p className="text-xs text-zinc-400 mb-0.5 font-sans">08:30 WIB · Pengumuman</p>
                <p className="text-sm font-medium">Perawatan berkala jaringan Wi-Fi Area Timur selesai lebih cepat. Seluruh jaringan kembali beroperasi normal.</p>
              </div>
            </div>
            <div className="h-[1px] w-full bg-zinc-100 dark:bg-zinc-800"></div>

            <div className="flex gap-4 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-amber-500"></span>
              <div>
                <p className="text-xs text-zinc-400 mb-0.5">Kemarin, 16:45 WIB · Status Booking</p>
                <p className="text-sm font-medium">Reservasi Meja 12 oleh Clara Sitorus telah dikonfirmasi oleh Admin.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}
