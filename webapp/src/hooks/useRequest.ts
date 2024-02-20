import { useCallback, useMemo } from "react";
import axios, { AxiosRequestConfig } from 'axios';
import { serializeServerException, ServerException } from "../utils/serializeServerException";
import { useAuth } from "../providers/AuthProvider";

export type RequestConfig = AxiosRequestConfig & {

}

export function useRequest() {
  const { isAuthenticated, token } = useAuth();

  const request = useCallback(async <ReturnType>(path: string, config: RequestConfig) => {

    const processedConfig: AxiosRequestConfig = {
      ...config,
      url: `${process.env.REACT_APP_API_PATH}/${path}`,
      headers: config.headers || {},
    }
    if (isAuthenticated) {
      processedConfig.headers!.Authorization = `Bearer ${token}`;
    }
    try {
      const result = await axios(processedConfig);
      return result.data as ReturnType;
    } catch (err: any) {
      if (err.response?.data) {
        throw new Error(serializeServerException(err.response?.data as ServerException));
      }
      throw err;
    }
  }, [isAuthenticated, token])

  const get = useCallback(async <ReturnType, Params = any>(path: string, params?: Params) => {
    return request<ReturnType>(path, {
      method: 'get',
      params,
    })
  }, [request]);

  const post = useCallback(async <ReturnType, Body = any>(path: string, data: Body) => {
    return request<ReturnType>(path, {
      method: 'post',
      data,
    })
  }, [request])
  const put = useCallback(async <ReturnType, Body = any>(path: string, data: Body) => {
    return request<ReturnType>(path, {
      method: 'put',
      data,
    })
  }, [request])
  const del = useCallback(async <ReturnType>(path: string) => {
    return request<ReturnType>(path, {
      method: 'delete',
    })
  }, [request])

  return useMemo(() => {
    return {
      request,
      get,
      post,
      put,
      delete: del,
    }
  }, [del, get, post, put, request])
}