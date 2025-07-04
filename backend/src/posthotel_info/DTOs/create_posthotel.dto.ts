import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostHotelDTO {

    @IsNotEmpty()
    @IsString()
    HotelName: string;

    @IsNotEmpty()
    @IsString()
    HotelSerialNo: string;

    @IsNotEmpty()
    @IsString()
    roomType: string;

    @IsNotEmpty()
    @IsString()
    Address: string;

    @IsNotEmpty()
    @IsString()
    City: string;

    @IsNotEmpty()
    @IsString()
    Country: string;
    
    @IsNotEmpty()
    @IsString()
    ContactNumber: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
        
    @IsNotEmpty()
    @IsNumber()
    Price: number;

    @IsNotEmpty()
    @IsNumber()
    NumberOfRoom: number;

    // @IsOptional()
    @IsString()
    WebSite: string;

    Description: string;
}
