'use client';

import { Room } from '../types';
import { IconX, IconCalendar, IconClock, IconUsers, IconMapPin } from '@tabler/icons-react';
import { useState } from 'react';

interface BookingModalProps {
  room: Room;
  facultyName: string;
  floorNumber: number;
  onClose: () => void;
  onConfirm: (date: Date, startTime: string, endTime: string) => void;
}

export default function BookingModal({
  room,
  facultyName,
  floorNumber,
  onClose,
  onConfirm
}: BookingModalProps) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && startTime && endTime) {
      onConfirm(new Date(date), startTime, endTime);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Booking Ruangan</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <IconX size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-800 text-lg">{room.name}</h3>
            
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <IconMapPin size={16} className="text-blue-600" />
                <span>{facultyName} - Lantai {floorNumber}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <IconUsers size={16} className="text-blue-600" />
                <span>Kapasitas: {room.capacity} orang</span>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Fasilitas:</div>
              <div className="flex flex-wrap gap-2">
                {room.facilities.map((facility, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white text-blue-700 text-xs rounded-md border border-blue-200"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <IconCalendar size={16} className="inline mr-2" />
                Tanggal
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <IconClock size={16} className="inline mr-2" />
                  Waktu Mulai
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <IconClock size={16} className="inline mr-2" />
                  Waktu Selesai
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                Konfirmasi Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
