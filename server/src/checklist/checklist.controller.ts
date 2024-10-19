import { Controller, Post, Body, Get, Param, Patch, Delete, HttpStatus, HttpCode, Put } from "@nestjs/common";
import { ChecklistService } from "./checklist.service";
import { Checklist } from "./entity/checklist.entity";
import { CreateChecklistDto } from "./dto/create-checklist.input";
import { UpdateChecklistDto } from "./dto/update-checklist.input";



@Controller('checklists')
export class ChecklistController {
    constructor(
        private readonly checklistService: ChecklistService
    ) { }

    @Post()
    async createChecklist(@Body() createChecklist: CreateChecklistDto) {
        return this.checklistService.create(createChecklist)
    }

    @Get()
    async getChecklists(): Promise<Checklist[]> {
        return await this.checklistService.findAll()
    }

    @Get('/:id')
    async getChecklist(@Param('id') id: number): Promise<Checklist> {
        return await this.checklistService.findOne(id)
    }

    @Put(':id')
    async updateChecklist(
        @Param('id') id: number, 
        @Body() updateChecklist: UpdateChecklistDto
    ): Promise<Checklist> {
        const updatedChecklist = await this.checklistService.updateOne(id, updateChecklist);
        return updatedChecklist;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
    async deleteChecklist(@Param('id') id: number): Promise<void> {
        await this.checklistService.deleteOne(id);
    }
}