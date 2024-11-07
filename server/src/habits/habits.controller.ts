import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  @UseGuards(AuthGuard)
  getHabits(@Request() req) {
    return this.habitsService.getHabits(req.user.sub);
  }

  @Post()
  @UseGuards(AuthGuard)
  createHabit(@Body('title') title: string, @Request() req) {
    return this.habitsService.createHabit(title, req.user.sub);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  updateHabit(@Param('id') id: number, @Body() body: any, @Request() req) {
    return this.habitsService.updateHabit(Number(id), req.user.sub, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteHabit(@Param('id') id: number, @Request() req) {
    return this.habitsService.deleteHabit(Number(id), req.user.sub);
  }
}
