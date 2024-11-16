import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";


export class CreateTaskDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  body?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  categoryId: number

  @ApiProperty()
  @IsNumber()
  checklistId?: number;

  @ApiProperty()
  @IsBoolean()
  completed: boolean = false;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  timeOfCompletion?: Date;
}
