import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Enter Task',
    example: 'Do Yoga',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Enter Due Date',
    example: '',
  })
  dueDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Enter Status',
    example: 'Pending',
  })
  status: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Enter Priority',
    example: 'Medium',
  })
  priority: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'isActive',
    example: 'true',
  })
  isActive: boolean;
}
