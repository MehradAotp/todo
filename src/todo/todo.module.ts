import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './database/model';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
