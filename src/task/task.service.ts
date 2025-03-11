import { Injectable } from '@nestjs/common';
import { CreateTaskProvider } from './providers/createTask.providers';
import { GetTasksProvider } from './providers/getTasks.providers';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskUpdateProvider } from './providers/updateTask.providers';
import { TaskDeleteProvider } from './providers/deleteTask.providers';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskCreateProviders: CreateTaskProvider,
    private readonly getTasksProviders: GetTasksProvider,
    private readonly updateTaskProviders: TaskUpdateProvider,
    private readonly deleteTaskProviders: TaskDeleteProvider,
  ) {}

  async create(taskData) {
    return await this.taskCreateProviders.createTask(taskData);
  }

  async getTasks(data) {
    return await this.getTasksProviders.getAllTasks(data);
  }

  async getTaskInfo(id: number) {
    return await this.getTasksProviders.getTaskInfo(id);
  }

  async specificTask(id: number, data: UpdateTaskDto) {
    return await this.updateTaskProviders.updateUser(id, data);
  }

  async delete(id) {
    return await this.deleteTaskProviders.deleteUser(id);
  }
}
