import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PostHotelInfo } from 'src/posthotel_info/Entities/posthotel.entity';
import { Customer } from 'src/customer/Entities/customer.entity';

@Entity('ReservationDetails')
export class ReservationDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  customerName: string;

  @Column({ type: 'varchar' })
  roomType: string; // Maps to roomType from Add New Hotel Table

  @Column({ type: 'varchar' })
  checkIn: string;

  @Column({ type: 'varchar' })
  checkOut: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Amount: number; // Maps to Price from Add New Hotel Table

  @Column({ type: 'varchar' })
  paymentStatus:string; //'Paid' | 'Pending' | 'Failed';

  @Column({ type: 'varchar' })
  bookingStatus:string; //'Completed' | 'Cancelled' | 'Active';

  @Column({ type: 'varchar', unique: true })
  cus_email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  roomNumber: string; // Maps to NumberOfRoom from Add New Hotel Table

  @Column({ type: 'int' })
  adults: number;

  @Column({ type: 'int' })
  children: number;

  @Column({ type: 'varchar' })
  reservationStatus:string //'Confirmed' | 'Cancelled' | 'Checked In' | 'Checked Out';

  @Column({ type: 'varchar' })
  hotelName: string;

  @Column({ type: 'text', nullable: true })
  specialRequests: string;

  @Column({ type: 'varchar' })
  paymentMethod: string;

  @Column({ type: 'varchar' })
  bookingDate: string;

  // // Relation with PostHotelInfo
  // @ManyToOne(() => PostHotelInfo, hotel => hotel.reservations)
  // hotels: PostHotelInfo;

  // // Relation with Customer
  // @ManyToOne(() => Customer, customer => customer.bookingId)
  // customer: Customer;
}
