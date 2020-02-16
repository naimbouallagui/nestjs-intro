/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {

    const res = await this.validateUser(user.username, user.password);
    const payload = { username: res.username, sub: res.id, roles: res.roles || ["admin"] };
    if (!res)
      throw new HttpException("Bad Request", 400);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
export const jwtConstants = {
  secret: 'secretKey',
};