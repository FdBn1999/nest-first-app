import { Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tasks, TasksDocument } from './schema/task.schema';
import { TaskStatus } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks.name) private tasksModel: Model<TasksDocument>,
  ) {}

  async getAllTasks() {
    return await this.tasksModel.find();
  }

  async createTask(task: CreateTaskDto) {
    const createdTask = await this.tasksModel.create({
      ...task,
      status: TaskStatus.PENDING,
    });

    return createdTask;
  }

  async updateTask(id: string, updatedFields: UpdateTaskDto) {
    return await this.tasksModel.updateOne({ id }, updatedFields);
  }

  async getTaskById(id: string) {
    return await this.tasksModel.findById(id);
  }

  async deleteTask(id: string) {
    this.tasksModel.deleteOne({ id });
  }
}
