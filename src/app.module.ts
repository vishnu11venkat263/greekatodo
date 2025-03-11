import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cv84jel2ng1s73a1jlm0-a',
      port: 5432,
      username: 'vishnu',
      password: 'Of3BwpmDxEzeexPhw24MaIVJQEpF6MRy',
      database: 'todo_xj71',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
