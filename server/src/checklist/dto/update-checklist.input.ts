import { IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";


export class UpdateChecklistDto {

  @ApiProperty()
  @IsString()
  title: string;
}
