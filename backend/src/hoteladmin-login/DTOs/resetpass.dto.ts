import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ResetPasswordDTO {
    
    @IsNotEmpty()
    @IsString()
    reset_token: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    new_password: string;
}