import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (user?.email !== email && user?.password !== password) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
