import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  // simulate a database
  private tasks: Task[] = [
    {
      id: v4(),
      title: 'first task',
      description: 'some task',
      status: TaskStatus.PENDING,
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string) {
    const task: Task = {
      title,
      description,
      status: TaskStatus.PENDING,
      id: v4(),
    };

    this.tasks.push(task);

    return task;
  }

  updateTask(id: string, updatedFields: UpdateTaskDto): Task {
    const task = this.getTaskById(id);
    const updatedTask = Object.assign(task, updatedFields);

    this.tasks = this.tasks.map((task) =>
      task.id === id ? updatedTask : task,
    );

    return updatedTask;
  }

  private getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}
