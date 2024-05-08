import useSWR from "swr";
import { AxiosResponse } from "axios";
import axiosClient from "@/extends/AxiosClientProvider";

type User = {
  id: string;
  name: string;
  email: string;
};

const fetcher = <T>(key: string): Promise<T> =>
  axiosClient.get(key).then((res: AxiosResponse<T>) => res.data);

export const useUser = () => {
  const { data, error, isLoading } = useSWR<User[]>(
    import.meta.env.VITE_API_HOST + `/users`,
    fetcher,
  );

  console.log("data", data);

  return {
    users: data,
    isLoading,
    isError: error,
  };
};
