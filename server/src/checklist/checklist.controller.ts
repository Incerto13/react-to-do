import { Controller, Post, Body, Get, Param, Delete, HttpStatus, HttpCode, Put } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { ChecklistService } from "./checklist.service";
import { Checklist } from "./entity/checklist.entity";
import { CreateChecklistDto } from "./dto/create-checklist.input";
import { UpdateChecklistDto } from "./dto/update-checklist.input";


@ApiTags('Checklist')
@Controller('checklists')
export class ChecklistController {
    constructor(
        private readonly checklistService: ChecklistService
    ) { }

    @ApiCreatedResponse({ type: Checklist })
    @Post()
    async createChecklist(@Body() createChecklist: CreateChecklistDto) {
        return this.checklistService.create(createChecklist)
    }

    @ApiOkResponse({ type: Checklist, isArray: true })
    @Get()
    async getChecklists(): Promise<Checklist[]> {
        return await this.checklistService.findAll()
    }

    @ApiOkResponse({ type: Checklist })
    @Get('/:id')
    async getChecklist(@Param('id') id: number): Promise<Checklist> {
        return await this.checklistService.findOne(id)
    }

    @ApiOkResponse({ type: Checklist })
    @Put(':id')
    async updateChecklist(
        @Param('id') id: number, 
        @Body() updateChecklist: UpdateChecklistDto
    ): Promise<Checklist> {
        const updatedChecklist = await this.checklistService.updateOne(id, updateChecklist);
        return updatedChecklist;
    }

    @ApiNoContentResponse({ description: 'No content' })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
    async deleteChecklist(@Param('id') id: number): Promise<void> {
        await this.checklistService.deleteOne(id);
    }
}