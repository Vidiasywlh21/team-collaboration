import { z } from "zod";

export const bookingSchema = z.object({
  nama: z
    .string()
    .min(1, "Nama pemesan wajib diisi")
    .min(3, "Nama minimal 3 karakter"),
  tanggal: z.string().min(1, "Tanggal booking wajib diisi"),
  waktu_mulai: z.string().min(1, "Jam mulai wajib diisi"),
  waktu_selesai: z.string().min(1, "Jam selesai wajib diisi"),
  ruangan: z.string().min(1, "Ruangan wajib dipilih"),
  keperluan: z.string().optional(),
});
