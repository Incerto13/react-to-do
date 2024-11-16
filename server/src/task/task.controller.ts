import { Controller, Post, Body, Get, Param, Delete, Put, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from "./dto/create-task.input";
import { TaskService } from "./task.service";
import { Task } from "./entity/task.entity";
import { UpdateTaskDto } from "./dto/update-task.input";


@ApiTags('Task')
@Controller('tasks')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @ApiCreatedResponse({ type: Task })
    @Post()
    async createTask(@Body() createTask: CreateTaskDto) {
        return this.taskService.create(createTask)
    }

    @ApiOkResponse({ type: Task, isArray: true })
    @Get()
    async getTasks(): Promise<Task[]> {
        return await this.taskService.findAll()
    }

    @ApiOkResponse({ type: Task })
    @Get('/:id')
    async getTask(@Param('id') id: number): Promise<Task> {
        return await this.taskService.findOne(id)
    }

    @ApiOkResponse({ type: Task })
    @Put('/:id')
    async updateTask(
        @Param('id') id: number, 
        @Body() updateTask: UpdateTaskDto
    ): Promise<Task> {
        const updatedTask = await this.taskService.updateOne(id, updateTask);
        return updatedTask;
    }

    @ApiNoContentResponse({ description: 'No content' })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
    async deleteTask(@Param('id') id: number): Promise<void> {
        await this.taskService.deleteOne(id);
    }
}