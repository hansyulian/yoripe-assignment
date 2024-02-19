import { useCallback, useMemo, useState } from "react";
import { useToast } from "./useToast";

export function useAsyncHandler<T>(callback: () => Promise<T>): [boolean, () => Promise<T | undefined>] {
  const [loading, setIsLoading] = useState(false);
  const toast = useToast();

  const action = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await callback();
      setIsLoading(false);
      return result;
    } catch (err: any) {
      toast.error(err.message)
    }
    setIsLoading(false);
  }, [callback, toast])

  return useMemo(() => {
    return [
      loading,
      action,
    ]
  }, [action, loading])
}