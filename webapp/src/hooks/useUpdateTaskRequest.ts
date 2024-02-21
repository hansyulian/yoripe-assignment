import { useCallback } from "react";
import { useRequest } from "./useRequest";


export function useUpdateTaskRequest() {
  const request = useRequest();

  return useCallback((id: string, data: TaskForm) => {
    return request.put<Task>(`task/${id}`, data);
  }, [request])
}