import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HALogIn } from './hoteladmin-login/Entities/login.entity';
import { HotelAdminLoginModule } from './hoteladmin-login/hoteladmin-login.module';
import { AuthModule } from './auth/auth.module';
import { PostHotelInfo } from './posthotel_info/Entities/posthotel.entity';
import { PostHotelInfoModule } from './posthotel_info/posthotel_info.module';
import { AdminProfileModule } from './admin_profile/admin_profile.module';
import { AdminProfile } from './admin_profile/Entities/admin_profile.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { MulterModule } from '@nestjs/platform-express';
import { ReservationModule } from './reservation-details/reservation.module';
import { BookingHistoryModule } from './booking-history/bookinghistory.module';
import { CustomerModule } from './customer/customer.module';
import { ReservationDetails } from './reservation-details/Entities/reservationdetails.entity';
import { Customer } from './customer/entities/customer.entity';
import { BookingHistory } from './booking-history/Entities/bookinghistory.entity';
import { NotificationModule } from './notification/notification.module';
import { Notification } from './notification/Entities/notification.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 1111,
      username: 'postgres',
      password: '5555',
      database: 'TPABP',
      entities: [HALogIn, PostHotelInfo, AdminProfile, BookingHistory, ReservationDetails, Customer, Notification], //[__dirname + '/**/*.entity{.ts,.js}']
      synchronize: true,
    }),

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'faiazrahman12@gmail.com', 
          pass: 'yckj fthv pdwq fqan'       // My Gmail App Password
        }
      }
    }),

    MulterModule.register({
      dest: './uploads/profile_pictures',
    }),

    HotelAdminLoginModule,
    PostHotelInfoModule,
    AuthModule,
    AdminProfileModule,
    ReservationModule,
    BookingHistoryModule,
    CustomerModule,
    NotificationModule
    

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
