import { useCallback, useMemo, useState } from "react";
import { useToast } from "./useToast";

export function useAsyncHandler<Callback extends (...args: any[]) => Promise<any>>(callback: Callback) {
  const [loading, setIsLoading] = useState(false);
  const toast = useToast();

  const action = useCallback(async (...args: Parameters<Callback>) => {
    setIsLoading(true);
    try {
      const result = await callback(...args);
      setIsLoading(false);
      return result;
    } catch (err: any) {
      toast.error(err.message)
    }
    setIsLoading(false);
  }, [callback, toast]) as Callback;

  return useMemo(() => {
    return {
      loading,
      action,
    }
  }, [action, loading])
}