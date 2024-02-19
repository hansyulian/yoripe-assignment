import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";


export function useToast() {

  const success = useCallback((message: string) => {
    return toast.success(message);
  }, [])

  const error = useCallback((message: string) => {
    return toast.error(message);
  }, [])


  return useMemo(() => {
    return {
      success,
      error,
    }
  }, [error, success])

}