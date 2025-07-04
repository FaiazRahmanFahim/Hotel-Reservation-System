import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HALogIn } from 'src/hoteladmin-login/Entities/login.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { AdminProfile } from 'src/admin_profile/Entities/admin_profile.entity';

@Injectable()
export class AuthService {
  private tokens = new Map<string, number>();

  constructor(
    @InjectRepository(HALogIn)
    private adminRepository: Repository<HALogIn>,

    @InjectRepository(AdminProfile)
    private adminProfileRepository: Repository<AdminProfile>
  ) {}

  async login(username: string, password: string) {
    console.log('Attempting login for username:', username);

    const admin = await this.adminRepository.findOne({
      where: { username, password }
    });

    if (!admin) {
      console.log('No admin found with these credentials');
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = crypto.randomBytes(32).toString('hex');
    this.tokens.set(token, admin.ID);

    try {
      let existingProfile = await this.adminProfileRepository.findOne({
        where: { adminID: admin.ID }
      });

      if (!existingProfile) {
        const newProfile = this.adminProfileRepository.create({
          username: admin.username,
          password: admin.password,
          email: admin.email,
          adminID: admin.ID
        });

        await this.adminProfileRepository.save(newProfile);
        console.log('Profile created:', newProfile);
      }

      return {
        access_token: token,
        //adminId: admin.ID,
        message: 'Login successful'
      };

    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Failed to complete login process');
    }
  }

  validateToken(token: string): number | null {
    return this.tokens.get(token) || null;
  }

  logout(token: string): void {
    if (!this.tokens.has(token)) {
      throw new UnauthorizedException('Invalid or expired token');
    }
    this.tokens.delete(token);
  }
}