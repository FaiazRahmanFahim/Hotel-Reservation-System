import { HALogIn } from 'src/hoteladmin-login/Entities/login.entity';
import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('AdminProfile_Info')
export class AdminProfile {

    @PrimaryColumn()
    adminID: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    fullName: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    country: string;

    @Column({ type: 'varchar', nullable: true })
    dateOfBirth: string;

    @Column({ nullable: true })
    profilePicture: string;

    @ManyToOne(() => HALogIn, admin => admin.hotels)
    @JoinColumn({ name: 'adminID' })
    admin: HALogIn;

}