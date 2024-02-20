import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsString } from "class-validator";
import mongoose, { HydratedDocument } from "mongoose";
export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true, default: 0 })
  priority: string;
  @Prop({ required: true, default: "PENDING" })
  status: TaskStatus;
  @Prop({ default: Date.now() })
  updatedAt: Date;
  @Prop({ default: Date.now() })
  createdAt: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  userId: string;
}
export const TaskSchema = SchemaFactory.createForClass(Task);

export class TaskCreatePayload {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  priority: string;
}

export class TaskUpdatePayload {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  priority: number;
  @IsString()
  status: TaskStatus;
}
