
export class CreateCustomerDTO {
    customerId: string;
    customerName: string;
    fullName: string;
    cus_email: string;
    cus_address: string;
    CContactNumber: string;
    cus_city: string;
    cus_country: string;
    membershipStatus:string; //'Gold' | 'Silver' | 'Bronze' | 'Regular';
    verificationStatus:string; //'Verified' | 'Pending' | 'Unverified';
    totalBookings: number;
    totalSpent: number;
    bookingId: string;
    lastBooking: Date;
    roomType: string;
    specialRequests: string;
  }
  