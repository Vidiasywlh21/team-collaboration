import { Room } from '../types';
import { IconUsers, IconCheck, IconX } from '@tabler/icons-react';

interface RoomCardProps {
  room: Room;
  onClick: () => void;
}

export default function RoomCard({ room, onClick }: RoomCardProps) {
  return (
    <div
      onClick={room.available ? onClick : undefined}
      className={`bg-white rounded-lg shadow-md p-5 border-2 transition-all ${
        room.available
          ? 'hover:shadow-lg cursor-pointer hover:border-blue-400 border-gray-200'
          : 'opacity-60 cursor-not-allowed border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
            room.available
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {room.available ? (
            <>
              <IconCheck size={12} />
              Tersedia
            </>
          ) : (
            <>
              <IconX size={12} />
              Terpakai
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-600 mb-3">
        <IconUsers size={16} />
        <span className="text-sm">Kapasitas: {room.capacity} orang</span>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-700">Fasilitas:</div>
        <div className="flex flex-wrap gap-2">
          {room.facilities.map((facility, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
            >
              {facility}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
