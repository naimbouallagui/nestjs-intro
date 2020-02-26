import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from './passport.strategy';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKeeeey',
    });
  }

  async validate(payload: User, done: Function) {
    const user = await this.userService.validateUserJWT(payload);
    if (!user) {
      return done(new UnauthorizedException(), false)
    } else {
      done(null, user)
    }
  }
}