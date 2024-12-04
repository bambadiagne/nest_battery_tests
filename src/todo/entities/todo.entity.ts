import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { statusArray } from '../dto/create-todo.dto';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ nullable: true })
  description: string;
  @Column({ enum: statusArray })
  status: string;
}
