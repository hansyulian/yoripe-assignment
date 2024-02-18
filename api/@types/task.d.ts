type TaskStatus = "PENDING" | "COMPLETED" | "DELETED";

type TaskListQuery = {};

type TaskCreatePayload = {
  title: string;
  description: string;
  priority: number;
};

type TaskUpdatePayload = {
  title: string;
  description: string;
  priority: number;
  status: TaskStatus;
};
