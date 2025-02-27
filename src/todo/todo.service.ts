import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './database/model';
import { createTodo, updateTodo } from './dto/todo.dto';
import { TodoOutput } from './dto/todo-output.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(todo: createTodo): Promise<TodoOutput> {
    const newTodo = new this.todoModel({
      ...todo,
      isDone: false,
    });

    const savedTodo = await newTodo.save();
    return this.docToDto(savedTodo);
  }

  async findAll(): Promise<TodoOutput[]> {
    const todos = await this.todoModel.find().exec();
    return todos.map(this.docToDto);
  }

  async findOne(id: string): Promise<TodoOutput> {
    const todo = await this.todoModel.findById(id).exec();
    return this.docToDto(todo);
  }

  async update(id: string, todo: updateTodo): Promise<TodoOutput> {
    const updatedTodo = await this.todoModel
      .findByIdAndUpdate(id, todo, {
        new: true,
      })
      .exec();
    return this.docToDto(updatedTodo);
  }

  async toggleStatus(id: string): Promise<TodoOutput> {
    const todo = await this.todoModel.findById(id).exec();
    todo.isDone = !todo.isDone;
    const updatedTodo = await todo.save();
    return this.docToDto(updatedTodo);
  }

  async delete(id: string): Promise<void> {
    await this.todoModel.findByIdAndDelete(id).exec();
  }

  private docToDto(doc: Todo): TodoOutput {
    return {
      _id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      isDone: doc.isDone,
    };
  }
}
