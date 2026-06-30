"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  IconChevronLeft,
  IconBook2,
  IconUsers,
  IconBuilding,
} from "@tabler/icons-react";

type RoomType = "ruang" | "ruangkelas" | "lab" | "laboratorium" | "perpustakaan" | "cowork" | "lobby" | "admin" | "dekan" | "rektorat" | "kaprodi" | "wakilrektor" | "prodi" | "fasilitas" | "pejabatstruktural";

interface Room {
  name: string;
  type: RoomType;
  gridArea?: string;
}

const floorRooms: Record<string, Record<number, Room[]>> = {
  fikom: {
    1: [],
    2: [],
    3: [
      { name: "Ruang Kelas 302 Smart Class", type: "ruangkelas", gridArea: "1 / 1 / 2 / 2" },
      { name: "Ruang Robotika", type: "ruangkelas", gridArea: "1 / 2 / 2 / 3" },
      { name: "Ruang Kelas 304", type: "ruangkelas", gridArea: "2 / 1 / 3 / 2" },
      { name: "Ruang Kelas 306", type: "ruangkelas", gridArea: "2 / 2 / 3 / 3" },
      { name: "Ruang Kelas 308", type: "ruangkelas", gridArea: "3 / 1 / 4 / 2" },
      { name: "Toilet Wanita", type: "fasilitas", gridArea: "3 / 2 / 4 / 3" },
      { name: "Lab Multimedia", type: "laboratorium", gridArea: "1 / 3 / 2 / 4" },
      { name: "Lab Manajemen", type: "laboratorium", gridArea: "1 / 4 / 2 / 5" },
      { name: "Lab Jaringan", type: "laboratorium", gridArea: "2 / 3 / 3 / 4" },
      { name: "Ruang Kelas 301", type: "ruangkelas", gridArea: "2 / 4 / 3 / 5" },
      { name: "Ruang Kelas 305", type: "ruangkelas", gridArea: "3 / 3 / 4 / 4" },
      { name: "Toilet Pria", type: "fasilitas", gridArea: "3 / 4 / 4 / 5" },
    ],
    4: [
      { name: "Perpustakaan", type: "perpustakaan", gridArea: "1 / 1 / 2 / 3" },
      { name: "Ruang PSI", type: "pejabatstruktural", gridArea: "1 / 3 / 2 / 4" },
      { name: "Ruang LPPM", type: "pejabatstruktural", gridArea: "1 / 4 / 2 / 5" },
      { name: "Ruang Dir Executive", type: "pejabatstruktural", gridArea: "2 / 1 / 3 / 2" },
      { name: "Ruang HRD", type: "pejabatstruktural", gridArea: "2 / 2 / 3 / 3" },
      { name: "Ruang Marketing", type: "pejabatstruktural", gridArea: "2 / 3 / 3 / 5" },
    ],
  },
  feb: {
    1: [
      { name: "Dekan FEB", type: "pejabatstruktural", gridArea: "1 / 1 / 2 / 2" },
      { name: "Prodi S1 Akuntansi", type: "prodi", gridArea: "1 / 2 / 2 / 3" },
      { name: "Prodi S1 Manajemen", type: "prodi", gridArea: "1 / 3 / 2 / 4" },
      { name: "BAAK FEB", type: "admin", gridArea: "1 / 4 / 2 / 5" },
      { name: "GPMF", type: "pejabatstruktural", gridArea: "2 / 1 / 3 / 2" },
      { name: "Toilet", type: "fasilitas", gridArea: "2 / 2 / 3 / 3" },
    ],
    2: [
      { name: "Ruang C.201", type: "ruangkelas" },
      { name: "Ruang C.202", type: "ruangkelas" },
      { name: "Ruang C.203", type: "ruangkelas" },
      { name: "Toilet", type: "fasilitas" },
    ],
  },
  "humaniora-kesehatan": {
    1: [
      { name: "Ruang Sidang Dekanat", type: "pejabatstruktural", gridArea: "1 / 1 / 2 / 2" },
      { name: "Ruang Prodi Hukum", type: "prodi", gridArea: "1 / 2 / 2 / 3" },
      { name: "Ruang Fakultas FHK", type: "pejabatstruktural", gridArea: "1 / 3 / 2 / 4" },
      { name: "Ruang Prodi Farma", type: "prodi", gridArea: "1 / 4 / 2 / 5" },
      { name: "Ruang Peradilan Semu", type: "lab", gridArea: "2 / 1 / 3 / 2" },
      { name: "Ruang Lab Farmatologi", type: "lab", gridArea: "2 / 2 / 3 / 3" },
      { name: "Lab Kimia", type: "lab", gridArea: "2 / 3 / 3 / 4" },
      { name: "Toilet Wanita", type: "fasilitas", gridArea: "2 / 4 / 3 / 5" },
      { name: "Toilet Pria", type: "fasilitas", gridArea: "3 / 1 / 4 / 2" },
    ],
    2: [
      { name: "Ruang Kelas 201", type: "ruangkelas" },
      { name: "Ruang Kelas 202", type: "ruangkelas" },
      { name: "Ruang Kelas 203", type: "ruangkelas" },
      { name: "Ruang Kelas 204", type: "ruangkelas" },
      { name: "Ruang Kelas 205", type: "ruangkelas" },
      { name: "Ruang Kelas 206", type: "ruangkelas" },
      { name: "Ruang Kelas 207", type: "ruangkelas" },
      { name: "Ruang Kelas 208", type: "ruangkelas" },
      { name: "Toilet", type: "fasilitas" },
    ],
  },
  teknik: {
    1: [
      { name: "Lab Teknik", type: "laboratorium" },
      { name: "Ruang DayCare", type: "fasilitas" },
      { name: "Ruang Server", type: "fasilitas" },
      { name: "Toilet Pria", type: "fasilitas" },
      { name: "Toilet Wanita", type: "fasilitas" },
      { name: "Prodi Teknik Industri", type: "prodi" },
      { name: "Prodi Teknik Sipil", type: "prodi" },
      { name: "Prodi Teknik Pangan dan Pertanian", type: "prodi" },
    ],
    2: [
      { name: "Ruang D201", type: "ruangkelas", gridArea: "1 / 1 / 2 / 2" },
      { name: "Ruang D202", type: "ruangkelas", gridArea: "1 / 2 / 2 / 3" },
      { name: "Toilet Wanita", type: "fasilitas", gridArea: "1 / 3 / 2 / 4" },
      { name: "Toilet Pria", type: "fasilitas", gridArea: "1 / 4 / 2 / 5" },
    ],
    3: [
      { name: "Ruang D301", type: "ruangkelas" },
      { name: "Ruang D302", type: "ruangkelas" },
      { name: "Toilet Pria", type: "fasilitas" },
      { name: "Toilet Wanita", type: "fasilitas" },
    ],
  },
};

const fikomFloorPlan = {
  rooms: [
    { name: "Lobby Utama", type: "fasilitas" as RoomType, gridArea: "1 / 1 / 2 / 3" },
    { name: "Rektorat", type: "pejabatstruktural" as RoomType, gridArea: "1 / 3 / 2 / 5" },
    { name: "Prodi S1 Informatika", type: "prodi" as RoomType, gridArea: "2 / 1 / 3 / 2" },
    { name: "Prodi S1 Sistem Informasi", type: "prodi" as RoomType, gridArea: "2 / 2 / 3 / 3" },
    { name: "Ruang Dekan", type: "pejabatstruktural" as RoomType, gridArea: "2 / 3 / 3 / 4" },
    { name: "Wakil Rektor 1", type: "pejabatstruktural" as RoomType, gridArea: "2 / 4 / 3 / 5" },
    { name: "Prodi S1 DKV", type: "prodi" as RoomType, gridArea: "3 / 1 / 4 / 2" },
    { name: "Prodi S1 Teknologi Informasi", type: "prodi" as RoomType, gridArea: "3 / 2 / 4 / 3" },
    { name: "Wakil Rektor 2", type: "pejabatstruktural" as RoomType, gridArea: "3 / 3 / 4 / 4" },
    { name: "Wakil Rektor 3", type: "pejabatstruktural" as RoomType, gridArea: "3 / 4 / 4 / 5" },
    { name: "BAAK", type: "admin" as RoomType, gridArea: "4 / 1 / 5 / 2" },
    { name: "Toilet", type: "fasilitas" as RoomType, gridArea: "4 / 2 / 5 / 3" },
    { name: "LPPM", type: "admin" as RoomType, gridArea: "4 / 3 / 5 / 4" },
    { name: "LPMPP", type: "admin" as RoomType, gridArea: "4 / 4 / 5 / 5" },
  ],
};

const fikomFloor2Plan = {
  rooms: [
    { name: "Ruang Executive", type: "fasilitas" as RoomType, gridArea: "1 / 1 / 2 / 3" },
    { name: "Lab A", type: "laboratorium" as RoomType, gridArea: "1 / 3 / 2 / 4" },
    { name: "Lab B", type: "laboratorium" as RoomType, gridArea: "1 / 4 / 2 / 5" },
    { name: "Lab C", type: "laboratorium" as RoomType, gridArea: "2 / 1 / 3 / 2" },
    { name: "Lab D", type: "laboratorium" as RoomType, gridArea: "2 / 2 / 3 / 3" },
    { name: "Ruang Kelas 201", type: "ruangkelas" as RoomType, gridArea: "2 / 3 / 3 / 4" },
    { name: "Ruang Kelas 202", type: "ruangkelas" as RoomType, gridArea: "2 / 4 / 3 / 5" },
    { name: "Ruang Kelas 203", type: "ruangkelas" as RoomType, gridArea: "3 / 1 / 4 / 2" },
    { name: "Ruang Kelas 204", type: "ruangkelas" as RoomType, gridArea: "3 / 2 / 4 / 3" },
    { name: "Toilet Pria", type: "fasilitas" as RoomType, gridArea: "3 / 3 / 4 / 4" },
    { name: "Toilet Wanita", type: "fasilitas" as RoomType, gridArea: "3 / 4 / 4 / 5" },
  ],
};

const getRoomStyle = (type: RoomType) => {
  switch (type) {
    case "ruang":
      return "bg-white/70 border-blue-400/50 text-blue-800 hover:bg-white/90 hover:border-blue-400";
    case "lab":
      return "bg-white/70 border-emerald-400/50 text-emerald-800 hover:bg-white/90 hover:border-emerald-400";
    case "perpustakaan":
      return "bg-white/70 border-purple-400/50 text-purple-800 hover:bg-white/90 hover:border-purple-400";
    case "cowork":
      return "bg-white/70 border-amber-400/50 text-amber-800 hover:bg-white/90 hover:border-amber-400";
    case "lobby":
      return "bg-white/70 border-rose-400/50 text-rose-800 hover:bg-white/90 hover:border-rose-400";
    case "admin":
      return "bg-white/70 border-sky-400/50 text-sky-800 hover:bg-white/90 hover:border-sky-400";
    case "dekan":
      return "bg-white/70 border-indigo-400/50 text-indigo-800 hover:bg-white/90 hover:border-indigo-400";
    case "rektorat":
      return "bg-white/70 border-red-400/50 text-red-800 hover:bg-white/90 hover:border-red-400";
    case "wakilrektor":
      return "bg-white/70 border-violet-400/50 text-violet-800 hover:bg-white/90 hover:border-violet-400";
    case "prodi":
      return "bg-white/70 border-cyan-400/50 text-cyan-800 hover:bg-white/90 hover:border-cyan-400";
    case "ruangkelas":
      return "bg-white/70 border-orange-400/50 text-orange-800 hover:bg-white/90 hover:border-orange-400";
    case "laboratorium":
      return "bg-white/70 border-teal-400/50 text-teal-800 hover:bg-white/90 hover:border-teal-400";
    case "fasilitas":
      return "bg-white/70 border-slate-400/50 text-slate-800 hover:bg-white/90 hover:border-slate-400";
    case "pejabatstruktural":
      return "bg-white/70 border-fuchsia-400/50 text-fuchsia-800 hover:bg-white/90 hover:border-fuchsia-400";
    default:
      return "bg-white/70 border-zinc-400/50 text-zinc-700 hover:bg-white/90 hover:border-zinc-400";
  }
};

const getRoomIcon = (type: RoomType, size: number = 24, name?: string) => {
  const nameOverrides: Record<string, string> = {
    "Lobby Utama": "/lobby.png",
    "Ruang Dekan": "/dekan.png",
    "Wakil Rektor 1": "/wakilRektor.png",
    "Wakil Rektor 2": "/wakilRektor.png",
    "Wakil Rektor 3": "/wakilRektor.png",
    "Rektorat": "/rektor2.png",
    "LPPM": "/LPPM.png",
    "LPMPP": "/LPMPP.png",
    "Toilet": "/toilet-.png",
    "Prodi S1 Informatika": "/Prodi.png",
    "Prodi S1 Sistem Informasi": "/Prodi.png",
    "Prodi S1 DKV": "/Prodi.png",
    "Prodi S1 Teknologi Informasi": "/Prodi.png",
    "Ruang Kelas 201": "/classroom (1).png",
    "Ruang Kelas 202": "/classroom (1).png",
    "Ruang Kelas 203": "/classroom (1).png",
    "Ruang Kelas 204": "/classroom (1).png",
    "Ruang Kelas 205": "/classroom (1).png",
    "Ruang Kelas 206": "/classroom (1).png",
    "Ruang Kelas 207": "/classroom (1).png",
    "Ruang Kelas 208": "/classroom (1).png",
    "Ruang Kelas 301": "/classroom (1).png",
    "Ruang Kelas 302": "/classroom (1).png",
    "Ruang Kelas 303": "/classroom (1).png",
    "Ruang Kelas 304": "/classroom (1).png",
    "Ruang Kelas 305": "/classroom (1).png",
    "Ruang Kelas 306": "/classroom (1).png",
    "Ruang Kelas 307": "/classroom (1).png",
    "Ruang Kelas 308": "/classroom (1).png",
    "Ruang Robotika": "/classroom (1).png",
    "Lab Multimedia": "/lab.png",
    "Lab Jaringan": "/lab.png",
    "Lab Manajemen": "/lab.png",
    "Ruang Executive": "/meeting.png",
    "Toilet Pria": "/male.png",
    "Toilet Wanita": "/female.png",
    "Perpustakaan": "/library.png",
    "Ruang PSI": "/Prodi.png",
    "Ruang LPPM": "/LPPM.png",
    "Ruang Dir Executive": "/Prodi.png",
    "Ruang HRD": "/man.png",
    "Ruang Marketing": "/Prodi.png",
    "Ruang C.201": "/classroom (1).png",
    "Ruang C.202": "/classroom (1).png",
    "Ruang C.203": "/classroom (1).png",
    "Ruang Prodi Hukum": "/Prodi.png",
    "Ruang Peradilan Semu": "/palu.png",
    "Ruang Prodi Farma": "/Prodi.png",
    "Ruang Lab Farmatologi": "/laboratory.png",
    "Lab Kimia": "/laboratory.png",
    "Ruang Fakultas FHK": "/Prodi.png",
    "Ruang Sidang Dekanat": "/Prodi.png",
    "Dekan FEB": "/dekan.png",
    "BAAK FEB": "/administrasi.png",
    "Prodi S1 Manajemen": "/Prodi.png",
    "GPMF": "/LPMPP.png",
    "Prodi S1 Akuntansi": "/Prodi.png",
    "Lab Teknik": "/teknik.png",
    "Ruang DayCare": "/kid.png",
    "Ruang Server": "/server.png",
    "Prodi Teknik Industri": "/Prodi.png",
    "Prodi Teknik Sipil": "/Prodi.png",
    "Prodi Teknik Pangan dan Pertanian": "/Prodi.png",
    "Ruang D201": "/classroom (1).png",
    "Ruang D202": "/classroom (1).png",
    "Ruang D301": "/classroom (1).png",
    "Ruang D302": "/classroom (1).png",
  };
  if (name && nameOverrides[name]) {
    return <img src={nameOverrides[name]} alt={name} width={size} height={size} className="object-contain" />;
  }
  const iconMap: Record<string, string> = {
    lobby: "/lobby.png",
    rektorat: "/rektor.png",
    dekan: "/dekan.png",
    admin: "/administrasi.png",
    lab: "/lab.png",
    laboratorium: "/lab.png",
    ruang: "/classroom (1).png",
    ruangkelas: "/classroom (1).png",
    fasilitas: "/female.png",
    pejabatstruktural: "/rektor.png",
    prodi: "/classroom (1).png",
  };
  if (iconMap[type]) {
    return <img src={iconMap[type]} alt={type} width={size} height={size} className="object-contain" />;
  }
  switch (type) {
    case "perpustakaan":
      return <IconBook2 size={size} />;
    case "cowork":
      return <IconUsers size={size} />;

    default:
      return <IconBuilding size={size} />;
  }
};

const fakultasNames: Record<string, { title: string; floors: number }> = {
  fikom: { title: "Fakultas Ilmu Komunikasi (FIKOM)", floors: 4 },
  feb: { title: "Fakultas Ekonomi & Bisnis (FEB)", floors: 2 },
  "humaniora-kesehatan": { title: "Fakultas Humaniora & Kesehatan", floors: 2 },
  teknik: { title: "Fakultas Teknik", floors: 3 },
};

function FakultasPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const fakultasSlug = (params.fakultas as string) || "fikom";
  const lantaiParam = searchParams.get("lantai") || "1";
  const currentFloor = parseInt(lantaiParam, 10) || 1;

  const fakultasInfo = fakultasNames[fakultasSlug] || { title: fakultasSlug.toUpperCase(), floors: 1 };
  const currentRooms = floorRooms[fakultasSlug]?.[currentFloor] || [];
  const isFloorPlan = ((currentFloor === 1 || currentFloor === 2 || currentFloor === 3 || currentFloor === 4) && fakultasSlug === "fikom") || (currentFloor === 1 && fakultasSlug === "humaniora-kesehatan") || (currentFloor === 1 && fakultasSlug === "feb") || ((currentFloor === 2) && fakultasSlug === "teknik");
  const fikomFloor3Plan = { rooms: floorRooms.fikom[3] };
  const fikomFloor4Plan = { rooms: floorRooms.fikom[4] };
  const humaniora1Plan = { rooms: floorRooms["humaniora-kesehatan"][1] };
  const febFloor1Plan = { rooms: floorRooms.feb[1] };
  const teknikFloor2Plan = { rooms: floorRooms.teknik[2] };
  const currentFloorPlan = fakultasSlug === "fikom" && currentFloor === 1 ? fikomFloorPlan : fakultasSlug === "fikom" && currentFloor === 2 ? fikomFloor2Plan : fakultasSlug === "fikom" && currentFloor === 3 ? fikomFloor3Plan : fakultasSlug === "fikom" && currentFloor === 4 ? fikomFloor4Plan : fakultasSlug === "humaniora-kesehatan" && currentFloor === 1 ? humaniora1Plan : fakultasSlug === "feb" && currentFloor === 1 ? febFloor1Plan : fakultasSlug === "teknik" && currentFloor === 2 ? teknikFloor2Plan : null;

  return (
    <div
      className="min-h-screen font-sans text-zinc-900 dark:text-zinc-100 flex flex-col justify-between relative"
      style={{
        background: "radial-gradient(circle at center, #561C24 0%, #6D2932 20%, #8a4a52 35%, #C7B7A3 55%, #E8D8C4 75%, transparent 100%)",
        backgroundColor: "#E8D8C4",
      }}
    >
      <div className="relative z-10 min-h-screen flex flex-col justify-between">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      <Navbar activePage="/tata-letak" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        <section className="mb-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-white/20 dark:border-zinc-800/50 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-row items-center justify-between gap-4 mb-4">
            <Link
              href="/tata-letak"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6D2932] dark:text-[#c8b89a] hover:underline"
            >
              <IconChevronLeft size={16} />
              Kembali ke Denah Fakultas
            </Link>

            {fakultasInfo.floors > 1 && (
              <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 px-2 font-bold uppercase tracking-wider">Lantai:</span>
                {Array.from({ length: fakultasInfo.floors }).map((_, idx) => {
                  const fNum = idx + 1;
                  const isActive = fNum === currentFloor;
                  return (
                    <button
                      key={fNum}
                      onClick={() => router.push(`/tata-letak/${fakultasSlug}?lantai=${fNum}`)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#6D2932] text-white shadow-md shadow-red-950/20"
                          : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {fNum}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
            {fakultasInfo.title}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm md:text-base">
            {isFloorPlan
              ? "Denah tata letak "
              : `Menampilkan ruangan dan fasilitas di `}
            <strong className="text-[#6D2932] dark:text-[#c8b89a]">Lantai {currentFloor}</strong>
          </p>
        </section>

        {isFloorPlan && currentFloorPlan ? (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6D2932] shadow-[0_0_8px_rgba(109,41,50,0.6)]"></span>
              Denah Lantai {currentFloor} - {fakultasSlug === "fikom" ? "FIKOM" : fakultasSlug === "feb" ? "FEB" : fakultasSlug === "humaniora-kesehatan" ? "Humaniora & Kesehatan" : fakultasSlug === "teknik" ? "Teknik" : ""}
            </h2>
            <div>
                <div className="grid grid-cols-4 grid-rows-4 gap-3" style={{ minHeight: fakultasSlug === "teknik" && currentFloor === 2 ? "120px" : "600px" }}>
                {currentFloorPlan.rooms.map((room, idx) => (
                  <div
                    key={idx}
                    className={`animate-fade-in-up rounded-xl border-2 p-6 flex flex-col items-center justify-center gap-3 ${getRoomStyle(room.type)}`}
                    style={{
                      gridArea: room.gridArea,
                      animationDelay: `${idx * 0.08}s`,
                    }}
                  >
                    {getRoomIcon(room.type, 64, room.name)}
                    <span className="text-lg font-bold text-center leading-snug">{room.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-xs">
                {currentFloor === 1 && fakultasSlug === "fikom" ? (
                  <>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-slate-500/40 border border-slate-500/60"></span>
                      <span className="text-zinc-500">Fasilitas</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-sky-500/40 border border-sky-500/60"></span>
                      <span className="text-zinc-500">Administrasi</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-fuchsia-500/40 border border-fuchsia-500/60"></span>
                      <span className="text-zinc-500">Pejabat Struktural</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-cyan-500/40 border border-cyan-500/60"></span>
                      <span className="text-zinc-500">Program Studi</span>
                    </div>
                  </>
                ) : currentFloor === 1 && fakultasSlug === "feb" ? (
                  <>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-cyan-500/40 border border-cyan-500/60"></span>
                      <span className="text-zinc-500">Program Studi</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-fuchsia-500/40 border border-fuchsia-500/60"></span>
                      <span className="text-zinc-500">Pejabat Struktural</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-slate-500/40 border border-slate-500/60"></span>
                      <span className="text-zinc-500">Fasilitas</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-sky-500/40 border border-sky-500/60"></span>
                      <span className="text-zinc-500">Administrasi</span>
                    </div>
                  </>
                ) : currentFloor === 1 && fakultasSlug === "humaniora-kesehatan" ? (
                  <>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-500/60"></span>
                      <span className="text-zinc-500">Laboratorium</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-cyan-500/40 border border-cyan-500/60"></span>
                      <span className="text-zinc-500">Program Studi</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-fuchsia-500/40 border border-fuchsia-500/60"></span>
                      <span className="text-zinc-500">Pejabat Struktural</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-slate-500/40 border border-slate-500/60"></span>
                      <span className="text-zinc-500">Fasilitas</span>
                    </div>
                  </>
                ) : currentFloor === 2 ? (
                  <>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-slate-500/40 border border-slate-500/60"></span>
                      <span className="text-zinc-500">Fasilitas</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-teal-500/40 border border-teal-500/60"></span>
                      <span className="text-zinc-500">Laboratorium</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-orange-500/40 border border-orange-500/60"></span>
                      <span className="text-zinc-500">Ruang Kelas</span>
                    </div>
                  </>
                ) : currentFloor === 3 ? (
                  <>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-orange-500/40 border border-orange-500/60"></span>
                      <span className="text-zinc-500">Ruang Kelas</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-teal-500/40 border border-teal-500/60"></span>
                      <span className="text-zinc-500">Laboratorium</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-slate-500/40 border border-slate-500/60"></span>
                      <span className="text-zinc-500">Fasilitas</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-purple-500/40 border border-purple-500/60"></span>
                      <span className="text-zinc-500">Perpustakaan</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-fuchsia-500/40 border border-fuchsia-500/60"></span>
                      <span className="text-zinc-500">Pejabat Struktural</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        ) : currentRooms.length > 0 ? (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
              Ruangan & Fasilitas - Lantai {currentFloor}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {currentRooms.map((room, idx) => (
                <div
                  key={idx}
                  className={`animate-fade-in-up relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 ${getRoomStyle(room.type)}`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {getRoomIcon(room.type, 48, room.name)}
                  <span className="text-base font-bold tracking-tight text-center mt-2">
                    {room.name}
                  </span>
                </div>
              ))}
            </div>
            {fakultasSlug === "humaniora-kesehatan" && currentFloor === 1 ? (
              <div className="mt-6 flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-teal-500/40 border border-teal-500/60"></span>
                  <span className="text-zinc-500">Laboratorium</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-fuchsia-500/40 border border-fuchsia-500/60"></span>
                  <span className="text-zinc-500">Pejabat Struktural</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-500/40 border border-slate-500/60"></span>
                  <span className="text-zinc-500">Fasilitas</span>
                </div>
              </div>
            ) : fakultasSlug === "humaniora-kesehatan" && currentFloor === 2 ? (
              <div className="mt-6 flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-orange-500/40 border border-orange-500/60"></span>
                  <span className="text-zinc-500">Ruang Kelas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-500/40 border border-slate-500/60"></span>
                  <span className="text-zinc-500">Fasilitas</span>
                </div>
              </div>
            ) : fakultasSlug === "feb" && currentFloor === 2 ? (
              <div className="mt-6 flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-orange-500/40 border border-orange-500/60"></span>
                  <span className="text-zinc-500">Ruang Kelas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-500/40 border border-slate-500/60"></span>
                  <span className="text-zinc-500">Fasilitas</span>
                </div>
              </div>
            ) : fakultasSlug === "teknik" && currentFloor === 1 ? (
              <div className="mt-2 flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-500/40 border border-slate-500/60"></span>
                  <span className="text-zinc-500">Fasilitas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-cyan-500/40 border border-cyan-500/60"></span>
                  <span className="text-zinc-500">Program Studi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-teal-500/40 border border-teal-500/60"></span>
                  <span className="text-zinc-500">Laboratorium</span>
                </div>
              </div>
            ) : fakultasSlug === "teknik" && currentFloor === 2 ? (
              <div className="mt-3 flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-orange-500/40 border border-orange-500/60"></span>
                  <span className="text-zinc-500">Ruang Kelas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-500/40 border border-slate-500/60"></span>
                  <span className="text-zinc-500">Fasilitas</span>
                </div>
              </div>
            ) : fakultasSlug === "teknik" && currentFloor === 3 ? (
              <div className="mt-3 flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-orange-500/40 border border-orange-500/60"></span>
                  <span className="text-zinc-500">Ruang Kelas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-500/40 border border-slate-500/60"></span>
                  <span className="text-zinc-500">Fasilitas</span>
                </div>
              </div>
            ) : null}
          </section>
        ) : (
          <section className="mb-8">
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-white/20 dark:border-zinc-800/50 rounded-3xl p-12 text-center">
              <IconBuilding size={48} className="mx-auto mb-4 text-zinc-400" />
              <p className="text-zinc-500">Denah untuk lantai ini belum tersedia.</p>
            </div>
          </section>
        )}
      </main>
      <Footer />
      </div>
    </div>
  );
}

export default function FakultasPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center text-zinc-500 gap-3">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin"></div>
          <p className="text-sm font-bold">Memuat Denah Lantai...</p>
        </div>
      }
    >
      <FakultasPageContent />
    </Suspense>
  );
}
