import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HALogIn } from './Entities/login.entity';
import { HotelAdminLoginController } from './hoteladmin-login.controller';
import { HotelAdminLoginService } from './hoteladmin-login.service';

@Module({
  imports: [TypeOrmModule.forFeature([HALogIn])],
  controllers: [HotelAdminLoginController],
  providers: [HotelAdminLoginService],
})
export class HotelAdminLoginModule {}

