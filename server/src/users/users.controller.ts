import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('password') password: string,
  ) {
    //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.userService.createUser(email, name, password);
  }
}
