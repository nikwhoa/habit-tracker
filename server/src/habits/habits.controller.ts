import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  getHabits() {
    return this.habitsService.getHabits();
  }

  @Post()
  @UseGuards(AuthGuard)
  createHabit(@Body('title') title: string, @Request() req) {
    return this.habitsService.createHabit(title, req.user.sub);
  }
}
