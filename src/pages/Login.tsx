import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse } from "axios";
import { axiosClient } from "@/extends/AxiosClientProvider";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { z } from "zod";

interface LoginForm {
  username: string;
  password: string;
}

const ValidationScheme = z.object({
  username: z.string().min(1, "ユーザー名は必須です").min(4, "名前は4文字以上で入力してください"),
  password: z
    .string()
    .min(1, "パスワードは必須です")
    .min(6, "パスワードは6文字以上で入力してください"),
});

const Login = () => {
  const [erroMessge, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(ValidationScheme),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    const loginData = data as LoginForm;
    const loginPath = import.meta.env.VITE_API_HOST + "/login/";

    // ログイン API へ POST
    axiosClient
      .post(loginPath, loginData)
      .then((response: AxiosResponse) => {
        console.log(response.data);
        // 認可情報を SessionStorage に設定
        sessionStorage.setItem("AUTHORITY", JSON.stringify(response.data));

        // にリダイレクト
        navigate("/");
      })
      .catch((error) => {
        console.log("エラー", error);
        // console.log(error.response.data);
        if (error.response) setErrorMessage(error.response.data.detail);
        else setErrorMessage("サーバーエラー");
      })
      .finally(() => {});
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          予約管理システム2
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {erroMessge && <p className="text-red-500">{erroMessge}</p>}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="username" className="block mb-2">
                  ユーザー名
                </Label>
                <Input type="username" id="username" {...register("username")} />
                <p className="text-red-500">{errors.username?.message as React.ReactNode}</p>
              </div>
              <div>
                <Label htmlFor="password" className="block mb-2">
                  パスワード
                </Label>
                <Input type="password" id="password" {...register("password")} />
                <p className="text-red-500">{errors.password?.message as React.ReactNode}</p>
              </div>
              <Button type="submit" className="w-full">
                ログイン
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
