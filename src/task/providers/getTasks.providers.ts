import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'task/entities/task.entity';
import { ErrorMessage, SuccessMessage } from 'task/locale';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class GetTasksProvider {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  async getAllTasks(data) {
    try {
      // Fetch users with pagination
      const [tasks, total] = await this.tasksRepository.findAndCount({
        take: data.limit,
        skip: data.page,
        where: {
          name: data.filter?.name ? ILike(`%${data.filter.name}%`) : undefined,
          status: data.filter?.status
            ? ILike(`%${data.filter.status}%`)
            : undefined,
          priority: data.filter?.priority
            ? ILike(`%${data.filter.priority}%`)
            : undefined,
        },
        order: {
          dueDate: data.sortOrder === 'ASC' ? 'ASC' : 'DESC',
          createdAt: 'DESC', // Secondary sorting
        },
      });

      // Return a structured response with pagination metadata
      return {
        statusCode: HttpStatus.OK,
        message: SuccessMessage.getTasksSuccess,
        data: tasks,
        meta: {
          totalTasks: total,
          currentPage: data.page,
          totalPages: Math.ceil(total / data.limit),
          limit: data.limit,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ErrorMessage.getAllTaskFailed,
          error: error ? error.message : null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTaskInfo(id) {
    try {
      // Fetch user by ID
      const user = await this.tasksRepository.findOne({ where: { id } });
      // Return structured success response
      return {
        statusCode: HttpStatus.OK,
        message: SuccessMessage.getTasksSuccess,
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ErrorMessage.getAllTaskFailed,
          error: error ? error.message : null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
