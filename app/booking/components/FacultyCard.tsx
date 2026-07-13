import { Faculty } from '../types';
import { IconBuilding, IconMapPin } from '@tabler/icons-react';

interface FacultyCardProps {
  faculty: Faculty;
  onClick: () => void;
}

export default function FacultyCard({ faculty, onClick }: FacultyCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer p-6 border border-gray-100 hover:border-blue-300"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <IconBuilding size={32} className="text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {faculty.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {faculty.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <IconMapPin size={16} />
              <span>{faculty.floors.length} Lantai</span>
            </div>
            <div>
              <span>{faculty.totalRooms} Ruangan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
