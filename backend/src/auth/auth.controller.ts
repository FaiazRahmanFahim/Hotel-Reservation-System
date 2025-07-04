import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus, Req, UnauthorizedException, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {

   constructor(private readonly authService: AuthService) {}

   @Post('login')
   @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: { username: string; password: string },@Res() res: any ) {
      try {
        //console.log('Login request received:', loginDto);
        const result = await this.authService.login(loginDto.username, loginDto.password);
        const token = result.access_token;
        res.cookie('access_token', token, {
          httpOnly: true, 
          secure: false, 
          sameSite: 'lax',
          path: '/',
          expires: new Date(Date.now() + 3600000) 
        });
        
        //console.log('Login response:', result);
        return res.send({message: 'Login successful', statusCode: HttpStatus.OK});
        
        //return result;
      } catch (error) {
        console.error('Login error:', error);
        throw new UnauthorizedException('Invalid credentials');

      }
    }

    // @Post('logout')
    // @UseGuards(AuthGuard)  // Protect the logout endpoint
    // @HttpCode(HttpStatus.OK)
    // async logout(@Req() req: any) {
    // const token = req.headers.authorization?.split(' ')[1];
        
    // await this.authService.logout(token);
        
    // return {
    //   statusCode: HttpStatus.OK,
    //   message: 'Logged out successfully'
    // };
  //}

  
  @Post('logout')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: any, @Res() res: any) 
  {
    const token = req.cookies['access_token'];
    if (!token) {
      throw new UnauthorizedException('No token found');
    }
    await this.authService.logout(token);
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/'
    });
    return res.send({
      statusCode: HttpStatus.OK,
      message: 'Logged out successfully'
    });
  }

}