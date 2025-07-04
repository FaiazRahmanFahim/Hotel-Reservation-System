import { BookingStatus, PaymentStatus } from "../interfaces/booking-status.interface";

export class CreateBookingHistoryDTO {
    bookingId: string;
    HotelSerialNo: string;
    customerName: string;
    HotelName: string;
    cus_checkIn: Date;
    cus_checkOut: Date;
    Amount: number;
    // paymentStatus:string; //'Paid' | 'Pending' | 'Failed';
    // bookingStatus:string; //'Completed' | 'Cancelled' | 'Active';
    customerId: string;
    fullName: string;
    cus_email: string;
    roomType: string;
    CContactNumber: string;
    roomNumber: string;
    bookingDate: string;
    paymentMethod: string;
    paymentDate: string;
    bookingStatus: BookingStatus;
    paymentStatus: PaymentStatus;

  }
  