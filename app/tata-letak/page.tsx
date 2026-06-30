"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IconArrowRight, IconX, IconArmchair, IconSchool, IconRadio } from "@tabler/icons-react";

const faculties = [
  { slug: "fikom", name: "FIKOM", full: "Fakultas Ilmu Komuputer", image: "/FIKOM.jpeg", desc: "Informatika, Sistem Informasi, dan Teknologi Informasi" },
  { slug: "feb", name: "FEB", full: "Fakultas Ekonomi & Bisnis", image: "/feb2.png", desc: "Manajemen dan Akuntasi" },
  { slug: "humaniora-kesehatan", name: "Humaniora & Kesehatan", full: "Fakultas Humaniora & Kesehatan", image: "/chengho.jpg", desc: "Farmasi, Hukum, dan PGPAUD" },
  { slug: "teknik", name: "Teknik", full: "Fakultas Teknik", image: "/Teknik.jpeg", desc: "Teknik Pangan dan Pertanian, Teknik Sipil, dan Teknik Industri " },
  { slug: "lainnya", name: "Lainnya", full: "Area Bersama & Rekreasi", image: "/domain.webp", desc: "Fasilitas belajar mandiri & hiburan umum" },
];

const floorConfig: Record<string, { floors: number; descriptions: string[] }> = {
  fikom: {
    floors: 4,
    descriptions: [
      "Lantai 1: Lobby, BAAK, Rektorat, Wakil Rektor 1-3, dan Toilet",
      "Lantai 2: Ruang Executive, R.201, R.202, R.203, R.204, Lab A, Lab B, Lab C, Lab D, dan Toilet",
      "Lantai 3: R.Robotika, R. 301, R. 302 Smart Class, R.303, R.304, R.305, R.306, R.308, Lab Jaringan, Lab Multimedia, Lab Manajemen, dan Toilet",
      "Lantai 4: Perpustakaan, R.PSI, R.LPPM, R.Dir Executive, R.HRD, dan R.Marketing"
    ]
  },
  feb: {
    floors: 2,
    descriptions: [
      "Lantai 1: Dekan FEB, Prodi S1 Akuntansi, Prodi S1 Manajemen, BAAK, GPMF, dan Toilet",
      "Lantai 2: Ruang C.201, Ruang C.202, Ruang C.203, dan Toilet"
    ]
  },
  "humaniora-kesehatan": {
    floors: 2,
    descriptions: [
      "Lantai 1: R.Sidang Dekanat, R.Prodi Hukum, R.Peradilan Semu, R.Prodi Farma, R. Fakultas FHK, Lab Farmatologi, Lab Kimia, dan Toilet ",
      "Lantai 2: R.201, R.202, R.203, R.204, R.205, R.206, R.207, R.208, dan Toilet"
    ]
  },
  teknik: {
    floors: 3,
    descriptions: [
      "Lantai 1: Prodi Teknik Sipil, Prodi Teknik Industri, Prodi Teknik Industri, Prodi Teknik Pangan dan Pertanian, Lab.Teknik, R.DayCare, R.Server, ",
      "Lantai 2: R.D201, R.D202, Toilet Pria, dan Toilet Wanita",
      "Lantai 3: R.D301, R.D302, Toilet Pria, dan Toilet Wanita"
    ]
  }
};

export default function TataLetakPage() {
  const router = useRouter();
  const [selectedFaculty, setSelectedFaculty] = useState<typeof faculties[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCardClick = (faculty: typeof faculties[0]) => {
    setSelectedFaculty(faculty);
    setIsOpen(true);
  };

  const navigateToFloor = (slug: string, floor: number) => {
    router.push(`/tata-letak/${slug}?lantai=${floor}`);
  };

  const currentConfig = selectedFaculty ? floorConfig[selectedFaculty.slug] : null;

  return (
    <div
      className="min-h-screen font-sans text-zinc-900 dark:text-zinc-100 relative"
      style={{
        background: "linear-gradient(to bottom, #f8f3ec 0%, #f5efe6 10%, #ede4d4 20%, #e4d7c3 30%, #dccfb9 40%, #d4c4ac 48%, #c8b89a 50%, #b09078 53%, #9a7060 57%, #8a5a50 62%, #7a4040 68%, #6D2931 75%, #622530 82%, #5a1f25 88%, #511a20 94%, #4a1520 100%)",
      }}
    >
      {/* Inline styles for custom table tennis animations */}
      <style jsx global>{`
        @keyframes pingpong-ball {
          0% {
            left: 20px;
            top: 25%;
          }
          25% {
            top: 15%;
          }
          50% {
            left: calc(100% - 28px);
            top: 75%;
          }
          75% {
            top: 85%;
          }
          100% {
            left: 20px;
            top: 25%;
          }
        }

        @keyframes paddle-left {
          0%, 100% {
            top: 15%;
          }
          50% {
            top: 65%;
          }
        }

        @keyframes paddle-right {
          0%, 100% {
            top: 15%;
          }
          50% {
            top: 65%;
          }
        }

        @keyframes screen-glow {
          0%, 100% {
            box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
            opacity: 0.8;
          }
          50% {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.8);
            opacity: 1;
          }
        }

        @keyframes steam-rise {
          0%, 100% {
            transform: translateY(0) scaleX(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-5px) scaleX(1.3);
            opacity: 0.6;
          }
        }

        .animate-pingpong-ball {
          animation: pingpong-ball 2.4s infinite linear;
        }

        .animate-paddle-left {
          animation: paddle-left 2.4s infinite ease-in-out;
        }

        .animate-paddle-right {
          animation: paddle-right 2.4s infinite ease-in-out;
        }

        .animate-screen-glow {
          animation: screen-glow 2s infinite ease-in-out;
        }

        .animate-steam {
          animation: steam-rise 1.8s infinite ease-in-out;
        }
      `}</style>

      <Navbar activePage="/tata-letak" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-[#6D2932] via-[#a04050] to-[#c86070] bg-clip-text text-transparent">
              Denah Fakultas
            </span>
          </h1>
          <p className="text-zinc-600 max-w-lg mx-auto text-base leading-relaxed">
            Pilih fakultas untuk melihat denah tata letak ruangan, area kerja, dan fasilitas yang tersedia
          </p>
          <div className="flex justify-center mt-6">
            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-transparent via-[#6D2932]/40 to-transparent"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {faculties.map((f, i) => (
            <button
              key={f.slug}
              onClick={() => handleCardClick(f)}
              className={`group text-left relative overflow-hidden rounded-3xl min-h-[250px] flex flex-col justify-end transition-all duration-500 hover:-translate-y-2 border-2 border-white/20 hover:border-white/60 cursor-pointer ${
                i < 3
                  ? "hover:shadow-[0_0_30px_rgba(90,31,37,0.6),0_0_60px_rgba(109,41,50,0.3)]"
                  : "hover:shadow-[0_0_25px_rgba(255,255,255,0.5),0_0_50px_rgba(255,255,255,0.2)]"
              }`}
            >
              <Image
                src={f.image}
                alt={f.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
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

      {/* Modern, Glassmorphic Interactive Overlay Modal */}
      {isOpen && selectedFaculty && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-all duration-300 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-zinc-950/90 dark:bg-zinc-900/95 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto transition-transform duration-300 scale-100 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/25 hover:border-white/30 text-white/80 hover:text-white transition-all cursor-pointer z-50"
            >
              <IconX size={20} />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#6D2932] to-[#a04050] text-white">
                  <IconSchool size={24} />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  {selectedFaculty.name === "Lainnya" ? "Area Bersama & Rekreasi" : `Denah  ${selectedFaculty.name}`}
                </h2>
              </div>
              <p className="text-zinc-400 text-sm md:text-base max-w-2xl">
                {selectedFaculty.name === "Lainnya" 
                  ? "Fasilitas belajar mandiri & hiburan umum yang modern dengan ruang belajar terbuka, meja besar yang nyaman, serta area tenis meja untuk menyegarkan pikiran."
                  : `Pilih lantai yang ingin Anda jelajahi untuk melihat tata letak meja kerja, ruang meeting, dan ketersediaan fasilitas secara langsung.`}
              </p>
            </div>

            {/* Modal Content */}
            {selectedFaculty.slug !== "lainnya" && currentConfig ? (
              /* Floor Selection Cards for Faculties */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {Array.from({ length: currentConfig.floors }).map((_, idx) => {
                  const floorNum = idx + 1;
                  const desc = currentConfig.descriptions[idx] || `Denah dan tata letak fasilitas di Lantai ${floorNum}`;
                  return (
                    <button
                      key={floorNum}
                      onClick={() => navigateToFloor(selectedFaculty.slug, floorNum)}
                      className="text-left relative overflow-hidden rounded-2xl p-5 bg-white/5 border border-white/10 transition-all duration-300 cursor-pointer flex items-start gap-4"
                    >
                      <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-black text-xl text-[#c8b89a]">
                        {floorNum}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-extrabold text-lg text-white">
                          Lantai {floorNum}
                        </h4>
                        <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                      <div className="self-center flex-shrink-0 text-[#c8b89a]">
                        <IconArrowRight size={18} />
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Modern Visual Layout for "Lainnya" - Area Bersama & Rekreasi */
              <div className="mt-4 flex flex-col gap-5">
                {/* Hero Image */}
                <div className="relative w-full h-48 md:h-56 rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src="/domain-dalam.jpg"
                    alt="Area Bersama Domain"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-5 right-5">
                    <h4 className="text-lg font-extrabold text-white drop-shadow-lg">Area Bersama & Rekreasi</h4>
                    <p className="text-xs text-white/70 mt-1">Fasilitas belajar mandiri, studio kreatif, dan hiburan umum</p>
                  </div>
                </div>

                {/* 3 Zone Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Zone 1: Co-Working */}
                  <div className="flex flex-col border border-white/10 rounded-xl p-4 bg-white/5 hover:bg-white/8 transition-colors">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider mb-2 inline-block self-start">
                      Zone Belajar
                    </span>
                    <h4 className="text-sm font-bold mb-1">Co-Working Terbuka</h4>
                    <p className="text-[10px] text-zinc-400 leading-relaxed mb-3">
                      Meja kayu besar, kursi ergonomis, lampu baca & Wi-Fi kencang.
                    </p>
                    <div className="flex-1 bg-black/30 rounded-lg p-3 border border-white/5 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="relative flex-grow h-9 bg-amber-800/80 border border-amber-600 rounded flex items-center justify-center">
                          <span className="text-[7px] font-bold text-amber-100">Meja Kolaboratif</span>
                          <div className="absolute top-0.5 left-1.5 w-2.5 h-1.5 bg-sky-500/80 rounded-sm"></div>
                          <div className="absolute bottom-0.5 right-1.5 w-1.5 h-1.5 rounded-full bg-zinc-700 flex items-center justify-center">
                            <span className="text-[4px]">☕</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} className="w-4 h-4 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-[#6D2932] transition-colors cursor-pointer">
                              <IconArmchair size={8} className="text-zinc-500" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="relative flex-grow h-9 bg-zinc-800/80 border border-zinc-700 rounded flex items-center justify-center">
                          <span className="text-[7px] font-bold text-zinc-300">Stasiun Fokus</span>
                          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-4 h-2.5 bg-emerald-500/90 border border-emerald-300 rounded animate-screen-glow"></div>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: 2 }).map((_, idx) => (
                            <div key={idx} className="w-4 h-4 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-[#6D2932] transition-colors cursor-pointer">
                              <IconArmchair size={8} className="text-zinc-500" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-[7px] text-zinc-500 text-center mt-auto">5 Kursi Tersedia</div>
                    </div>
                  </div>

                  {/* Zone 2: Radio Room */}
                  <div className="flex flex-col border border-white/10 rounded-xl p-4 bg-white/5 hover:bg-white/8 transition-colors">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 uppercase tracking-wider mb-2 inline-block self-start">
                      Zone Kreatif
                    </span>
                    <h4 className="text-sm font-bold mb-1">Radio & Podcast Studio</h4>
                    <p className="text-[10px] text-zinc-400 leading-relaxed mb-3">
                      Studio kedap suara dengan peralatan rekaman profesional.
                    </p>
                    <div className="flex-1 bg-black/30 rounded-lg p-3 border border-white/5 flex flex-col gap-2">
                      <div className="relative bg-purple-900/40 border-2 border-purple-500/30 rounded-lg p-3 flex flex-col items-center justify-center">
                        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
                          <span className="text-[5px]">🎙️</span>
                        </div>
                        <IconRadio size={24} className="text-purple-400 mb-1" />
                        <span className="text-[7px] font-bold text-purple-300">Recording Booth</span>
                        <div className="flex gap-0.5 mt-2 items-end h-3">
                          {Array.from({ length: 8 }).map((_, idx) => {
                            const heights = [8, 5, 11, 7, 13, 6, 10, 9];
                            return (
                              <div 
                                key={idx} 
                                className="w-0.5 bg-purple-400 rounded-full animate-pulse"
                                style={{ 
                                  height: `${heights[idx]}px`,
                                  animationDelay: `${idx * 0.1}s`
                                }}
                              ></div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="flex-1 bg-zinc-800/60 border border-zinc-700 rounded p-1.5 flex items-center justify-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-[6px] text-zinc-400">Mixer</span>
                        </div>
                        <div className="flex-1 bg-zinc-800/60 border border-zinc-700 rounded p-1.5 flex items-center justify-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                          <span className="text-[6px] text-zinc-400">Headphone</span>
                        </div>
                      </div>
                      <div className="text-[7px] text-zinc-500 text-center mt-auto">Studio Tersedia</div>
                    </div>
                  </div>

                  {/* Zone 3: Table Tennis */}
                  <div className="flex flex-col border border-white/10 rounded-xl p-4 bg-white/5 hover:bg-white/8 transition-colors">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider mb-2 inline-block self-start">
                      Zone Rekreasi
                    </span>
                    <h4 className="text-sm font-bold mb-1">Tenis Meja</h4>
                    <p className="text-[10px] text-zinc-400 leading-relaxed mb-3">
                      Tanding ping pong seru. Bat & bola tersedia!
                    </p>
                    <div className="flex-1 relative bg-blue-900/40 border-2 border-blue-500/30 rounded-lg overflow-hidden">
                      <div className="absolute inset-2 bg-blue-700 border border-white/30 rounded"></div>
                      <div className="absolute top-2 bottom-2 left-1/2 w-[1px] bg-white/50 -translate-x-1/2"></div>
                      <div className="absolute left-1/2 -translate-x-1/2 top-1 bottom-1 w-[2px] bg-zinc-300 shadow z-10"></div>
                      <div className="absolute left-3 w-3 h-3 rounded-full bg-red-600 border border-red-800 animate-paddle-left z-20"></div>
                      <div className="absolute right-3 w-3 h-3 rounded-full bg-indigo-600 border border-indigo-800 animate-paddle-right z-20"></div>
                      <div className="absolute w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_6px_#f97316] animate-pingpong-ball z-30"></div>
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/60 px-1.5 py-0.5 rounded text-[6px] font-bold text-white">
                        LIVE
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-[#6D2932]/20 border border-[#a04050]/30 rounded-2xl p-4">
                  <h5 className="font-bold text-sm text-[#c8b89a]">Fasilitas Bebas Akses!</h5>
                  <p className="text-xs text-zinc-300 mt-0.5">Semua mahasiswa aktif dapat langsung menikmati fasilitas ini tanpa pendaftaran awal.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer variant="maroon" />
    </div>
  );
}
