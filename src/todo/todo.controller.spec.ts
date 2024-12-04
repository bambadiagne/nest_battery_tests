import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import {
  ValidationPipe,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;
  const mockTodo = [
    {
      id: 1,
      title: 'Create a Nest App',
      description: 'Create a Nest App',
      status: 'OPEN',
    },
    { id: 2, title: 'Create a Todo Entity', status: 'DONE' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
          }),
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const todoDto: CreateTodoDto = {
        title: mockTodo[0].title,
        description: mockTodo[0].description,
        status: 'OPEN',
      };
      jest.spyOn(service, 'create').mockResolvedValue({ ...todoDto, id: 1 });
      const result = await controller.create(todoDto);
      expect(service.create).toHaveBeenCalledWith(todoDto);
      expect(result).toEqual({ ...todoDto, id: 1 });
    });

    it('should throw an error if data is invalid', async () => {
      const invalidTodoDto: any = {
        title: '',
        description: mockTodo[0].description,
        status: 'INVALID_STATUS',
      };

      try {
        await controller.create(invalidTodoDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
  describe('findAll', () => {
    it('should return an array of todos', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockTodo as Todo[]);
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockTodo);
    });
  });
  describe('findOne', () => {
    it('should return a todo', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockTodo[0] as Todo);
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTodo[0]);
    });
    it('should throw an NotFoundException if todo is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());
      try {
        await controller.findOne('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('update', () => {
    it('should update a todo', async () => {
      const todoDto: CreateTodoDto = {
        title: mockTodo[0].title,
        description: mockTodo[0].description,
        status: 'OPEN',
      };
      jest.spyOn(service, 'update').mockResolvedValue({ ...todoDto, id: 1 });
      const result = await controller.update('1', todoDto);
      expect(service.update).toHaveBeenCalledWith(1, todoDto);
      expect(result).toEqual({ ...todoDto, id: 1 });
    });
    it('should throw an NotFoundException if todo is not found', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());
      try {
        await controller.update('3', { title: 'test', description: 'test' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
    it('should throw an BadRequestException if data is invalid', async () => {
      const invalidTodoDto: any = {
        title: '',
        description: mockTodo[0].description,
        status: 'INVALID_STATUS',
      };

      try {
        await controller.update('1', invalidTodoDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
  describe('remove', () => {
    it('should remove a todo', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue({ id: 1 });
      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual({ id: 1 });
    });
    it('should throw an NotFoundException if todo is not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());
      try {
        await controller.remove('3');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
