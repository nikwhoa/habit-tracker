import { Body, Controller, Get, Post } from '@nestjs/common';
import { HabitsService } from './habits.service';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  getHabits() {
    return this.habitsService.getHabits();
  }

  @Post('create-habit')
  createHabit(@Body('title') title: string) {
    return this.habitsService.createHabit(title);
  }
}
