import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdctsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { MailerModule } from './mailer/mailer.module';
import { CommonModule } from './passport/passport.module';
@Module({
  imports: [ProdctsModule, UsersModule, AuthModule, MailerModule,CommonModule,
    MongooseModule.forRoot('mongodb://localhost/nestjs-crud',

      { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }),
    MulterModule.register({
      dest: '/upload',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
