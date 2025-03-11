import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'task/entities/task.entity';
import { ErrorMessage, SuccessMessage } from 'task/locale';
import { Repository } from 'typeorm';

@Injectable()
export class TaskUpdateProvider {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  async updateUser(id, data) {
    try {
      // Find if user exists
      const user = await this.tasksRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: ErrorMessage.taskNotFound,
        });
      }

      // Apply updates
      await this.tasksRepository.update({ id: id }, data);

      // Fetch updated user
      const updatedUser = await this.tasksRepository.findOne({ where: { id } });

      return {
        statusCode: HttpStatus.OK,
        message: SuccessMessage.updateSuccess,
        data: updatedUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ErrorMessage.updateFailed,
          error: error ? error.message : null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
