import { Module } from '@nestjs/common';
import { PostHotelInfoService } from './posthotel_info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostHotelInfo } from './Entities/posthotel.entity';
import { PostHotelInfoController } from './posthotel_info.controller';
import { AuthModule } from 'src/auth/auth.module';


@Module({

  imports: [TypeOrmModule.forFeature([PostHotelInfo]), AuthModule],
  controllers: [PostHotelInfoController],
  providers: [PostHotelInfoService],
  
})
export class PostHotelInfoModule {}
