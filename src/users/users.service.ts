import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {

  constructor(private mailService: MailService) {}

  async create(createUserDto: CreateUserDto) {
    
    // @ts-ignore
    const user = User.create(createUserDto);
    // @ts-ignore
    await user.save();
    // @ts-ignore
    delete user.password;
    // @ts-ignore
    delete user.fb_access_token;
    if(user){
      // @ts-ignore
      const dbUser = await this.findById(user.id);
      
      this.mailService.sendWelcomeMail(dbUser);
    }

    return user;
  }

  // @ts-ignore
  async showById(id: number): Promise<User> {
    const user = await this.findById(id);
    if(user && user.password){
      delete user.password;
    }

    return user;
  }

  async findById(id: number) {
    // @ts-ignore
    return await User.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string) {
    // @ts-ignore
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }
}