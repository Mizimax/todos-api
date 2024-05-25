import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Todo {
    return this.todoService.findOne(Number(id));
  }

  @Post()
  create(@Body() createTodoDto: { title: string; description: string }): Todo {
    const { title, description } = createTodoDto;
    return this.todoService.create(title, description);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateTodoDto: { title: string; description: string; isDone: boolean },
  ): Todo {
    const { title, description, isDone } = updateTodoDto;
    return this.todoService.update(Number(id), title, description, isDone);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.todoService.delete(Number(id));
  }
}
