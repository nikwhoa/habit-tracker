import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class HabitsService {
  constructor(private prisma: PrismaService) {}
  async createHabit(title: string) {
    if (!title) {
      return {
        error: 'Title is required',
      };
    }
    return this.prisma.habit.create({
      data: {
        title,
      },
    });
  }

  async getHabits() {
    return this.prisma.habit.findMany();
  }
}
