import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {}
  async create(createTodoDto: CreateTodoDto) {
    return await this.todoRepository.createTodo(createTodoDto);
  }
  async findAll() {
    return await this.todoRepository.findAllTodos();
  }

  async findOne(id: number) {
    return await this.todoRepository.findOneTodo(id);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.todoRepository.updateTodo(id, updateTodoDto);
  }

  async remove(id: number) {
    return await this.todoRepository.removeTodo(id);
  }
}
