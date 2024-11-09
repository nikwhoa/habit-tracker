import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

function isConsecutiveDay(date1: Date, date2: Date): boolean {
  const diffTime = Math.abs(date1.getTime() - date2.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

@Injectable()
export class HabitsService {
  constructor(private prisma: PrismaService) {}

  async createHabit(title: string, description: string, userId: number) {
    if (!title) {
      return {
        message: 'Title is required',
      };
    }
    return this.prisma.habit.create({
      data: {
        title,
        description,
        userId,
      },
    });
  }

  async getHabits(userId: number) {
    return this.prisma.habit.findMany({
      where: {
        userId,
      },
    });
  }

  async updateHabit(
    id: number,
    userId: number,
    data: {
      title?: string;
      description?: string;
      frequency?: 'DAILY' | 'WEEKLY' | 'MONTHLY';
      isActive?: boolean;
    },
  ) {
    return this.prisma.habit.update({
      where: { id, userId },
      data,
    });
  }

  async deleteHabit(id: number, userId: number) {
    await this.prisma.habit.delete({
      where: { id, userId },
    });

    return {
      message: 'Habit deleted successfully',
    };
  }

  async trackHabitCompletion(habitId: number, date: Date) {
    return this.prisma.habitCompletion.create({
      data: {
        habitId,
        completedAt: date,
      },
    });
  }

  async getHabitStreak(habitId: number): Promise<number> {
    const completions = await this.prisma.habitCompletion.findMany({
      where: { habitId },
      orderBy: { completedAt: 'desc' },
    });

    let streak = 0;
    let currentDate = new Date();

    for (const completion of completions) {
      const completionDate = completion.completedAt;
      // Check if completion is on the previous day
      if (isConsecutiveDay(currentDate, completionDate)) {
        streak++;
        currentDate = completionDate;
      } else {
        break;
      }
    }

    return streak;
  }

  async getHabitStats(habitId: number, startDate: Date, endDate: Date) {
    const completions = await this.prisma.habitCompletion.findMany({
      where: {
        habitId,
        completedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return {
      totalCompletions: completions.length,
      streak: this.getHabitStreak(habitId),
    };
  }
}
