import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTaskDto {
  @IsNotEmpty({ message: 'Task ID is required' })
  @IsString()
  id: string;
}
