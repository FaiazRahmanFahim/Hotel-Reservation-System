// Define the possible booking statuses
export type BookingStatus = 'Completed' | 'Cancelled' | 'Active' | 'Pending';

// Define the possible payment statuses
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed';

// Interface for status count metrics
export interface StatusCount {
  status: string;
  count: number;
  percentage: number;
}

// Interface for overall status metrics
export interface StatusMetrics {
  bookingStatus: StatusCount[];
  paymentStatus: StatusCount[];
}

// Optional: Add color mappings for statuses
export const StatusColors = {
  // Booking status colors
  Completed: 'green',
  Cancelled: 'red',
  Active: 'blue',
  
  // Payment status colors
  Paid: 'green',
  Pending: 'yellow',
  Failed: 'red'
} as const;

// Optional: Add status descriptions
export const StatusDescriptions = {
  // Booking status descriptions
  Completed: 'Booking has been completed',
  Cancelled: 'Booking was cancelled',
  Active: 'Booking is currently active',
  
  // Payment status descriptions
  Paid: 'Payment has been received',
  Pending: 'Payment is pending',
  Failed: 'Payment has failed'
} as const;