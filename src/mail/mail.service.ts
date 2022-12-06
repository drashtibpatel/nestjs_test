import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendWelcomeMail(user: User) {
    
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to awesome App!',
      template: './welcome', // `.hbs` extension is appended automatically
      context: { 
        name: user.name
      },
    }).then( res => {
        console.log('sendgrid response');
        console.log(res);
        
        
    } );
  }
}
