import { Floor } from '../types';
import { IconChevronLeft } from '@tabler/icons-react';

interface FloorSelectorProps {
  floors: Floor[];
  selectedFloor: Floor | null;
  onSelectFloor: (floor: Floor) => void;
  onBack: () => void;
  facultyName: string;
}

export default function FloorSelector({
  floors,
  selectedFloor,
  onSelectFloor,
  onBack,
  facultyName
}: FloorSelectorProps) {
  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        <IconChevronLeft size={20} />
        Kembali ke Daftar Fakultas
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{facultyName}</h2>
        <p className="text-gray-600 mb-6">Pilih lantai untuk melihat ruangan yang tersedia</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {floors.map((floor) => (
            <button
              key={floor.id}
              onClick={() => onSelectFloor(floor)}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                selectedFloor?.id === floor.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 bg-white'
              }`}
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {floor.floorNumber}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-1">
                {floor.name}
              </div>
              <div className="text-sm text-gray-600">
                {floor.rooms.length} Ruangan
              </div>
              <div className="mt-3 text-sm">
                <span className="text-green-600 font-medium">
                  {floor.rooms.filter(r => r.available).length} Tersedia
                </span>
                <span className="text-gray-400 mx-2">•</span>
                <span className="text-red-600 font-medium">
                  {floor.rooms.filter(r => !r.available).length} Terpakai
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
