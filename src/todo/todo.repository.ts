import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoRepository extends Repository<Todo> {
  constructor(dataSource: DataSource) {
    super(Todo, dataSource.createEntityManager());
  }
  async createTodo(createTodoDto: CreateTodoDto) {
    const todo = await this.create(createTodoDto);
    return await this.save(todo);
  }

  async findAllTodos() {
    return await this.find();
  }

  async findOneTodo(id: number) {
    const todo = await this.findOneBy({ id });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    const { title, description, status } = updateTodoDto;
    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    todo.status = status ?? todo.status;
    return await this.save(todo);
  }

  async removeTodo(id: number) {
    const todo = await this.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    await this.remove(todo);
    return { id };
  }
}
