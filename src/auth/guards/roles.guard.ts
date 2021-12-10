import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(requiredRoles);
    
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log('/', request.user);
    
    return requiredRoles.some((role) => request.user.role === role);
    // return true;

    // return request.user.role === requiredRoles
  }
}