import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskEntity } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTaskProvider } from './providers/createTask.providers';
import { GetTasksProvider } from './providers/getTasks.providers';
import { TaskUpdateProvider } from './providers/updateTask.providers';
import { TaskDeleteProvider } from './providers/deleteTask.providers';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],

  providers: [
    CreateTaskProvider,
    GetTasksProvider,
    TaskUpdateProvider,
    TaskDeleteProvider,
    TaskService,
  ],
  exports: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
