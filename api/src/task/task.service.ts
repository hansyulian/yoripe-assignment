import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from "../models/task.schema";
import { TaskNotFoundException } from "src/exceptions/TaskNotFoundException";
import { assignValues } from "src/util/assignValues";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) { }

  async list(userId: string, query: TaskListQuery) {
    const queryBuilder = this.taskModel.find({
      userId,
      status: { $ne: "DELETED" }
    });
    const [count, records] = await Promise.all([
      queryBuilder.clone().countDocuments().exec(),
      queryBuilder.exec(),
    ]);
    return {
      count,
      records,
    };
  }

  async create(userId: string, data: TaskCreatePayload) {
    const createData = {
      userId,
    };
    assignValues(createData, data, ["title", "description", "priority"]);
    const newRecord = new this.taskModel(createData);
    return newRecord.save();
  }

  async get(userId: string, id: string) {
    const record = await this.taskModel.findById(id);
    if (!record) {
      throw new TaskNotFoundException();
    }
    if (record.userId.toString() !== userId) {
      throw new TaskNotFoundException();
    }
    return record;
  }

  async update(userId: string, id: string, data: TaskUpdatePayload) {
    const record = await this.get(userId, id);
    assignValues(record, data, ["title", "description", "priority", "status"]);
    return record.save();
  }

  async remove(userId: string, id: string) {
    const record = await this.get(userId, id);
    record.status = "DELETED";
    return record.save();
  }
}
