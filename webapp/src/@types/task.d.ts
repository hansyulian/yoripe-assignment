type TaskStatus = "PENDING" | "COMPLETED" | "DELETED";
type TaskPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

type TaskForm = {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
}

type TaskCreateData = Omit<Task, 'id' | 'status'>;

type TaskUpdateData = Omit<Task, 'id'>;

type TaskListResponse = ListResponse<Task>;