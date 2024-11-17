import { Controller, Post, Body, Get, Param, Delete, HttpCode, HttpStatus, Put } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from "./dto/create-category.input";
import { CategoryService } from "./category.service";
import { Category } from "./entity/category.entity";
import { UpdateCategoryDto } from "./dto/update-category.input";


@ApiTags('Category')
@Controller('categories')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @ApiCreatedResponse({ type: Category })
    @Post()
    async createCategory(@Body() createCategory: CreateCategoryDto) {
        return this.categoryService.create(createCategory)
    }

    @ApiOkResponse({ type: Category, isArray: true })
    @Get()
    async getCategories(): Promise<Category[]> {
        return await this.categoryService.findAll()
    }

    @ApiOkResponse({ type: Category })
    @Get('/:id')
    async getCategory(@Param('id') id: number): Promise<Category> {
        return await this.categoryService.findOne(id)
    }

    @ApiOkResponse({ type: Category })
    @Put(':id')
    async updateOne(
        @Param('id') id: number, 
        @Body() updateCategory: UpdateCategoryDto
    ): Promise<Category> {
        const updatedCategory = await this.categoryService.updateOne(id, updateCategory);
        return updatedCategory;
    }

    @ApiNoContentResponse({ description: 'No content' })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
    async deleteLabel(@Param('id') id: number): Promise<void> {
        await this.categoryService.deleteOne(id);
    }
}