import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationController } from './reservation.controller';
import { ReservationDetails } from './Entities/reservationdetails.entity';
import { ReservationService } from './reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationDetails])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
