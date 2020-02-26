/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, HttpException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.interface';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel('User') private readonly userModel: Model<User>
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({username: username}).exec();
    const res = await bcrypt.compareSync( pass, user.password);
    if (user && res) {
      return user;
    } else {
      return null;
    }
  }

  async login(user: any) {
    const res = await this.validateUser(user.username, user.password);
    if (!res)
      throw new HttpException("Bad Request", 400);
      else {
        res.password = null;
    return {
      access_token: jwt.sign({data: res, exp: Math.floor(Date.now()/1000) + (3600 *24)},'secretKeeeey'),
    };
  }
  }

}

