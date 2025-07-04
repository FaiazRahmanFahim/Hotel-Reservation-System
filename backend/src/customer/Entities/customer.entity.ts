import { BookingHistory } from 'src/booking-history/Entities/bookinghistory.entity';
import { PostHotelInfo } from 'src/posthotel_info/Entities/posthotel.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Customer')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar' })
  type:string; //'booking' | 'cancellation' | 'modification' | 'review' | 'inquiry';

  @Column({ type: 'varchar' })
  Description: string; // Maps to Description from Add New Hotel Table

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Amount: number; // Maps to Price from Add New Hotel Table

  @Column({ type: 'varchar' })
  customerId: string;

  @Column({ type: 'varchar' })
  customerName: string;

  @Column({ type: 'varchar' })
  fullName: string;

  @Column({ type: 'varchar', unique: true })
  cus_email: string;

  @Column({ type: 'varchar' })
  cus_address: string;

  @Column({ type: 'varchar' })
  CContactNumber: string;

  @Column({ type: 'date' })
  joinDate: Date;

  @Column({ type: 'varchar' })
  cus_city: string;

  @Column({ type: 'varchar' })
  cus_country: string;

  @Column({ type: 'varchar' })
  membershipStatus:string;     //'Gold' | 'Silver' | 'Bronze' | 'Regular';

  @Column({ type: 'varchar' })
  verificationStatus:string;    //'Verified' | 'Pending' | 'Unverified';

  @Column({ type: 'int', default: 0 })
  totalBookings: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalSpent: number;

  @Column({ type: 'varchar' })
  bookingId: string;

  @Column({ type: 'date', nullable: true })
  lastBooking: Date;

  @Column({ type: 'varchar' })
  roomType: string; // Maps to roomType from Add New Hotel Table

  @Column({ type: 'text', nullable: true })
  specialRequests: string;

  // Relation with PostHotelInfo
  // @ManyToOne(() => PostHotelInfo, hotel => hotel.customers)
  // @JoinColumn({})
  // hotels: PostHotelInfo;

  // // Relation with BookingHistory
  // @OneToMany(() => BookingHistory, booking => booking.customer)
  // bookingHistories: BookingHistory[];
}
