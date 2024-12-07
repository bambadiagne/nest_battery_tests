import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';

describe('Todos E2E Tests', () => {
  const mockTodo = [
    {
      id: 1,
      title: 'Create a Nest App',
      description: 'Create a Nest App',
      status: 'OPEN',
    },
    { id: 2, title: 'Create a Todo Entity', status: 'DONE' },
  ];
  let app: INestApplication;
  let configService: ConfigService;
  beforeAll(async () => {
    configService = new ConfigService();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (config: ConfigService) => config.get('database'),
          inject: [ConfigService],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Todo POST /todos', () => {
    it('should create a todo', () => {
      const todo: CreateTodoDto = {
        title: mockTodo[0].title,
        description: mockTodo[0].description,
        status: 'OPEN',
      };
      return request(app.getHttpServer())
        .post('/todos')
        .send(todo)
        .expect(201)
        .expect((res) => {
          expect(res.body.status).toEqual(mockTodo[0].status);
        });
    });
    it('should not create a todo with invalid data', () => {
      const todo = {
        title: mockTodo[0].title,
        description: mockTodo[0].description,
        status: 'INVALID',
      };
      return request(app.getHttpServer())
        .post('/todos')
        .send(todo)
        .expect(400)
        .expect((res) => {
          expect(res.body.error).toEqual('BadRequestException');
        });
    });
  });
  describe('Todo GET /todos', () => {
    it('should return all todos', () => {
      return request(app.getHttpServer())
        .get('/todos')
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toEqual(1);
        });
    });
  });
  describe('Todo GET /todos/:id', () => {
    it('should return a todo by id', () => {
      return request(app.getHttpServer())
        .get('/todos/1')
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toEqual(1);
        });
    });
    it('should return a NotFoundException when todo is not found and 404 status code', () => {
      return request(app.getHttpServer())
        .get('/todos/10')
        .expect(404)
        .expect((res) => {
          expect(res.body.error).toEqual('NotFoundException');
        });
    });
  });
  describe('Todo PATCH /todos/:id', () => {
    it('should update a todo by id', () => {
      const todo = {
        title: mockTodo[0].title,
        description: mockTodo[0].description,
        status: 'DONE',
      };
      return request(app.getHttpServer())
        .patch('/todos/1')
        .send(todo)
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toEqual('DONE');
        });
    });
    it('should not update a todo with invalid data', () => {
      const todo = {
        title: mockTodo[0].title,
        description: mockTodo[0].description,
        status: 'INVALID',
      };
      return request(app.getHttpServer())
        .patch('/todos/1')
        .send(todo)
        .expect(400)
        .expect((res) => {
          expect(res.body.error).toEqual('BadRequestException');
        });
    });
    it('should return a NotFoundException when todo is not found and 404 status code', () => {
      return request(app.getHttpServer())
        .patch('/todos/10')
        .expect(404)
        .expect((res) => {
          expect(res.body.error).toEqual('NotFoundException');
        });
    });
  });
  describe('Todo DELETE /todos/:id', () => {
    it('should delete a todo by id', () => {
      return request(app.getHttpServer())
        .delete('/todos/1')
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toEqual(1);
        });
    });
    it('should return a NotFoundException when todo is not found and 404 status code', () => {
      return request(app.getHttpServer())
        .delete('/todos/10')
        .expect(404)
        .expect((res) => {
          expect(res.body.error).toEqual('NotFoundException');
        });
    });
  });
});
