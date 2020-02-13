import { Controller, Post } from "@nestjs/common";
import { MailerService } from './mailer.service';

@Controller('mail')
export class MailerController {
constructor(private readonly mailerService: MailerService){}
@Post('send')
async sendMail() {
  return this.mailerService.sendMail();
}
}