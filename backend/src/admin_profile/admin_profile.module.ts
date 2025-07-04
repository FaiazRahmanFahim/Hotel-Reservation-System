import { Module } from '@nestjs/common';
import { AdminProfileService } from './admin_profile.service';
import { AdminProfileController } from './admin_profile.controller';
import { AdminProfile } from './Entities/admin_profile.entity';
import { HALogIn } from 'src/hoteladmin-login/Entities/login.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AdminProfile, HALogIn]), AuthModule],
  controllers: [AdminProfileController],
  providers: [AdminProfileService]
})
export class AdminProfileModule {}
