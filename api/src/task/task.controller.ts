import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Body,
  Delete,
  Put,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { extractor } from "src/util/extractor";
import { TaskCreatePayload, TaskUpdatePayload } from "src/models/task.schema";

const taskExtractor = extractor([
  "id",
  "title",
  "description",
  "status",
  "priority",
]);

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  async list(@Req() req: AuthenticatedRequest, @Query() query: any) {
    const { user } = req;
    const result = await this.taskService.list(user.id, query);
    return {
      count: result.count,
      records: taskExtractor(result.records),
    };
  }

  @Get(":id")
  async get(@Req() req: AuthenticatedRequest, @Param("id") id: string) {
    const { user } = req;
    const record = await this.taskService.get(user.id, id);
    return taskExtractor(record);
  }

  @Post()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) payload: TaskCreatePayload,
  ) {
    const { user } = req;
    const record = await this.taskService.create(user.id, payload);
    return taskExtractor(record);
  }

  @Put(":id")
  async update(
    @Req() req: AuthenticatedRequest,
    @Param("id") id: string,
    @Body(new ValidationPipe()) payload: TaskUpdatePayload,
  ) {
    const { user } = req;
    const record = await this.taskService.update(user.id, id, payload);
    return taskExtractor(record);
  }

  @Delete(":id")
  async remove(@Req() req: AuthenticatedRequest, @Param("id") id: string) {
    const { user } = req;
    const record = await this.taskService.remove(user.id, id);
    return taskExtractor(record);
  }
}
