import { z } from "zod";

export const anggotaSchema = z.object({
  nama: z.string().min(3, "Nama anggota minimal 3 karakter"),
  nim: z.string().min(5, "NIM minimal 5 karakter").max(20, "NIM maksimal 20 karakter"),
});

export const bookingSchema = z.object({
  nama: z.string().min(3, "Nama harus minimal 3 karakter"),
  nim: z.string().min(5, "NIM harus minimal 5 karakter").max(20, "NIM maksimal 20 karakter"),
  telepon: z.string().min(10, "Nomor telepon minimal 10 digit").max(15, "Nomor telepon maksimal 15 digit").regex(/^[0-9]+$/, "Nomor telepon hanya boleh angka"),
  fakultas: z.string().min(1, "Pilih fakultas"),
  ruangan: z.string().min(1, "Pilih ruangan"),
  tanggal: z.string().min(1, "Tanggal harus diisi"),
  waktu_mulai: z.string().min(1, "Jam mulai harus diisi"),
  waktu_selesai: z.string().min(1, "Jam selesai harus diisi"),
  keperluan: z.string().optional(),
  anggota: z.array(anggotaSchema).optional(),
}).refine((data) => {
  if (data.waktu_mulai && data.waktu_selesai) {
    return data.waktu_selesai > data.waktu_mulai;
  }
  return true;
}, {
  message: "Jam selesai harus setelah jam mulai",
  path: ["waktu_selesai"],
});
