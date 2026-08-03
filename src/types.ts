export type ServiceCategory = 
  | 'COMMERCIAL'
  | 'REGULAR'
  | 'RESIDENTIAL DEEP'
  | 'KITCHEN DEEP CLEAN'
  | 'MOVE-IN CLEAN';

export type BookingStatus = 'Pending' | 'Assigned' | 'In Progress' | 'Completed' | 'Cancelled';

export interface Cleaner {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: 'On Duty' | 'En Route' | 'Off Duty' | 'On Leave';
  currentTask?: string;
  location?: string;
  gpsDistance?: string;
  phone: string;
  email: string;
  rating: number;
  completedJobs: number;
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  serviceType: string;
  category: ServiceCategory;
  address: string;
  date: string; // ISO or YYYY-MM-DD
  timeSlot: string; // e.g. "09:00 AM" or "09:00 AM - 11:30 AM"
  durationHours?: number;
  status: BookingStatus;
  assignedCleaners: Cleaner[];
  notes?: string;
  price: number;
  createdAt: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDesc: string;
  description: string;
  duration: string;
  price: number;
  priceType: string; // e.g. "/clean" or "/monthly"
  popular?: boolean;
  image: string;
  features: string[];
}

export interface DashboardStats {
  totalMonthlyRevenue: number;
  totalRequests: number;
  monthlyGrowthPercent: number;
  todayJobs: number;
  completedToday: number;
  activeJobs: number;
  pendingRequests: number;
  priorityPending: number;
  activeCleaners: number;
  totalCleaners: number;
  onDutyCleaners: number;
  customerSatisfactionPercent: number;
  averageRating: number;
}

export interface SupabaseConfigState {
  url: string;
  anonKey: string;
  isConnected: boolean;
  lastConnectedAt?: string;
}
