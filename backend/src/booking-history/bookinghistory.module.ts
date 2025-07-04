import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingHistory } from './Entities/bookinghistory.entity';
import { BookingHistoryController } from './bookinghistory.controller';
import { BookingHistoryService } from './bookinghistory.service';
import { NotificationModule } from 'src/notification/notification.module';


@Module({
  imports: [TypeOrmModule.forFeature([BookingHistory]), NotificationModule],
  controllers: [BookingHistoryController],
  providers: [BookingHistoryService],
})
export class BookingHistoryModule {}
