import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { HttpService } from "@nestjs/axios"
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly httpService: HttpService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async user(@Request() req: any) {
    const user = await this.usersService.findById(req.user.userId);

    if(user.is_facebook){
      const fbData = await this.httpService.axiosRef.get('https://graph.facebook.com/me?access_token=' + user.fb_access_token);
      
      if(fbData.data){
        //@ts-ignore
        user.fb_data = fbData.data;
      }
      
    }

    delete user.password
    delete user.fb_access_token
    return user;
  }
}