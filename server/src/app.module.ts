import { PrismaService } from '../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { HabitsModule } from './habits/habits.module';

@Module({
  imports: [UsersModule, HabitsModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
