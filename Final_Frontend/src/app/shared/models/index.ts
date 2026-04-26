// models/index.ts

export interface User {
  userId?: number;
  name: string;
  email: string;
  password?: string;
  role: 'Admin' | 'User';
}

export interface Hotel {
  hotelId?: number;
  name: string;
  location: string;
  description: string;
  averageRating?: number;
  imageUrl?: string;
}

export interface Room {
  roomId?: number;
  hotelId: number;
  type: 'Single' | 'Double' | 'Deluxe' | 'Suite';
  price: number;
  available?: boolean;
}

export interface Booking {
  bookingId?: number;
  userId: number;
  roomId: number;
  checkIn: string;
  checkOut: string;
  paymentStatus?: 'Paid' | 'Pending';
  totalAmount?: number;
  // Joined
  hotelName?: string;
  roomType?: string;
  location?: string;
}

export interface Rating {
  ratingId?: number;
  hotelId: number;
  userId: number;
  rating1: number;
  review: string;
  userName?: string;
}

export interface DashboardSummary {
  totalBookings: number;
  totalRevenue: number;
  bookingsPerHotel: { hotelName: string; count: number }[];
}

export interface LoginRequest { email: string; password: string; }
export interface RegisterRequest { name: string; email: string; password: string; role: 'User'; }
export interface AuthResponse { user: User; token?: string; }
