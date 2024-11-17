import { IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateChecklistDto {

  @ApiProperty()
  @IsString()
  title: string;
}
