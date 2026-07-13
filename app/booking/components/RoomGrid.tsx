import { Room, Floor } from '../types';
import RoomCard from './RoomCard';
import { IconChevronLeft } from '@tabler/icons-react';

interface RoomGridProps {
  floor: Floor;
  facultyName: string;
  onBack: () => void;
  onRoomSelect: (room: Room) => void;
}

export default function RoomGrid({ floor, facultyName, onBack, onRoomSelect }: RoomGridProps) {
  const availableRooms = floor.rooms.filter(r => r.available).length;
  const totalRooms = floor.rooms.length;

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        <IconChevronLeft size={20} />
        Kembali ke Pemilihan Lantai
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {facultyName} - {floor.name}
          </h2>
          <p className="text-gray-600">
            {availableRooms} dari {totalRooms} ruangan tersedia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {floor.rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onClick={() => onRoomSelect(room)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
