import { HALogIn } from 'src/hoteladmin-login/Entities/login.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity('CTable')
export class CTable {
    @PrimaryGeneratedColumn()
    UID: string;

    @ManyToOne(() => HALogIn, { nullable: true })
    @JoinColumn({ name: 'addedBy' })
    hotelAdminLogin: HALogIn;  // Foreign key to hoteladmin_login table
    
    @Column({ nullable: true })
    user_type: string;

    @Column({ nullable: true })
    is_admin: boolean;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    phone_number: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    HotelName: string;

    @Column({ nullable: true })
    NumberOfRoom: number;

    @Column({ nullable: true })
    roomType: string;

    @Column({ nullable: true })
    numberOfpeople: number;

    @Column('date', { nullable: true })
    checkInDate: string;

    @Column('date', { nullable: true })
    checkOutDate: string;

    @Column({ nullable: true })
    flightName: string;

    @Column({ nullable: true })
    AirlineName: string;

    @Column({ nullable: true })
    FromPlace: string;

    @Column({ nullable: true })
    ToPlace: string;

    @Column({ nullable: true })
    Price: number;

    @Column({ nullable: true })
    Availability: string;

    @Column({ nullable: true })
    carModel: string;

    @Column({ nullable: true })
    carNumber: string;

    @Column('date', { nullable: true })
    pickUpDate: string;

    @Column('date', { nullable: true })
    dropOffDate: string;

    @Column({ default: 'Pending', nullable: true })
    paymentStatus: string;

    @Column({ default: 'Active', nullable: true })
    bookingStatus: string;

    @Column({ nullable: true })
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;
}
