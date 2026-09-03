
import { BookingHistory } from "src/booking-history/Entities/bookinghistory.entity";
import { Customer } from "src/customer/Entities/customer.entity";
import { HALogIn } from "src/hoteladmin-login/Entities/login.entity";
import { ReservationDetails } from "src/reservation-details/Entities/reservationdetails.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('PostHotel_Info')
export class PostHotelInfo {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column({ type: 'varchar' })
    HotelName: string;

    @Column({ type: 'varchar' })
    HotelSerialNo: string;

    @Column({ type: 'varchar' })
    roomType: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    Price: number;

    @Column({ type: 'varchar', default: 'Available' })
    Availability: string;

    @Column({type: 'varchar'})
    Address: string;

    @Column({type: 'varchar'})
    City: string;

    @Column({type: 'varchar'})
    Country: string;

    @Column({type: 'varchar'})
    WebSite: string;

    @Column({type: 'text', nullable:true})
    Description: string;

    @Column({ type: 'int' })
    NumberOfRoom: number;
    
    @Column({ type: 'varchar' })
    ContactNumber: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    adminID: number;
    @ManyToOne(() => HALogIn, admin => admin.hotels)
    @JoinColumn({ name: 'adminID' })
    admin: HALogIn;

    // @OneToMany(() => Customer, customer => customer.hotels)
    // customers: Customer[];

    // @OneToMany(() => BookingHistory, booking => booking.hotels)
    // bookingHistories: BookingHistory[];

    // @OneToMany(() => ReservationDetails, reservation => reservation.hotels)
    // reservations: ReservationDetails[];
}
