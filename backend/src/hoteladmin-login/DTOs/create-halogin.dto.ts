import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateHALogInDTO {
  
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

}
