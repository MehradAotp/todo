import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { Todo, TodoSchema } from './todo/database/model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    MongooseModule.forRoot('mongodb://localhost:27017/todos'),
    TodoModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {}
