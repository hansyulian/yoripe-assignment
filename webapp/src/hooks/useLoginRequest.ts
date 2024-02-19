import { useCallback } from "react";
import { useRequest } from "./useRequest";


export function useLoginRequest() {
  const request = useRequest();

  return useCallback((email: string, password: string) => {
    return request.post<LoginResponse>('auth/login', {
      email,
      password,
    })
  }, [request])
}