import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class createTodo {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsBoolean()
  isDone: boolean;
}

export class updateTodo {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
