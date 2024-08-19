import { LOCAL_STORAGE_KEY } from "@/constant";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 30000,
});

function interceptorRequestFulfulled(config: InternalAxiosRequestConfig) {
  if (typeof window === "undefined") return config;

  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

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

async function getNewAccessToken(refreshToken: string): Promise<string> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/token`,
      {
        refreshToken,
      },
    );
    return response.data.accessToken;
  } catch (error) {
    throw new Error("Failed to refresh access token");
  }
}

async function interceptorResponseRejected(err: AxiosError) {
  if (typeof window === "undefined") return Promise.reject(err);

  // 권한 없음 에러
  if (err.response?.status === 401) {
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);

    if (!refreshToken) {
      window.location.replace("/login");
      return Promise.reject(new Error("No refresh token available"));
    }

    try {
      // 새로운 액세스 토큰 발급
      const newAccessToken = await getNewAccessToken(refreshToken as string);
      localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, newAccessToken);

      // 원래 요청을 새로운 accessToken으로 다시 시도
      if (err.config) {
        err.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(err.config);
      } else {
        return Promise.reject(
          new Error("Original request config is not available"),
        );
      }
    } catch (tokenError) {
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
      localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
      window.location.replace("/login");
      return Promise.reject(tokenError);
    }
  }

  // 로그인 정보 만료됨
  if (err.response?.status === 403) {
    localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
    localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
    toast.info("로그인 정보가 만료되었습니다. 다시 로그인 해주세요");
    window.location.replace("/");
  }

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
