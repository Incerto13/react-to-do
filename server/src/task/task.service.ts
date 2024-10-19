import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
import { Category } from '../category/entity/category.entity';
import { CreateTaskDto } from './dto/create-task.input';
import { UpdateTaskDto } from './dto/update-task.input';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createTask: CreateTaskDto): Promise<Task> {
    const { title, body, categoryId, checklistId } = createTask;
    const task = this.taskRepository.create({ 
        title, 
        body, 
        categoryId,
        checklistId
    });
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.createQueryBuilder('task')
    // .leftJoinAndSelect('task.category', 'category')  // Load the 'category' relation
    // .andWhere('task.checklistId IS NULL')
    .getMany()
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.createQueryBuilder('task')
        // .leftJoinAndSelect('task.category', 'category')  // Load the 'category' relation 
        .where('task.id = :id', { id }) 
        // .andWhere('task.checklistId IS NULL')
        .getOne();

    if (!task) {
        throw new NotFoundException(`Task with ID: ${id} does not exist`);
      }
    return task
  }

  async updateOne(id: number, updateTask: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID: ${id} does not exist`);
    }
    const { title, body, categoryId, completed } = updateTask

    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    console.log('title: ', title)
    console.log('body: ', body)
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~')

    task.title = title;
    task.body = body;

    // update category
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
        throw new NotFoundException(`Category with ID: ${categoryId} does not exist`);
    }
    task.categoryId = categoryId;
    // task.category = category; 

    // update timeOfCompletion (note: only tasks in checklists can be completed/uncompleted)
    if (task.completed !== completed) {
        if (!task.completed && completed) {
            task.completed = completed;
            task.timeOfCompletion = new Date();
        }
        if (task.completed && !completed) {
            task.completed = completed;
            task.timeOfCompletion = null;
        }
    }

    await this.taskRepository.save(task);
    return task;
  }



  async deleteOne(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`Task with ID: ${id} does not exist`);
    }
  }
}