import React, { useState } from "react";
import axios, { InternalAxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";

// デフォルト config の設定
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export function AxiosClientProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    // リクエスト インターセプター
    const requestInterceptors = axiosClient.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        setLoading(true);

        if (config.headers !== undefined) {
          const authority = sessionStorage.getItem("AUTHORITY");
          console.log("config", authority);
          if (authority) {
            const json = JSON.parse(authority);
            config.headers.Authorization = `Bearer ${json.access_token}`;
          }
          // const accessToken = getAccessToken()
          // if (accessToken) {
          //   config.headers.Authorization = `Bearer ${accessToken}`
          // }
        }
        return config;
      },
    );

    // レスポンス インターセプター
    const responseInterceptor = axiosClient.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      (error) => {
        setLoading(false);

        switch (error.response?.status) {
          case 401:
            // 認証エラーの場合は、ログインフォームへリダイレクト
            navigate("/login");
            break;
          default:
            break;
        }
        return Promise.reject(error);
      },
    );

    // クリーンアップ
    return () => {
      axiosClient.interceptors.request.eject(requestInterceptors);
      axiosClient.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <>
      {loading && <Loading visible={loading} />}
      {children}
    </>
  );
}

export default axiosClient;
