import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private usersService: UsersService, 
    private jwtService: JwtService,) {}

  @Post('/login')
  @UsePipes(new ValidationPipe({ transform: false }))
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('sign-up')
  @UsePipes(new ValidationPipe({ transform: false }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto).catch((e) => {
      
      if (e.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(
          ['Account with this email already exists.'],
        );
      }
      return e;
    });;
  }

  @Get("/facebook-login")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }
  @Get("/facebook/validate")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Request() req: Request): Promise<any> {
    //@ts-ignore
    const requestUser = req.user.user;
    const email = requestUser.email;
    //@ts-ignore
    const fb_token = req.user.accessToken;

    let user = await this.usersService.findByEmail(email);

    if(user){
      user.fb_access_token = fb_token;
      user.save();
    }else{
      //@ts-ignore
      user = <CreateUserDto>{};
      user.name = requestUser.name;
      user.email = email;
      user.fb_access_token = fb_token;
      user.is_facebook = true;
      //@ts-ignore
      user = await this.usersService.create(user)
    }

    delete user.password;
    delete user.fb_access_token;
    return { ...user, access_token: this.jwtService.sign({userId: user.id}) }
  }
}