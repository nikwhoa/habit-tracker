import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

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

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }
}
