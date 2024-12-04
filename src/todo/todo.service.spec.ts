import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { NotFoundException } from '@nestjs/common';

describe('TodoService', () => {
  let service: TodoService;
  let repository: TodoRepository;
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
      providers: [
        TodoService,
        {
          provide: TodoRepository,
          useValue: {
            createTodo: jest.fn(),
            findAllTodos: jest.fn(),
            findOneTodo: jest.fn(),
            updateTodo: jest.fn(),
            removeTodo: jest.fn(),
          },
        },
      ],
    }).compile();
    repository = module.get<TodoRepository>(TodoRepository);
    service = module.get<TodoService>(TodoService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create a todo', async () => {
      const todo = mockTodo[0] as CreateTodoDto;
      jest.spyOn(repository, 'createTodo').mockResolvedValue(todo as Todo);
      const result = await service.create(todo);
      expect(result).toBe(todo);
    });
  });
  describe('findAll', () => {
    it('should return all todos', async () => {
      jest
        .spyOn(repository, 'findAllTodos')
        .mockResolvedValue(mockTodo as Todo[]);
      const result = await service.findAll();
      expect(result).toBe(mockTodo);
    });
  });
  describe('findOne', () => {
    it('should return a todo', async () => {
      const todo = mockTodo[0];
      jest.spyOn(repository, 'findOneTodo').mockResolvedValue(todo as Todo);
      const result = await service.findOne(1);
      expect(result).toBe(todo);
    });
    it('should throw an NotFoundException', async () => {
      jest
        .spyOn(repository, 'findOneTodo')
        .mockRejectedValue(new NotFoundException());
      await expect(service.findOne(4)).rejects.toThrow(NotFoundException);
    });
  });
  describe('update', () => {
    it('should update a todo', async () => {
      const todo = mockTodo[0];
      jest.spyOn(repository, 'updateTodo').mockResolvedValue(todo as Todo);
      const result = await service.update(1, todo as CreateTodoDto);
      expect(result).toBe(todo);
    });
    it('should throw an NotFoundException', async () => {
      jest
        .spyOn(repository, 'updateTodo')
        .mockRejectedValue(new NotFoundException());
      await expect(
        service.update(4, mockTodo[0] as CreateTodoDto),
      ).rejects.toThrow(NotFoundException);
    });
  });
  describe('remove', () => {
    it('should remove a todo', async () => {
      jest
        .spyOn(repository, 'removeTodo')
        .mockResolvedValue({ id: mockTodo[0].id });
      expect(await service.remove(1)).toStrictEqual({ id: 1 });
    });
    it('should throw an NotFoundException', async () => {
      jest
        .spyOn(repository, 'removeTodo')
        .mockRejectedValue(new NotFoundException());
      await expect(service.remove(4)).rejects.toThrow(NotFoundException);
    });
  });
});
