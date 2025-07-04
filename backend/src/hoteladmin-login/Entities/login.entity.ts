import { PostHotelInfo } from 'src/posthotel_info/Entities/posthotel.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('hoteladmin_login')
export class HALogIn {

    @PrimaryGeneratedColumn('increment')  
    ID: number;
  
    @Column({ type: 'varchar', unique: true })
    username: string;
  
    @Column({ type: 'varchar', unique: true })
    email: string;
  
    @Column({ type: 'varchar' })
    password: string;
  
    @Column({ type: 'varchar', nullable: true })
    reset_token: string | null;

    @Column({ type: 'timestamp', nullable: true })
    reset_token_expires: Date;
  

    @OneToMany(() => PostHotelInfo, hotel => hotel.admin)
    hotels: PostHotelInfo[];

}
