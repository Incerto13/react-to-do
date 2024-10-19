import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checklist } from './entity/checklist.entity';
import { TaskModule} from '../task/task.module';
import { ChecklistService } from './checklist.service';
import { ChecklistController } from './checklist.controller';
import { Task } from 'src/task/entity/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Checklist, Task]),
    forwardRef(() => TaskModule)
  ],
  providers: [ChecklistService],
  controllers: [ChecklistController],
})
export class ChecklistModule {}