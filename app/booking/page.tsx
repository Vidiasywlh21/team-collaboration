"use client";

import { useState, useEffect } from "react";
import { bookingSchema } from "../lib/schema";
import { checkTimeOverlap, saveBooking, generateBookingId, Booking } from "../lib/booking-store";
import { useAuth } from "../lib/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IconCalendarPlus, IconCircleCheck, IconArrowLeft, IconPhone, IconAlertCircle, IconId, IconLogin, IconUserPlus, IconMail, IconLock, IconUser, IconArrowRight, IconX, IconSchool } from "@tabler/icons-react";
import SearchableSelect from "../components/SearchableSelect";
import AnggotaForm from "../components/AnggotaForm";

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

const faculties = [
  { slug: "fikom", name: "FIKOM", full: "Fakultas Ilmu Komputer", image: "/FIKOM.jpeg", desc: "Informatika, Sistem Informasi, dan Teknologi Informasi", dataKey: "fakultas_ilmu_komputer" },
  { slug: "feb", name: "FEB", full: "Fakultas Ekonomi & Bisnis", image: "/feb2.png", desc: "Manajemen dan Akuntasi", dataKey: "fakultas_ekonomi_bisnis" },
  { slug: "humaniora-kesehatan", name: "Humaniora & Kesehatan", full: "Fakultas Humaniora & Kesehatan", image: "/chengho.jpg", desc: "Farmasi, Hukum, dan PGPAUD", dataKey: "fakultas_humaniora_kesehatan" },
  { slug: "teknik", name: "Teknik", full: "Fakultas Teknik", image: "/Teknik.jpeg", desc: "Teknik Pangan, Sipil, dan Industri", dataKey: "fakultas_teknik" },

];

const dataRuangan: Record<string, { value: string; label: string }[]> = {
  fakultas_ilmu_komputer: [
    { value: "lab_a", label: "Ruang Lab A" },
    { value: "lab_b", label: "Ruang Lab B" },
    { value: "lab_c", label: "Ruang Lab C" },
    { value: "lab_robotika", label: "Ruang Lab Robotika" },
    { value: "lab_jaringan", label: "Ruang Lab Jaringan" },
    { value: "lab_multimedia", label: "Ruang Lab Multimedia" },
    { value: "lab_manajemen", label: "Ruang Lab Manajemen" },
    { value: "ruang_201", label: "Ruang 201" },
    { value: "ruang_202", label: "Ruang 202" },
    { value: "ruang_203", label: "Ruang 203" },
    { value: "ruang_204", label: "Ruang 204" },
    { value: "ruang_301", label: "Ruang 301" },
    { value: "ruang_304", label: "Ruang 304" },
    { value: "ruang_305", label: "Ruang 305" },
    { value: "ruang_306", label: "Ruang 306" },
    { value: "ruang_308", label: "Ruang 308" },
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
  const { user, isLoading, login, register } = useAuth();
  const router = useRouter();

  // Auth state
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authNama, setAuthNama] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Step state
  const [step, setStep] = useState<"fakultas" | "form">("fakultas");
  const [selectedFaculty, setSelectedFaculty] = useState<typeof faculties[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRuangan, setSelectedRuangan] = useState<{ value: string; label: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    telepon: "",
    tanggal: "",
    waktu_mulai: "",
    waktu_selesai: "",
    keperluan: "",
    anggota: [] as { nama: string; nim: string }[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ status: "dikonfirmasi" | "ditolak" | "pending"; message: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useScrollReveal();

  // ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!authEmail || !authPassword || (authMode === "register" && !authNama)) {
      setAuthError("Semua field harus diisi");
      return;
    }
    if (authMode === "login") {
      const success = login(authEmail, authPassword);
      if (!success) setAuthError("Email atau password salah");
    } else {
      const success = register(authEmail, authNama, authPassword);
      if (!success) setAuthError("Email sudah terdaftar");
    }
  };

  const handleSelectRoom = (room: { value: string; label: string }) => {
    setSelectedRuangan(room);
    setIsModalOpen(false);
    setStep("form");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedRuangan || !selectedFaculty) return;
    try {
      bookingSchema.parse({
        ...formData,
        fakultas: selectedFaculty.dataKey,
        ruangan: selectedRuangan.value,
      });
      setErrors({});
    } catch (err: any) {
      const formattedErrors: Record<string, string> = {};
      err.errors.forEach((error: any) => {
        if (error.path[0]) formattedErrors[error.path[0]] = error.message;
      });
      setErrors(formattedErrors);
      return;
    }
    const isOverlap = checkTimeOverlap(selectedRuangan.value, formData.tanggal, formData.waktu_mulai, formData.waktu_selesai);
    if (isOverlap) {
      setErrors({ ruangan: "Ruangan sudah ter booking pada jam tersebut" });
      return;
    }
    const status = "pending";
    const message = "Booking berhasil diajukan! Menunggu verifikasi admin.";
    const booking: Booking = {
      id: generateBookingId(),
      email: user.email,
      nama: formData.nama,
      nim: formData.nim,
      telepon: formData.telepon,
      fakultas: selectedFaculty.dataKey,
      ruangan: selectedRuangan.value,
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

  const resetAll = () => {
    setFormData({ nama: user?.nama || "", nim: "", telepon: "", tanggal: "", waktu_mulai: "", waktu_selesai: "", keperluan: "", anggota: [] });
    setSubmitted(false);
    setBookingResult(null);
    setSelectedFaculty(null);
    setSelectedRuangan(null);
    setStep("fakultas");
    setErrors({});
  };

  // ===================== LOADING =====================
  if (isLoading) {
    return (
      <div className="animate-fade-in min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#561C24]"></div>
        <p className="animate-fade-in-up text-[#561C24] text-sm">Memuat halaman booking...</p>
      </div>
    );
  }

  // ===================== NOT LOGGED IN =====================
  if (!user) {
    return (
      <div className="animate-fade-in min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in-scale">
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium text-[#561C24] hover:text-white mb-8 transition-colors">
            <IconArrowLeft size={16} /> Kembali ke Beranda
          </Link>
          <div className="bg-[#E8D8C4] rounded-2xl border border-[#C7B7A3] shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#561C24] rounded-xl text-[#E8D8C4] animate-scale-in">
                  {authMode === "login" ? <IconLogin size={24} /> : <IconUserPlus size={24} />}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#561C24]">{authMode === "login" ? "Masuk" : "Daftar"}</h1>
                  <p className="text-[#6D2932] text-sm">{authMode === "login" ? "Masuk untuk melakukan booking" : "Buat akun untuk mulai booking"}</p>
                </div>
              </div>
              {authError && <div className="mb-4 p-3 bg-rose-100 border border-rose-300 rounded-xl text-sm text-rose-700 animate-shake">{authError}</div>}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === "register" && (
                  <div className="animate-fade-in-up animate-stagger-1">
                    <label className="block text-sm font-semibold text-[#561C24] mb-2"><span className="flex items-center gap-1.5"><IconUser size={14} />Nama Lengkap</span></label>
                    <input type="text" value={authNama} onChange={(e) => setAuthNama(e.target.value)} placeholder="Masukkan nama lengkap"
                      className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] placeholder-[#6D2932]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all duration-200 hover:border-[#6D2932]" />
                  </div>
                )}
                <div className="animate-fade-in-up animate-stagger-2">
                  <label className="block text-sm font-semibold text-[#561C24] mb-2"><span className="flex items-center gap-1.5"><IconMail size={14} />Email</span></label>
                  <input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="nama@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] placeholder-[#6D2932]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all duration-200 hover:border-[#6D2932]" />
                </div>
                <div className="animate-fade-in-up animate-stagger-3">
                  <label className="block text-sm font-semibold text-[#561C24] mb-2"><span className="flex items-center gap-1.5"><IconLock size={14} />Password</span></label>
                  <input type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="Masukkan password"
                    className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] placeholder-[#6D2932]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all duration-200 hover:border-[#6D2932]" />
                </div>
                <button type="submit" className="w-full animate-fade-in-up animate-stagger-4 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#6D2932] hover:bg-[#561C24] text-white rounded-xl text-sm font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                  {authMode === "login" ? <><IconLogin size={16} />Masuk</> : <><IconUserPlus size={16} />Daftar</>}
                </button>
              </form>
              <div className="mt-6 text-center animate-fade-in-up animate-stagger-5">
                <button onClick={() => { setAuthMode(authMode === "login" ? "register" : "login"); setAuthError(""); }}
                  className="text-sm text-[#561C24] hover:underline font-medium">
                  {authMode === "login" ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===================== SUBMITTED =====================
  if (submitted && bookingResult) {
    const isConfirmed = bookingResult.status === "dikonfirmasi";
    return (
      <div className="animate-fade-in min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <div className={`animate-scale-bounce w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isConfirmed ? "bg-emerald-100" : "bg-[#C7B7A3]"}`}>
          {isConfirmed ? <IconCircleCheck size={40} className="text-emerald-600" /> : <IconAlertCircle size={40} className="text-[#561C24]" />}
        </div>
        <h2 className={`animate-fade-in-up animate-stagger-1 text-2xl font-bold mb-2 ${isConfirmed ? "text-emerald-700" : "text-[#561c24]"}`}>
          {isConfirmed ? "Booking Dikonfirmasi!" : "Menunggu Konfirmasi"}
        </h2>
        <p className="animate-fade-in-up animate-stagger-2 text-white mb-8 max-w-sm">{bookingResult.message}</p>
        {isConfirmed && selectedRuangan && (
          <div className="animate-fade-in-up animate-stagger-3 bg-[#E8D8C4] rounded-xl p-4 mb-6 text-sm text-left max-w-sm w-full">
            <p className="text-[#6D2932]/70">Detail Booking:</p>
            <p className="font-semibold text-[#561C24]">{selectedRuangan.label}</p>
            <p className="text-[#6D2932]">{formData.tanggal} &bull; {formData.waktu_mulai} - {formData.waktu_selesai}</p>
          </div>
        )}
        <div className="animate-fade-in-up animate-stagger-4 flex gap-3">
          <button onClick={resetAll} className="inline-flex items-center gap-2 bg-[#6D2932] hover:bg-[#561C24] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
            Buat Booking Lagi
          </button>
          <Link href="/status" className="inline-flex items-center gap-2 bg-[#E8D8C4] border border-[#C7B7A3] text-[#561C24] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#C7B7A3] transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]">
            Lihat Riwayat
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 bg-[#E8D8C4] border border-[#C7B7A3] text-[#561C24] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#C7B7A3] transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  // ===================== STEP 1: PILIH FAKULTAS =====================
  if (step === "fakultas") {
    return (
      <div className="font-sans text-zinc-900 relative">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="animate-fade-in-up animate-stagger-1 text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              <span className="text-[#561c24] drop-shadow-lg">
                Booking Ruangan
              </span>
            </h1>
            <p className="animate-fade-in-up animate-stagger-2 text-[#561c24] max-w-lg mx-auto text-base leading-relaxed drop-shadow-md">
              Pilih fakultas untuk melihat ruangan yang tersedia dan ajukan booking
            </p>
            <div className="animate-fade-in-up animate-stagger-3 flex justify-center mt-6">
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            </div>
            {/* User badge */}
            <div className="animate-fade-in-up animate-stagger-4 flex items-center justify-center gap-2 mt-4 px-4 py-2 bg-[#E8D8C4]/80 backdrop-blur-sm rounded-full w-fit mx-auto">
              <div className="w-6 h-6 bg-[#561C24] rounded-full flex items-center justify-center text-white font-bold text-xs">
                {user.nama.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-[#561C24]">{user.nama}</span>
              <span className="text-xs text-[#6D2932]/60">|</span>
              <button onClick={() => { router.push("/status"); }} className="text-xs font-medium text-[#6D2932] hover:text-[#561C24] transition-colors">
                Lihat Riwayat
              </button>
            </div>
          </div>

          {/* Faculty Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {faculties.map((f, i) => (
              <button
                key={f.slug}
                onClick={() => { setSelectedFaculty(f); setIsModalOpen(true); }}
                className={`scroll-reveal group text-left relative overflow-hidden rounded-3xl min-h-[250px] flex flex-col justify-end transition-all duration-500 hover:-translate-y-2 border-2 border-white/20 hover:border-white/60 cursor-pointer ${i < 3
                  ? "hover:shadow-[0_0_30px_rgba(90,31,37,0.6),0_0_60px_rgba(109,41,50,0.3)]"
                  : "hover:shadow-[0_0_25px_rgba(255,255,255,0.5),0_0_50px_rgba(255,255,255,0.2)]"
                  }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <Image src={f.image} alt={f.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
                <div className="relative z-10 p-7 w-full">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg mb-1 tracking-tight">{f.name}</h3>
                      {f.full && <p className="text-sm text-white/70 font-medium drop-shadow mb-2">{f.full}</p>}
                      <p className="text-xs text-white/50">{f.desc}</p>
                    </div>
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/25 group-hover:border-white/40 transition-all duration-300">
                      <IconArrowRight size={18} className="text-white group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            ))}
          </div>
        </main>

        {/* ===================== MODAL: PILIH RUANGAN ===================== */}
        {isModalOpen && selectedFaculty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-all duration-300 animate-fade-in"
            onClick={() => setIsModalOpen(false)}>
            <div className="relative w-full max-w-4xl bg-zinc-950/90 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto transition-transform duration-300 scale-100 animate-scale-in"
              onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/25 hover:border-white/30 text-white/80 hover:text-white transition-all cursor-pointer z-50">
                <IconX size={20} />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-[#6D2932] to-[#a04050] text-white">
                    <IconSchool size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                    Pilih Ruangan — {selectedFaculty.name}
                  </h2>
                </div>
                <p className="text-zinc-400 text-sm md:text-base max-w-2xl">
                  Klik ruangan yang ingin Anda booking, lalu isi form pemesanan.
                </p>
              </div>

              {/* Room Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {dataRuangan[selectedFaculty.dataKey]?.map((room, idx) => (
                  <button
                    key={room.value}
                    onClick={() => handleSelectRoom(room)}
                    className="animate-fade-in-up text-left relative overflow-hidden rounded-xl p-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer group"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-bold text-sm text-[#c8b89a] group-hover:bg-[#6D2932]/30 group-hover:border-[#a04050]/50 transition-all">
                        {idx + 1}
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-bold text-sm text-white truncate">{room.label}</h4>
                        <p className="text-[10px] text-zinc-500 mt-0.5">Tersedia untuk booking</p>
                      </div>
                      <IconArrowRight size={14} className="text-zinc-600 group-hover:text-[#c8b89a] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Info */}
              <div className="mt-6 bg-[#6D2932]/20 border border-[#a04050]/30 rounded-2xl p-4">
                <h5 className="font-bold text-sm text-[#c8b89a]">Tips Booking</h5>
                <p className="text-xs text-zinc-300 mt-0.5">Pilih ruangan yang sesuai dengan kebutuhan Anda. Pastikan janggal waktu yang dipilih belum terisi.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ===================== STEP 3: FORM BOOKING =====================
  return (
    <div className="animate-fade-in min-h-screen font-sans py-12 px-4 sm:px-6 lg:px-8 text-zinc-900 relative">
      <main>
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <button onClick={() => { setStep("fakultas"); setSelectedRuangan(null); setErrors({}); }}
            className="animate-fade-in-up animate-stagger-1 inline-flex items-center gap-1 text-sm font-medium text-[#561c24] hover:text-white mb-8 transition-colors">
            <IconArrowLeft size={16} /> Pilih Ruangan Lain
          </button>

          {/* Header */}
          <div className="animate-fade-in-up animate-stagger-2 flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#561C24] rounded-xl text-[#E8D8C4] animate-scale-in animate-stagger-2">
                <IconCalendarPlus size={28} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#561c24]">Formulir Booking</h1>
                <p className="text-[#561C24] text-sm">
                  {selectedRuangan?.label} &bull; {selectedFaculty?.full}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex animate-slide-in-left animate-stagger-3 items-center gap-2 px-4 py-2 bg-[#561C24] rounded-xl">
              <div className="w-8 h-8 bg-[#E8D8C4] rounded-full flex items-center justify-center text-[#561C24] font-bold text-sm">
                {user.nama.charAt(0).toUpperCase()}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-white">{user.nama}</p>
                <p className="text-[#E8D8C4] text-xs">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Selected room info */}
          <div className="animate-fade-in-up animate-stagger-3 bg-[#561C24]/10 border border-[#561C24]/20 rounded-xl p-4 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#561C24] flex items-center justify-center text-[#E8D8C4] font-bold text-sm">
              {selectedFaculty?.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-[#561C24] text-sm">{selectedRuangan?.label}</p>
              <p className="text-xs text-[#6D2932]/70">{selectedFaculty?.full}</p>
            </div>
          </div>

          {/* Form */}
          <div className="animate-fade-in-up animate-stagger-4 bg-[#E8D8C4] rounded-2xl shadow-lg overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              {errors.ruangan && (
                <div className="p-3 bg-rose-100 border border-rose-300 rounded-xl text-sm text-rose-700 animate-shake">{errors.ruangan}</div>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#561C24] mb-2">Nama Pemesan</label>
                  <input
                    type="text"
                    name="nama"
                    value={user?.nama ?? ""}
                    readOnly
                  />
                  {errors.nama && <p className="mt-1.5 text-xs text-rose-600">{errors.nama}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#561C24] mb-2">
                    <span className="flex items-center gap-1.5"><IconId size={14} />NIM Pemesan</span>
                  </label>
                  <input type="text" name="nim" value={formData.nim} onChange={handleChange} placeholder="Nomor Induk Mahasiswa"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.nim ? 'border-rose-500 focus:ring-rose-500' : 'border-[#C7B7A3] focus:ring-[#6D2932]'} bg-white text-[#561C24] placeholder-[#6D2932]/50 text-sm focus:outline-none focus:ring-2 transition-all duration-200 hover:border-[#6D2932]`} />
                  {errors.nim && <p className="mt-1.5 text-xs text-rose-600">{errors.nim}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#561C24] mb-2">
                    <span className="flex items-center gap-1.5"><IconPhone size={14} />Nomor Telepon Aktif</span>
                  </label>
                  <input type="tel" name="telepon" value={formData.telepon} onChange={handleChange} placeholder="08xxxxxxxxxx"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.telepon ? 'border-rose-500 focus:ring-rose-500' : 'border-[#C7B7A3] focus:ring-[#6D2932]'} bg-white text-[#561C24] placeholder-[#6D2932]/50 text-sm focus:outline-none focus:ring-2 transition-all duration-200 hover:border-[#6D2932]`} />
                  {errors.telepon && <p className="mt-1.5 text-xs text-rose-600">{errors.telepon}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#561C24] mb-2">Tanggal Booking</label>
                  <input type="date" name="tanggal" value={formData.tanggal} onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.tanggal ? 'border-rose-500 focus:ring-rose-500' : 'border-[#C7B7A3] focus:ring-[#6D2932]'} bg-white text-[#561C24] text-sm focus:outline-none focus:ring-2 transition-all duration-200 hover:border-[#6D2932]`} />
                  {errors.tanggal && <p className="mt-1.5 text-xs text-rose-600">{errors.tanggal}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#561C24] mb-2">Jam Mulai</label>
                    <input type="time" name="waktu_mulai" value={formData.waktu_mulai} onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.waktu_mulai ? 'border-rose-500 focus:ring-rose-500' : 'border-[#C7B7A3] focus:ring-[#6D2932]'} bg-white text-[#561C24] text-sm focus:outline-none focus:ring-2 transition-all duration-200 hover:border-[#6D2932]`} />
                    {errors.waktu_mulai && <p className="mt-1.5 text-xs text-rose-600">{errors.waktu_mulai}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#561C24] mb-2">Jam Selesai</label>
                    <input type="time" name="waktu_selesai" value={formData.waktu_selesai} onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.waktu_selesai ? 'border-rose-500 focus:ring-rose-500' : 'border-[#C7B7A3] focus:ring-[#6D2932]'} bg-white text-[#561C24] text-sm focus:outline-none focus:ring-2 transition-all duration-200 hover:border-[#6D2932]`} />
                    {errors.waktu_selesai && <p className="mt-1.5 text-xs text-rose-600">{errors.waktu_selesai}</p>}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#561C24] mb-2">Keperluan / Catatan</label>
                <textarea name="keperluan" value={formData.keperluan} onChange={handleChange} rows={4}
                  placeholder="Jelaskan secara singkat agenda penggunaan ruangan..."
                  className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] placeholder-[#6D2932]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all duration-200 hover:border-[#6D2932] resize-none"></textarea>
              </div>
              <AnggotaForm anggota={formData.anggota} onChange={(anggota) => setFormData({ ...formData, anggota })} errors={errors} />
              <div className="flex justify-end gap-3 pt-4 border-t border-[#C7B7A3]">
                <button type="button" onClick={() => { setStep("fakultas"); setSelectedRuangan(null); setErrors({}); }}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#6D2932] hover:bg-[#C7B7A3]/80 transition-all duration-200">Batal</button>
                <button type="submit" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6D2932] hover:bg-[#561C24] text-white rounded-xl text-sm font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                  <IconCalendarPlus size={16} />Ajukan Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
