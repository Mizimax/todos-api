export class Todo {
  id: number;
  title: string;
  description: string;
  isDone: boolean;

  constructor(id: number, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isDone = false;
  }
}
