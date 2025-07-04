import { Controller, Post, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { CreateHALogInDTO } from './DTOs/create-halogin.dto';
import { UpdateHALogInDTO } from './DTOs/update-halogin.dto';
import { HotelAdminLoginService } from './hoteladmin-login.service';
import { ForgotPasswordDTO } from './DTOs/forgetpass.dto';
import { ResetPasswordDTO } from './DTOs/resetpass.dto';


@Controller('hoteladmin-login')

export class HotelAdminLoginController {
  
  constructor(private readonly haloginService: HotelAdminLoginService) {}

  // Create new admin
  @Post()
  async create(@Body() createHALogInDTO: CreateHALogInDTO) {
    return this.haloginService.create(createHALogInDTO);
  }

  @Get()
  async findAll() {
    return this.haloginService.findAll();
  }

  @Get(':ID')
  async findOne(@Param('ID') ID: number) {
    return this.haloginService.findOne(ID);
  }


  @Put(':ID')
  async update(
    @Param('ID') ID: number,
    @Body() updateHALogInDTO: UpdateHALogInDTO,
  ) {
    return this.haloginService.update(ID, updateHALogInDTO);
  }

  @Delete(':ID')
  async remove(@Param('ID') ID: number) 
  {
    const message = await this.haloginService.remove(ID);
    return { message };
  }


  // Change Password
  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) 
  {
    const isValid = await this.haloginService.validatePassword(username, password);

    if (isValid) {
      return { message: 'Successful login!' };
    }else {
      return { message: 'Login credentials wrong!' };
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDTO) 
  {
    return this.haloginService.initiatePasswordReset(forgotPasswordDto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDTO) 
  {
    return this.haloginService.resetPassword(resetPasswordDto.reset_token, resetPasswordDto.new_password);
  }

}
