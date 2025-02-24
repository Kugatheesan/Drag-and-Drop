export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    lastActive: string;
  }
  
  export interface Booking {
    id: string;
    userId: string;
    eventId: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    date: string;
  }
  
  export interface Event {
    id: string;
    title: string;
    date: string;
    capacity: number;
    registrations: number;
  }
  
  export interface AnalyticsData {
    totalUsers: number;
    totalBookings: number;
    totalEvents: number;
    revenueData: number[];
  }