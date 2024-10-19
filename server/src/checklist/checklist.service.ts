import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Checklist } from './entity/checklist.entity';
import { CreateChecklistDto } from './dto/create-checklist.input';
import { UpdateChecklistDto } from './dto/update-checklist.input';
import { Task } from '../task/entity/task.entity';

@Injectable()
export class ChecklistService {
  constructor(
    @InjectRepository(Checklist)
    private readonly checklistRepository: Repository<Checklist>,

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createChecklist: CreateChecklistDto): Promise<Checklist> {
    const { title } = createChecklist;
    const checklist = this.checklistRepository.create({ title });
    return this.checklistRepository.save(checklist);
  }

  async findAll(): Promise<Checklist[]> {
    return this.checklistRepository.createQueryBuilder('checklist')
    .leftJoinAndSelect('checklist.tasks', 'task')
    .getMany()
  }

  async findOne(id: number): Promise<Checklist> {
    const checklist = await this.checklistRepository.createQueryBuilder('checklist')
    .leftJoinAndSelect('checklist.tasks', 'task')
    .where('checklist.id = :id', { id })
    .getOne()

    if (!checklist) {
        throw new NotFoundException(`Checklist with ID: ${id} does not exist`);
      }
    return checklist
  }

  async updateOne(id: number, updateChecklist: UpdateChecklistDto): Promise<Checklist> {
    const checklist = await this.findOne(id);
    if (!checklist) {
      throw new NotFoundException(`Checklist with ID: ${id} does not exist`);
    }
    const { title } = updateChecklist
    checklist.title = title;
    return this.checklistRepository.save(checklist);
  }

  async deleteOne(id: number): Promise<void> {
    const result = await this.checklistRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`Checklist with ID: ${id} does not exist`);
    }
  }
}