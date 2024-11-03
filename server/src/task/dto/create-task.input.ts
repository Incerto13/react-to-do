import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateTaskDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  body?: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number

  @IsNumber()
  checklistId?: number;

  @IsBoolean()
  completed: boolean = false;

  @IsDate()
  @IsOptional()
  timeOfCompletion?: Date;
}
