import { BookingHistory } from 'src/booking-history/Entities/bookinghistory.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';


@Entity('Notification')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  bookingId: number;

  @ManyToOne(() => BookingHistory)
  booking: BookingHistory;
}