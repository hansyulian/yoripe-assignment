import { useQuery } from "@tanstack/react-query";
import { useRequest } from "./useRequest";

export function useTasks() {
  const request = useRequest();

  return useQuery({
    queryKey: ['task'],
    queryFn: () => request.get<TaskListResponse>('task'),

  })
}