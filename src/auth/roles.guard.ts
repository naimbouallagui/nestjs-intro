/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import * as jwt_decode from "jwt-decode";
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  matchRoles(authorisedRoles, candidateRoles) {
    const intersection = candidateRoles.filter(value => -1 !== authorisedRoles.indexOf(value))
    return intersection.length > 0;
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = jwt_decode(request.headers.authorization.split(' ')[1]);
    return this.matchRoles(roles, user.roles);
  }
}
