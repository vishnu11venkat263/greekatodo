import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'task/entities/task.entity';
import { ErrorMessage, SuccessMessage } from 'task/locale';
import { Repository } from 'typeorm';

@Injectable()
export class CreateTaskProvider {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(data) {
    try {
      // Check if the username already exists
      const existingTask = await this.taskRepository.findOne({
        where: { name: data.name },
      });
      if (existingTask) {
        throw new ConflictException(ErrorMessage.existingTask);
      }

      // Create a new user instance
      const newTask = this.taskRepository.create(data);

      console.log('new', newTask);

      // Save the user in the database
      const savedTask = await this.taskRepository.save(newTask);

      // Return structured success response

      return {
        statusCode: HttpStatus.OK,
        message: SuccessMessage.creationSuccess,
        data: savedTask,
      };
    } catch (error) {
      // Handle unexpected errors gracefully
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ErrorMessage.creationFailed,
          error: error ? error.message : null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
