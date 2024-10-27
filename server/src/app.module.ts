import { PrismaService } from '../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { HabitsModule } from './habits/habits.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, HabitsModule, AuthModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
