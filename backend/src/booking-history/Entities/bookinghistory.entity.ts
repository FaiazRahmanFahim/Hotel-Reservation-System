import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PostHotelInfo } from 'src/posthotel_info/Entities/posthotel.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { BookingStatus, PaymentStatus } from '../interfaces/booking-status.interface';

@Entity('BookingHistory')
export class BookingHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  bookingId: string;

  @Column({ type: 'varchar' })
  HotelSerialNo: string;

  @Column({ type: 'varchar' })
  customerName: string;

  @Column({ type: 'varchar' })
  HotelName: string;

  @Column({ type: 'date' })
  cus_checkIn: Date;

  @Column({ type: 'date' })
  cus_checkOut: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Amount: number; // Maps to Price from Add New Hotel Table

  // @Column({ type: 'varchar' })
  // paymentStatus:string; //'Paid' | 'Pending' | 'Failed';

  // @Column({ type: 'varchar' })
  // bookingStatus:string; //'Completed' | 'Cancelled' | 'Active';

  @Column({ type: 'varchar' })
  customerId: string;

  @Column({ type: 'varchar' })
  fullName: string;

  @Column({ type: 'varchar', unique: true })
  cus_email: string;

  @Column({ type: 'varchar' })
  roomType: string; // Maps to roomType from Add New Hotel Table

  @Column({ type: 'varchar' })
  CContactNumber: string;

  @Column({ type: 'varchar' })
  roomNumber: string; // Maps to NumberOfRoom from Add New Hotel Table

  @Column({ type: 'varchar' })
  bookingDate: string;

  @Column({ type: 'varchar' })
  paymentMethod: string;

  @Column({ type: 'varchar' })
  paymentDate: string;

  // @Column()
  // hotelID: number;

  // @Column()
  // customerID: number;

  // Relation with PostHotelInfo
  // @ManyToOne(() => PostHotelInfo, hotel => hotel.bookingHistories)
  // @JoinColumn({name: 'hotelID'})
  // hotels: PostHotelInfo;

  // // Relation with Customer
  // @ManyToOne(() => Customer, customer => customer.bookingId)
  // @JoinColumn({name: 'customerID'})
  // customer: Customer;

  //--------------------------------------------dashboard stats--------------------------------------------//


  @Column({
    type: 'enum',
    enum: ['Completed', 'Cancelled', 'Active', 'Pending'],
    default: 'Pending'
  })
  bookingStatus: BookingStatus;

  @Column({
    type: 'enum',
    enum: ['Paid', 'Pending', 'Failed'],
    default: 'Pending'
  })
  paymentStatus: PaymentStatus;


}
