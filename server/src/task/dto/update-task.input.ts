import { IsString, IsNumber, IsBoolean, IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Timestamp } from 'rxjs';



export class UpdateTaskDto {

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  body?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

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
