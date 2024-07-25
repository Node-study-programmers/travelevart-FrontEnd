"use client";

import useLogin from "@/app/hooks/auth/useKaKaoLogin";
import { logoFont } from "@/font";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiKakaoTalkFill } from "react-icons/ri";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[whitesmoke] min-h-screen flex flex-col justify-center items-center">
      <div className="w-screen lg:max-w-screen-md mx-auto border-2 border-gray-300 bg-white rounded-lg">
        <h1
          className={`p-5 bg-white text-left my-auto flex items-center text-3xl ${logoFont.className} border-gray-300 border-b-2`}
        >
          TravelevarT
        </h1>
        <div className="flex flex-col py-10 px-6 lg:px-12">
          <div className="flex flex-col gap-10">
            <div className="flex justify-center items-center flex-col py-20 lg:py-40 px-auto gap-5">
              <h1 className="text-3xl font-bold">로그인</h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5 min-w-[350px]"
              >
                <div>
                  <label htmlFor="email" className="block pb-2">
                    이메일
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="이메일 입력"
                    {...register("email", { required: "Email is required" })}
                    disabled={isLoading}
                    className="border border-gray-300 p-2 w-full rounded-lg py-3"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {typeof errors.email === "string"
                        ? errors.email
                        : errors.email?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block pb-2">
                    비밀번호
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="비밀번호 입력"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    disabled={isLoading}
                    className="border border-gray-300 p-2 w-full rounded-lg py-3"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {typeof errors.password === "string"
                        ? errors.password
                        : errors.password?.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
                <div className="w-full h-[1px] bg-gray-300 my-6"></div>
                <div
                  onClick={() => handleLogin("kakao")}
                  className="w-full bg-yellow-300 flex justify-center items-center py-3 text-lg rounded-lg gap-1 cursor-pointer"
                >
                  <RiKakaoTalkFill className="text-3xl" />
                  카카오로 로그인 하기
                </div>
                <div className="text-sm text-center">
                  아직 회원이 아니신가요?{" "}
                  <Link
                    href="/auth/register"
                    className="underline cursor-pointer text-black"
                  >
                    회원 가입으로 가기
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
