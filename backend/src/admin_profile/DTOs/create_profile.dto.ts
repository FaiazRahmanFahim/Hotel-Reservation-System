import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateProfileDTO {

    @IsString()
    @IsOptional()
    fullName?: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    country?: string;

    @IsOptional()
    dateOfBirth: string;

    @IsString()
    @IsOptional()
    profilePicture?: string;
}