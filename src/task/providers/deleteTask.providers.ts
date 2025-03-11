import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'task/entities/task.entity';
import { ErrorMessage, SuccessMessage } from 'task/locale';
import { Repository } from 'typeorm';

@Injectable()
export class TaskDeleteProvider {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  async deleteUser(id) {
    const user = await this.tasksRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ErrorMessage.taskNotFound,
      });
    }

    if (user.deletedDate) {
      throw new ConflictException(ErrorMessage.deletedTask);
    }

    const result = await this.tasksRepository.softDelete(id);

    return {
      statusCode: HttpStatus.OK,
      message: SuccessMessage.deleteSuccess,
      data: result,
    };
  }
}
