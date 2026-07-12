"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth-context";
import { useRouter } from "next/navigation";
import { getRooms, saveRoom, deleteRoom, generateRoomId, Room } from "../../lib/admin-store";
import { IconPlus, IconEdit, IconTrash, IconDoor, IconX } from "@tabler/icons-react";

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

  useScrollReveal();

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E8D8C4]"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 animate-fade-in-up">
            <div>
              <h1 className="text-3xl font-bold text-[#561C24]">Manajemen Ruangan</h1>
              <p className="text-[#6D2932] mt-1">Kelola data ruangan yang tersedia</p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-[#6D2932] hover:bg-[#561C24] text-[#E8D8C4] px-6 py-3 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
              <IconPlus size={18} />
              Tambah Ruangan
            </button>
          </div>

          {/* Table */}
          <div className="scroll-reveal bg-[#E8D8C4]/80 backdrop-blur-sm rounded-xl border border-[#C7B7A3] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#C7B7A3]/50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">Nama Ruangan</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">Fakultas</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">Kapasitas</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">Fasilitas</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#6D2932]">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-[#6D2932] text-sm">
                        Belum ada data ruangan. Klik "Tambah Ruangan" untuk menambah data.
                      </td>
                    </tr>
                  ) : (
                    rooms.map((room) => (
                      <tr key={room.id} className="border-t border-[#C7B7A3]/50 hover:bg-[#C7B7A3]/30 transition-colors duration-200">
                        <td className="py-4 px-6 text-sm font-medium text-[#561C24]">{room.label}</td>
                        <td className="py-4 px-6 text-sm text-[#6D2932]">
                          {fakultasOptions.find((f) => f.value === room.fakultas)?.label || room.fakultas}
                        </td>
                        <td className="py-4 px-6 text-sm text-[#6D2932]">
                          {room.kapasitas ? `${room.kapasitas} orang` : "-"}
                        </td>
                        <td className="py-4 px-6 text-sm text-[#6D2932]">
                          {room.fasilitas && room.fasilitas.length > 0 ? room.fasilitas.join(", ") : "-"}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleOpenModal(room)}
                              className="p-2 text-[#6D2932] hover:bg-[#C7B7A3] rounded-lg transition-all"
                              title="Edit"
                            >
                              <IconEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(room.id)}
                              className="p-2 text-[#561C24] hover:bg-[#561C24]/20 rounded-lg transition-all"
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

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-modal-fade">
          <div className="bg-[#E8D8C4] rounded-2xl border border-[#C7B7A3] max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-scale">
            <div className="p-6 border-b border-[#C7B7A3]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#C7B7A3]/50 rounded-lg">
                    <IconDoor size={24} className="text-[#6D2932]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#561C24]">
                    {editingRoom ? "Edit Ruangan" : "Tambah Ruangan"}
                  </h2>
                </div>
                <button onClick={handleCloseModal} className="p-2 hover:bg-[#C7B7A3] rounded-lg transition-all">
                  <IconX size={20} className="text-[#6D2932]" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#6D2932] mb-2">Nama Ruangan</label>
                  <input
                    type="text"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="Contoh: Ruang 301"
                    className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#6D2932] mb-2">Kode Ruangan</label>
                  <input
                    type="text"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder="Contoh: ruang_301"
                    className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#6D2932] mb-2">Fakultas</label>
                  <select
                    value={formData.fakultas}
                    onChange={(e) => setFormData({ ...formData, fakultas: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all"
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
                  <label className="block text-sm font-semibold text-[#6D2932] mb-2">Kapasitas (Opsional)</label>
                  <input
                    type="number"
                    value={formData.kapasitas}
                    onChange={(e) => setFormData({ ...formData, kapasitas: e.target.value })}
                    placeholder="Jumlah orang"
                    className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#6D2932] mb-2">Fasilitas (Opsional)</label>
                <input
                  type="text"
                  value={formData.fasilitas}
                  onChange={(e) => setFormData({ ...formData, fasilitas: e.target.value })}
                  placeholder="Contoh: Proyektor, AC, Whiteboard (pisahkan dengan koma)"
                  className="w-full px-4 py-3 rounded-xl border border-[#C7B7A3] bg-white text-[#561C24] text-sm focus:outline-none focus:ring-2 focus:ring-[#6D2932] transition-all"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#C7B7A3]">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 rounded-xl text-sm font-medium text-[#6D2932] hover:bg-[#C7B7A3] transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#6D2932] hover:bg-[#561C24] text-[#E8D8C4] px-6 py-3 rounded-xl text-sm font-semibold transition-all"
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
