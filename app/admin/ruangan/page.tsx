"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth-context";
import { useRouter } from "next/navigation";
import AdminSidebar from "../../components/AdminSidebar";
import { getRooms, saveRoom, deleteRoom, generateRoomId, Room } from "../../lib/admin-store";
import { IconPlus, IconEdit, IconTrash, IconDoor, IconX } from "@tabler/icons-react";

const fakultasOptions = [
  { value: "fakultas_ilmu_komputer", label: "Fakultas Ilmu Komputer" },
  { value: "fakultas_humaniora_kesehatan", label: "Fakultas Humaniora dan Kesehatan" },
  { value: "fakultas_ekonomi_bisnis", label: "Fakultas Ekonomi dan Bisnis" },
  { value: "fakultas_teknik", label: "Fakultas Teknik" },
  { value: "lainnya", label: "Lainnya" },
];

export default function ManajemenRuangan() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState({
    value: "",
    label: "",
    fakultas: "",
    kapasitas: "",
    fasilitas: "",
  });

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/admin/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user?.role === "admin") {
      loadRooms();
    }
  }, [user]);

  const loadRooms = () => {
    const allRooms = getRooms();
    setRooms(allRooms);
  };

  const handleOpenModal = (room?: Room) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        value: room.value,
        label: room.label,
        fakultas: room.fakultas,
        kapasitas: room.kapasitas?.toString() || "",
        fasilitas: room.fasilitas?.join(", ") || "",
      });
    } else {
      setEditingRoom(null);
      setFormData({
        value: "",
        label: "",
        fakultas: "",
        kapasitas: "",
        fasilitas: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRoom(null);
    setFormData({
      value: "",
      label: "",
      fakultas: "",
      kapasitas: "",
      fasilitas: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const room: Room = {
      id: editingRoom?.id || generateRoomId(),
      value: formData.value,
      label: formData.label,
      fakultas: formData.fakultas,
      kapasitas: formData.kapasitas ? parseInt(formData.kapasitas) : undefined,
      fasilitas: formData.fasilitas ? formData.fasilitas.split(",").map((f) => f.trim()) : undefined,
      created_at: editingRoom?.created_at || new Date().toISOString(),
    };

    saveRoom(room);
    loadRooms();
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus ruangan ini?")) {
      deleteRoom(id);
      loadRooms();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Manajemen Ruangan</h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1">Kelola data ruangan yang tersedia</p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <IconPlus size={18} />
              Tambah Ruangan
            </button>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-800">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Nama Ruangan</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Fakultas</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Kapasitas</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Fasilitas</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-zinc-500 dark:text-zinc-400 text-sm">
                        Belum ada data ruangan. Klik "Tambah Ruangan" untuk menambah data.
                      </td>
                    </tr>
                  ) : (
                    rooms.map((room) => (
                      <tr key={room.id} className="border-t border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                        <td className="py-4 px-6 text-sm font-medium text-zinc-900 dark:text-zinc-100">{room.label}</td>
                        <td className="py-4 px-6 text-sm text-zinc-600 dark:text-zinc-400">
                          {fakultasOptions.find((f) => f.value === room.fakultas)?.label || room.fakultas}
                        </td>
                        <td className="py-4 px-6 text-sm text-zinc-600 dark:text-zinc-400">
                          {room.kapasitas ? `${room.kapasitas} orang` : "-"}
                        </td>
                        <td className="py-4 px-6 text-sm text-zinc-600 dark:text-zinc-400">
                          {room.fasilitas && room.fasilitas.length > 0 ? room.fasilitas.join(", ") : "-"}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleOpenModal(room)}
                              className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition-all"
                              title="Edit"
                            >
                              <IconEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(room.id)}
                              className="p-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all"
                              title="Hapus"
                            >
                              <IconTrash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg">
                    <IconDoor size={24} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {editingRoom ? "Edit Ruangan" : "Tambah Ruangan"}
                  </h2>
                </div>
                <button onClick={handleCloseModal} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all">
                  <IconX size={20} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Nama Ruangan</label>
                  <input
                    type="text"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="Contoh: Ruang 301"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Kode Ruangan</label>
                  <input
                    type="text"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder="Contoh: ruang_301"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Fakultas</label>
                  <select
                    value={formData.fakultas}
                    onChange={(e) => setFormData({ ...formData, fakultas: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                    required
                  >
                    <option value="">-- Pilih Fakultas --</option>
                    {fakultasOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Kapasitas (Opsional)</label>
                  <input
                    type="number"
                    value={formData.kapasitas}
                    onChange={(e) => setFormData({ ...formData, kapasitas: e.target.value })}
                    placeholder="Jumlah orang"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Fasilitas (Opsional)</label>
                <input
                  type="text"
                  value={formData.fasilitas}
                  onChange={(e) => setFormData({ ...formData, fasilitas: e.target.value })}
                  placeholder="Contoh: Proyektor, AC, Whiteboard (pisahkan dengan koma)"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                >
                  {editingRoom ? "Simpan Perubahan" : "Tambah Ruangan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
