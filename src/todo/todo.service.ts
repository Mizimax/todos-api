import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.model';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private idCounter: number = 1;
  private readonly filePath = path.resolve(__dirname, 'todos.json');

  constructor() {
    this.loadTodos();
  }

  private loadTodos(): void {
    if (fs.existsSync(this.filePath)) {
      const data = fs.readFileSync(this.filePath, 'utf8');
      const parsedData = JSON.parse(data);
      this.todos = parsedData.todos.map(
        (todo) => new Todo(todo.id, todo.title, todo.description),
      );
      this.idCounter = parsedData.idCounter;
    }
  }

  private saveTodos(): void {
    const data = JSON.stringify(
      { todos: this.todos, idCounter: this.idCounter },
      null,
      2,
    );
    fs.writeFileSync(this.filePath, data, 'utf8');
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException('Todo item not found');
    }
    return todo;
  }

  create(title: string, description: string): Todo {
    const newTodo = new Todo(this.idCounter++, title, description);
    this.todos.push(newTodo);
    this.saveTodos();
    return newTodo;
  }

  update(
    id: number,
    title: string,
    description: string,
    isDone: boolean,
  ): Todo {
    const todo = this.findOne(id);
    if (title) todo.title = title;
    if (description) todo.description = description;
    if (isDone !== undefined) todo.isDone = isDone;
    this.saveTodos();
    return todo;
  }

  delete(id: number): void {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new NotFoundException('Todo item not found');
    }
    this.todos.splice(index, 1);
    this.saveTodos();
  }
}
