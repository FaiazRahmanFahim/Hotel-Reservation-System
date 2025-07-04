import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HALogIn } from './Entities/login.entity';
import { CreateHALogInDTO } from './DTOs/create-halogin.dto';
import { UpdateHALogInDTO } from './DTOs/update-halogin.dto';
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class HotelAdminLoginService {

  constructor(@InjectRepository(HALogIn) 
  private readonly haloginRepository: Repository<HALogIn>,
  private readonly mailerService: MailerService
  ) {}

  async create(createHALogInDTO: CreateHALogInDTO): Promise<HALogIn> 
  {
    const admin = this.haloginRepository.create(createHALogInDTO);
    return this.haloginRepository.save(admin);
  }

  async findOne(ID: number): Promise<HALogIn> 
  {
    const admin = await this.haloginRepository.findOne({ where: {ID} });
    if (!admin) {
      throw new NotFoundException(`Admin with UID ${ID} not found`);
    }
    return admin;
  }

  async findAll(): Promise<HALogIn[]> 
  {
    return this.haloginRepository.find();
  }

  async update(ID: number, updateHALogInDTO: UpdateHALogInDTO): Promise<HALogIn> 
  {
    const admin = await this.findOne(ID); // Get the current admin
    Object.assign(admin, updateHALogInDTO); // Merge the new data
    return this.haloginRepository.save(admin);
  }


  async remove(ID: number): Promise<string> {
    const admin = await this.findOne(ID); 

    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    await this.haloginRepository.remove(admin); 
    return `Successfully deleted admin with ID: ${ID}`; 
  }

  
  // Log In
  async validatePassword(username: string, password: string): Promise<boolean> 
  {
      const user = await this.haloginRepository.findOne({ where: { username, password } });
      return !!user;
  }

  // password reset
  async initiatePasswordReset(email: string): Promise<string> {
    const user = await this.haloginRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Email not found in the database.');
    }

    const resetToken = crypto.randomInt(100000, 999999).toString();
    const tokenExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    user.reset_token = resetToken;
    user.reset_token_expires = tokenExpiration;
    await this.haloginRepository.save(user);

    try {
      await this.mailerService.sendMail({
        to: 'faiazrahman12@gmail.com',
        subject: 'Password Reset Request - Hotel Admin System',
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Password Reset Request</h2>
        <p>Hello,</p>
        <p>You have requested to reset your password. Please use the following token:</p>
        <div style="background-color: #f5f5f5; padding: 10px; margin: 20px 0; font-size: 18px;">
          <strong>${resetToken}</strong>
        </div>
        <p><strong>Important:</strong> This token will expire in 5 minutes.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <br>
        <p>Best regards,</p>
        <p>Hotel Admin System</p>
        </div>
        `
      });

      return `Password reset instructions sent to ${email}`;
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new BadRequestException('Failed to send reset email');
    }
  }

  // reset the password
  async resetPassword(resetToken: string, newPassword: string): Promise<string> {
    const user = await this.haloginRepository.findOne({
      where: { reset_token: resetToken }
    });

    if (!user) {
      throw new BadRequestException('Invalid reset token.');
    }

    if (user.reset_token_expires < new Date()) {
      throw new BadRequestException('Reset token has expired. Please request a new one.');
    }

    user.password = newPassword;
    user.reset_token = null;
    user.reset_token_expires = null;
    await this.haloginRepository.save(user);

    return 'Password has been successfully reset.';
  }
}
