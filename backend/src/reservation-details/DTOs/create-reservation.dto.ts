
export class CreateReservationDTO {
    customerName: string;
    roomType: string;
    checkIn: string;
    checkOut: string;
    Amount: number;
    paymentStatus:string; //'Paid' | 'Pending' | 'Failed';
    bookingStatus:string; //'Completed' | 'Cancelled' | 'Active';
    cus_email: string;
    phone: string;
    roomNumber: string;
    adults: number;
    children: number;
    reservationStatus:string; //'Confirmed' | 'Cancelled' | 'Checked In' | 'Checked Out';
    hotelName: string;
    specialRequests: string;
    paymentMethod: string;
    bookingDate: string;
  }
  