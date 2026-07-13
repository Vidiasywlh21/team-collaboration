export interface Faculty {
  id: string;
  name: string;
  description: string;
  totalRooms: number;
  floors: Floor[];
}

export interface Floor {
  id: string;
  floorNumber: number;
  name: string;
  rooms: Room[];
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  facilities: string[];
  available: boolean;
  floorId: string;
}

export interface BookingData {
  roomId: string;
  roomName: string;
  facultyName: string;
  floorNumber: number;
  date: Date;
  startTime: string;
  endTime: string;
}
