import { Faculty } from './types';

export const faculties: Faculty[] = [
  {
    id: 'fti',
    name: 'Fakultas Teknologi Informasi',
    description: 'Gedung FTI dengan berbagai ruang kelas dan laboratorium',
    totalRooms: 24,
    floors: [
      {
        id: 'fti-1',
        floorNumber: 1,
        name: 'Lantai 1',
        rooms: [
          {
            id: 'fti-101',
            name: 'Lab Programming 1',
            capacity: 40,
            facilities: ['Proyektor', 'AC', 'Komputer'],
            available: true,
            floorId: 'fti-1'
          },
          {
            id: 'fti-102',
            name: 'Lab Programming 2',
            capacity: 40,
            facilities: ['Proyektor', 'AC', 'Komputer'],
            available: true,
            floorId: 'fti-1'
          },
          {
            id: 'fti-103',
            name: 'Ruang Kelas 103',
            capacity: 50,
            facilities: ['Proyektor', 'AC', 'Whiteboard'],
            available: false,
            floorId: 'fti-1'
          },
          {
            id: 'fti-104',
            name: 'Lab Database',
            capacity: 35,
            facilities: ['Proyektor', 'AC', 'Komputer', 'Server'],
            available: true,
            floorId: 'fti-1'
          }
        ]
      },
      {
        id: 'fti-2',
        floorNumber: 2,
        name: 'Lantai 2',
        rooms: [
          {
            id: 'fti-201',
            name: 'Lab Jaringan',
            capacity: 30,
            facilities: ['Proyektor', 'AC', 'Komputer', 'Router'],
            available: true,
            floorId: 'fti-2'
          },
          {
            id: 'fti-202',
            name: 'Ruang Kelas 202',
            capacity: 45,
            facilities: ['Proyektor', 'AC', 'Whiteboard'],
            available: true,
            floorId: 'fti-2'
          },
          {
            id: 'fti-203',
            name: 'Ruang Kelas 203',
            capacity: 45,
            facilities: ['Proyektor', 'AC', 'Whiteboard'],
            available: true,
            floorId: 'fti-2'
          },
          {
            id: 'fti-204',
            name: 'Lab Multimedia',
            capacity: 35,
            facilities: ['Proyektor', 'AC', 'Komputer', 'Software Design'],
            available: false,
            floorId: 'fti-2'
          }
        ]
      },
      {
        id: 'fti-3',
        floorNumber: 3,
        name: 'Lantai 3',
        rooms: [
          {
            id: 'fti-301',
            name: 'Auditorium FTI',
            capacity: 150,
            facilities: ['Proyektor', 'AC', 'Sound System', 'Panggung'],
            available: true,
            floorId: 'fti-3'
          },
          {
            id: 'fti-302',
            name: 'Ruang Seminar',
            capacity: 80,
            facilities: ['Proyektor', 'AC', 'Sound System'],
            available: true,
            floorId: 'fti-3'
          },
          {
            id: 'fti-303',
            name: 'Ruang Meeting',
            capacity: 20,
            facilities: ['TV', 'AC', 'Whiteboard'],
            available: true,
            floorId: 'fti-3'
          }
        ]
      }
    ]
  },
  {
    id: 'feb',
    name: 'Fakultas Ekonomi dan Bisnis',
    description: 'Gedung FEB dengan ruang kuliah dan ruang diskusi',
    totalRooms: 20,
    floors: [
      {
        id: 'feb-1',
        floorNumber: 1,
        name: 'Lantai 1',
        rooms: [
          {
            id: 'feb-101',
            name: 'Ruang Kelas 101',
            capacity: 50,
            facilities: ['Proyektor', 'AC', 'Whiteboard'],
            available: true,
            floorId: 'feb-1'
          },
          {
            id: 'feb-102',
            name: 'Ruang Kelas 102',
            capacity: 50,
            facilities: ['Proyektor', 'AC', 'Whiteboard'],
            available: true,
            floorId: 'feb-1'
          },
          {
            id: 'feb-103',
            name: 'Lab Akuntansi',
            capacity: 40,
            facilities: ['Proyektor', 'AC', 'Komputer'],
            available: false,
            floorId: 'feb-1'
          }
        ]
      },
      {
        id: 'feb-2',
        floorNumber: 2,
        name: 'Lantai 2',
        rooms: [
          {
            id: 'feb-201',
            name: 'Ruang Kelas 201',
            capacity: 45,
            facilities: ['Proyektor', 'AC', 'Whiteboard'],
            available: true,
            floorId: 'feb-2'
          },
          {
            id: 'feb-202',
            name: 'Ruang Diskusi Kelompok',
            capacity: 15,
            facilities: ['Whiteboard', 'AC'],
            available: true,
            floorId: 'feb-2'
          },
          {
            id: 'feb-203',
            name: 'Lab Manajemen',
            capacity: 35,
            facilities: ['Proyektor', 'AC', 'Komputer'],
            available: true,
            floorId: 'feb-2'
          }
        ]
      }
    ]
  },
  {
    id: 'fh',
    name: 'Fakultas Hukum',
    description: 'Gedung Fakultas Hukum dengan ruang sidang dan kelas',
    totalRooms: 15,
    floors: [
      {
        id: 'fh-1',
        floorNumber: 1,
        name: 'Lantai 1',
        rooms: [
          {
            id: 'fh-101',
            name: 'Ruang Sidang',
            capacity: 60,
            facilities: ['Proyektor', 'AC', 'Sound System'],
            available: true,
            floorId: 'fh-1'
          },
          {
            id: 'fh-102',
            name: 'Ruang Kelas 102',
            capacity: 45,
            facilities: ['Proyektor', 'AC', 'Whiteboard'],
            available: true,
            floorId: 'fh-1'
          }
        ]
      },
      {
        id: 'fh-2',
        floorNumber: 2,
        name: 'Lantai 2',
        rooms: [
          {
            id: 'fh-201',
            name: 'Ruang Kelas 201',
            capacity: 50,
            facilities: ['Proyektor', 'AC', 'Whiteboard'],
            available: true,
            floorId: 'fh-2'
          },
          {
            id: 'fh-202',
            name: 'Perpustakaan Hukum',
            capacity: 30,
            facilities: ['AC', 'Komputer'],
            available: false,
            floorId: 'fh-2'
          }
        ]
      }
    ]
  }
];
