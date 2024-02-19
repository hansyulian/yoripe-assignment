import { useCallback } from "react";
import { useRequest } from "./useRequest";


export function useRegisterRequest() {
  const request = useRequest();

  return useCallback((fullname: string, email: string, password: string) => {
    return request.post<RegisterResponse>('auth/register', {
      fullname,
      email,
      password,
    })
  }, [request])
}