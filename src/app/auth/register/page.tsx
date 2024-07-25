"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useLogin from "@/app/hooks/auth/useKaKaoLogin";

interface SignupFormInputs {
  nickname: string;
  email: string;
  password: string;
}

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin } = useLogin();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignupFormInputs> = async (body) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://7d3e-220-125-131-244.ngrok-free.app/auth/local/join",
        body,
      );
      console.log(data);
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-screen-md bg-red-300 mx-auto">
      <nav>TravelevarT</nav>
      <div className="flex justify-center items-center bg-blue-300 h-screen">
        <div>
          <div onClick={() => handleLogin("kakao")}>kakao</div>
          <h1 className="text-2xl mb-4">회원가입</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="nickname" className="block">
                닉네임
              </label>
              <input
                id="nickname"
                type="text"
                {...register("nickname", {
                  required: "닉네임을 입력해주세요.",
                })}
                className="border border-gray-300 p-2 w-full"
              />
              {errors.nickname && (
                <p className="text-red-500">{errors.nickname.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block">
                이메일
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "이메일을 입력해주세요." })}
                className="border border-gray-300 p-2 w-full"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                })}
                className="border border-gray-300 p-2 w-full"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
