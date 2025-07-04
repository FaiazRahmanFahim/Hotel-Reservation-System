import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminProfile } from './Entities/admin_profile.entity';
import { HALogIn } from '../hoteladmin-login/Entities/login.entity';
import { CreateProfileDTO } from './DTOs/create_profile.dto';
import { UpdateProfileDTO } from './DTOs/update_profile.dto';
import { unlink } from 'fs/promises';



@Injectable()
export class AdminProfileService {
    constructor(
        @InjectRepository(AdminProfile)
        private adminProfileRepository: Repository<AdminProfile>,
        @InjectRepository(HALogIn)
        private haLoginRepository: Repository<HALogIn>
    ) {}

    async create(createProfileDTO: CreateProfileDTO, adminId: number): Promise<AdminProfile> {
        // First get admin data from login table
        const adminData = await this.haLoginRepository.findOne({
            where: { ID: adminId }
        });

        if (!adminData) {
            throw new NotFoundException('Admin not found');
        }

        // Create profile with both login and new data
        const adminProfile = this.adminProfileRepository.create({
            username: adminData.username,
            password: adminData.password,
            email: adminData.email,
            adminID: adminId,
            ...createProfileDTO
        });

        return await this.adminProfileRepository.save(adminProfile);
    }

    async findByUserName(username: string): Promise<AdminProfile|null> {
        return await this.adminProfileRepository
            .createQueryBuilder('AdminProfile_Info')
            .where('AdminProfile_Info.username ILIKE :username', { username: `%${username}%` })
            .getOne();
    }

    async getProfile(adminId: number): Promise<AdminProfile> {
        const profile = await this.adminProfileRepository.findOne({
            where: { adminID: adminId }
        });

        if (!profile) {
            throw new NotFoundException('Profile not found');
        }

        return profile;
    }

    async updateProfile(adminId: number, updateProfileDto: UpdateProfileDTO): Promise<AdminProfile> {
        const profile = await this.getProfile(adminId);
        
        Object.assign(profile, updateProfileDto);
        return await this.adminProfileRepository.save(profile);
    }

    //--------------------------------------Upload Profile Picture--------------------------------------//

    async updateProfilePicture(
        adminId: number,
        filename: string,
        imageUrl: string
    ): Promise<AdminProfile> {
        const profile = await this.adminProfileRepository.findOne({
            where: { adminID: adminId }
        });

        if (!profile) {
            throw new NotFoundException('Profile not found');
        }

        // Delete old picture if exists
        if (profile.profilePicture) {
            try {
                await unlink(`uploads/profile_pictures/${profile.profilePicture}`);
            } catch (error) {
                console.error('Error deleting old picture:', error);
            }
        }

        profile.profilePicture = filename;
        profile.profilePicture = imageUrl;

        return this.adminProfileRepository.save(profile);
    }
}