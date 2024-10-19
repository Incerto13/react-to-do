import { ArrayMinSize, IsArray, IsNumber, IsString } from 'class-validator';


export class UpdateChecklistDto {

  @IsString()
  title: string;
}
