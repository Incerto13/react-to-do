import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Category } from '../category/entity/category.entity';
import { Checklist } from '../checklist/entity/checklist.entity';
import { ChecklistModule } from '../checklist/checklist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Category, Checklist]),
    forwardRef(() => TaskModule),
    forwardRef(() => ChecklistModule)
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}