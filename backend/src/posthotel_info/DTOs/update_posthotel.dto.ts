import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePostHotelDTO {

    @IsString()
    HotelName: string;

    @IsString()
    HotelSerialNo: string;


    @IsString()
    roomType: string;
 
    @IsString()
    Address: string;

    @IsString()
    City: string;

    @IsString()
    Country: string;
    
    @IsString()
    ContactNumber: string;

    @IsEmail()
    email: string;
        
    @IsNumber()
    Price: number;

    @IsNumber()
    NumberOfRoom: number;

    @IsString()
    WebSite: string;

    @IsString()
    Description: string;
}
