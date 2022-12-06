import { IsEmail, IsNotEmpty, IsEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsEmpty()
  fb_access_token: string;

  @IsEmpty()
  is_facebook: string;

}