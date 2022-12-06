import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailModule } from 'src/mail/mail.module';
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [MailModule, HttpModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
