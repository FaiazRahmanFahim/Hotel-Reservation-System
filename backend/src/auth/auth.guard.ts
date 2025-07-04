import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

   constructor(private authService: AuthService) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();

      //const token = request.headers.authorization?.split(' ')[1];
      const token = request.cookies['access_token'];
      console.log('Token:', token);

      if (!token) {
         throw new UnauthorizedException('No token provided');
      }
        
      const adminId = this.authService.validateToken(token);
      if (!adminId) {
         throw new UnauthorizedException('Invalid token');
      }
      request.user = { 
         id: adminId,
         adminID: adminId  
      };
       return true;
   }
}
