import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.input';
import { UpdateCategoryDto } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategory: CreateCategoryDto): Promise<Category> {
    const { name } = createCategory;
    const category = this.categoryRepository.create({ name });
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = this.categoryRepository.findOne({ where: { id } });
    if (!category) {
        throw new NotFoundException(`Category with ID: ${id} does not exist`);
      }
    return category
  }

  async updateOne(id: number, updateCategory: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with ID: ${id} does not exist`);
    }
    const { name } = updateCategory
    category.name = name;

    await this.categoryRepository.save(category);
    return category;
  }

  async deleteOne(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`Category with ID: ${id} does not exist`);
    }
  }
}