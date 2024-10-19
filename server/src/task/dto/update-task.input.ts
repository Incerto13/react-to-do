import { IsString, IsNumber, IsBoolean, IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Timestamp } from 'rxjs';


export class UpdateTaskDto {

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  body?: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsNumber()
  checklistId?: number;

  @IsBoolean()
  completed: boolean = false;

  @IsDate()
  @IsOptional()
  timeOfCompletion?: Date;
}
