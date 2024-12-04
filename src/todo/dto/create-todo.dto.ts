import { IsIn, IsString } from 'class-validator';
export const statusArray = ['OPEN', 'IN_PROGRESS', 'DONE'];

export class CreateTodoDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsIn(statusArray)
  status: 'OPEN' | 'IN_PROGRESS' | 'DONE';
}
