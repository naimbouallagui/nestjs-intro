import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdctsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ProdctsModule, MongooseModule.forRoot('mongodb://localhost/nestjs-crud', {useNewUrlParser: true, useUnifiedTopology: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
