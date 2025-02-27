import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ApiTags } from '@nestjs/swagger';
import { createTodo, updateTodo } from './dto/todo.dto';
import { TodoOutput } from './dto/todo-output.dto';

@ApiTags('Todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() todo: createTodo): Promise<TodoOutput> {
    return this.todoService.create(todo);
  }

  @Get()
  async findAll(): Promise<TodoOutput[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TodoOutput> {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() todo: updateTodo,
  ): Promise<TodoOutput> {
    return this.todoService.update(id, todo);
  }

  @Patch(':id/toggle')
  async toggleStatus(@Param('id') id: string): Promise<TodoOutput> {
    return this.todoService.toggleStatus(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.todoService.delete(id);
  }
}
