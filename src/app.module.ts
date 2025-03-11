import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'vishnu',
      password: '123456789',
      database: 'todo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TaskModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
