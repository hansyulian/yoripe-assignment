import { useCallback } from "react";
import { useRequest } from "./useRequest";


export function useDeleteTaskRequest() {
  const request = useRequest();

  return useCallback((id: string) => {
    return request.delete<Task>(`task/${id}`);
  }, [request])
}