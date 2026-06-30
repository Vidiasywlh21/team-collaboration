"use client";

import { useState } from "react";
import { IconPlus, IconTrash, IconUsers } from "@tabler/icons-react";

interface Anggota {
  nama: string;
  nim: string;
}

interface AnggotaFormProps {
  anggota: Anggota[];
  onChange: (anggota: Anggota[]) => void;
  errors?: Record<string, string>;
}

export default function AnggotaForm({ anggota, onChange, errors }: AnggotaFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddAnggota = () => {
    onChange([...anggota, { nama: "", nim: "" }]);
    setIsExpanded(true);
  };

  const handleRemoveAnggota = (index: number) => {
    const newAnggota = anggota.filter((_, i) => i !== index);
    onChange(newAnggota);
    if (newAnggota.length === 0) {
      setIsExpanded(false);
    }
  };

  const handleChangeAnggota = (index: number, field: "nama" | "nim", value: string) => {
    const newAnggota = [...anggota];
    newAnggota[index][field] = value;
    onChange(newAnggota);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconUsers size={20} className="text-zinc-500 dark:text-zinc-400" />
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Anggota Kelompok (Opsional)
          </label>
        </div>
        {!isExpanded && anggota.length === 0 && (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Tambah anggota?
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-xl p-4 space-y-4 border border-zinc-200 dark:border-zinc-700">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Jika Anda memesan ruangan untuk kelompok, tambahkan nama dan NIM anggota kelompok agar mereka juga mendapat notifikasi status booking.
          </p>

          {anggota.map((member, index) => (
            <div key={index} className="bg-white dark:bg-zinc-900 rounded-lg p-4 space-y-3 border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  Anggota {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveAnggota(index)}
                  className="text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition-colors"
                  title="Hapus anggota"
                >
                  <IconTrash size={16} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={member.nama}
                    onChange={(e) => handleChangeAnggota(index, "nama", e.target.value)}
                    placeholder="Nama anggota"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                    NIM
                  </label>
                  <input
                    type="text"
                    value={member.nim}
                    onChange={(e) => handleChangeAnggota(index, "nim", e.target.value)}
                    placeholder="Nomor Induk Mahasiswa"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddAnggota}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all"
          >
            <IconPlus size={16} />
            Tambah Anggota
          </button>
        </div>
      )}
    </div>
  );
}
