import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { DeleteTaskDto } from './dto/delete-user.dto';

@Controller('task')
@ApiTags('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.create(createTaskDto);
  }

  @Get('allTasks')
  @HttpCode(200)
  async getAllTask(@Body() body) {
    return await this.taskService.getTasks(body);
  }

  @Get('task')
  @HttpCode(200)
  async getTaskInfo(@Body() body) {
    return await this.taskService.getTaskInfo(body['id']);
  }

  @Patch('update-task-info/:id')
  @HttpCode(200)
  async specificTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.specificTask(id, updateTaskDto);
  }

  @Delete('')
  @HttpCode(200)
  async deleteTask(@Body() body: DeleteTaskDto) {
    return await this.taskService.delete(body['id']);
  }
}
