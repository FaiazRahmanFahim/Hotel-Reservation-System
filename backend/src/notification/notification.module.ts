import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingHistory } from 'src/booking-history/Entities/bookinghistory.entity';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.servise';
import { Notification } from './Entities/notification.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, BookingHistory])
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService], // Export the service so it can be used in BookingHistoryModule
})
export class NotificationModule {}