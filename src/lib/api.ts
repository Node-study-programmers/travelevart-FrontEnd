import { LOCAL_STORAGE_KEY } from "@/constant";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = "http://";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

function interceptorRequestFulfulled(config: InternalAxiosRequestConfig) {
  if (typeof window === "undefined") return config;

  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!accessToken) return config;
  if (!config.headers) return config;

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
}

instance.interceptors.request.use(interceptorRequestFulfulled);

function interceptorResponseFulfilled(res: AxiosResponse) {
  if (res.status >= 200 && res.status < 300) {
    return res.data;
  }

  return Promise.reject(res.data);
}

function interceptorResponseRejected(err: AxiosError) {
  return Promise.reject(new Error(err.message));
}

instance.interceptors.response.use(
  interceptorResponseFulfilled,
  interceptorResponseRejected,
);

export function get<T>(...args: Parameters<typeof instance.get>) {
  return instance.get<T, T>(...args);
}

export function post<T>(...args: Parameters<typeof instance.post>) {
  return instance.post<T, T>(...args);
}

export function put<T>(...args: Parameters<typeof instance.put>) {
  return instance.put<T, T>(...args);
}

export function patch<T>(...args: Parameters<typeof instance.patch>) {
  return instance.patch<T, T>(...args);
}

export function del<T>(...args: Parameters<typeof instance.delete>) {
  return instance.delete<T, T>(...args);
}
