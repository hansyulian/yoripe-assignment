import { useCallback } from "react";
import { useRequest } from "./useRequest";


export function useCreateTaskRequest() {
  const request = useRequest();

  return useCallback((data: TaskForm) => {
    return request.post<Task>('task', data);
  }, [request])
}