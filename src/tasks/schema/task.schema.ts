import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskStatus } from '../entities/task.entity';

export type TasksDocument = Tasks & Document;

@Schema()
export class Tasks {
  @Prop({ require: true })
  title: string;

  @Prop({ require: true })
  description: string;

  @Prop()
  status: TaskStatus;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);
