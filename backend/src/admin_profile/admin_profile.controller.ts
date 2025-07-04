import { Body, Controller, Get, Put, NotFoundException, Post, Query, Req, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Param, Res } from '@nestjs/common';
import { AdminProfileService } from './admin_profile.service';
import { CreateProfileDTO } from './DTOs/create_profile.dto';
import { UpdateProfileDTO } from './DTOs/update_profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Response } from 'express';

@Controller('admin-profile')
@UseGuards(AuthGuard)
export class AdminProfileController {
    constructor(private readonly adminProfileService: AdminProfileService) {}

    @Post()
    async create(@Req() req: any, @Body() createProfileDTO: CreateProfileDTO) {
        const adminId = req.user.id;
        return this.adminProfileService.create(createProfileDTO, adminId);
    }

    @Get('search')
    async searchUserName(@Query('username') username: string) {
        const profile = await this.adminProfileService.findByUserName(username);
        if (!profile) {
            throw new NotFoundException('Profile not found!');
        }
        return profile;
    }

    @Get()
    async getProfile(@Req() req: any) {
        const adminId = req.user.id;
        return this.adminProfileService.getProfile(adminId);
    }

    @Put(':ID')
    async updateProfile(@Param('ID') ID: number, @Body() updateProfileDto: UpdateProfileDTO) {
        return this.adminProfileService.updateProfile(ID, updateProfileDto);
    }

    //--------------------------------------Upload Profile Picture--------------------------------------//

    @Post('upload-picture')
    @UseInterceptors(FileInterceptor('profilePicture', {
        storage: diskStorage({
            destination: './uploads/profile_pictures/',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
            }
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: 1024 * 1024 * 10 // 10MB 
        }
    }))
    async uploadProfilePicture(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: any
    ) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        const adminId = req.user.id;
        const imageUrl = `${req.protocol}://${req.get('host')}/admin-profile/picture/${file.filename}`;

        return this.adminProfileService.updateProfilePicture(
            adminId,
            file.filename,
            imageUrl
        );
    }

    @Get('picture/:filename')
    async getProfilePicture(
        @Param('filename') filename: string,
        @Res() res: Response
    ) {
        res.sendFile(join(process.cwd(), 'uploads/profile_pictures/', filename));
    }
}