import { Controller, Post, Body, Get, Param, Patch, Delete, Put, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.input";
import { TaskService } from "./task.service";
import { Task } from "./entity/task.entity";
import { UpdateTaskDto } from "./dto/update-task.input";



@Controller('tasks')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Post()
    async createTask(@Body() createTask: CreateTaskDto) {
        return this.taskService.create(createTask)
    }

    @Get()
    async getTasks(): Promise<Task[]> {
        return await this.taskService.findAll()
    }

    @Get('/:id')
    async getTask(@Param('id') id: number): Promise<Task> {
        return await this.taskService.findOne(id)
    }

    @Put('/:id')
    async updateTask(
        @Param('id') id: number, 
        @Body() updateTask: UpdateTaskDto
    ): Promise<Task> {
        const updatedTask = await this.taskService.updateOne(id, updateTask);
        return updatedTask;
    }

    // TODO: Delete
    // @Put()
    // async updateTasks(
    //     @Query('ids') ids: string, 
    //     @Body() updateTasks: UpdateTaskDto[]
    // ):  Promise<Task[]> {
    //     const idsArray = ids.split(',').map(id => parseInt(id, 10))
    //     const updatedTasks = []
    //     for (const [index, id] of idsArray.entries()) {
    //         const updatedTask = await this.taskService.updateOne(id, updateTasks[index])
    //         updatedTasks.push(updatedTask)
    //     }
    //     return updatedTasks;
    // }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
    async deleteTask(@Param('id') id: number): Promise<void> {
        await this.taskService.deleteOne(id);
    }
}