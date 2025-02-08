"use client";

import { logoFont } from "@/app/asset/fonts/fonts";
import useLogin from "@/app/hooks/auth/useLogin";
import SEO from "@/app/seo/SEO";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { RiKakaoTalkFill } from "react-icons/ri";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const { handleLogin } = useLogin();
  const router = useRouter();

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

      if (!result?.ok) {
        setIsLoginError(true);
      } else {
        setIsLoginError(false);
        router.push("/");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: "test@naver.com",
        password: "qweqwe",
        redirect: false,
      });

      if (!result?.ok) {
        setIsLoginError(true);
      } else {
        setIsLoginError(false);
        router.push("/");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO title="LOGIN" description="로그인을 위한 페이지 입니다." />
      <div className="bg-[whitesmoke] min-h-screen flex flex-col justify-center items-center">
        <div className="w-screen lg:max-w-screen-md mx-auto border-2 border-gray-300 bg-white">
          <h1
            className={`p-5 bg-white text-left my-auto flex items-center text-3xl ${logoFont.className} border-gray-300 border-b-2 cursor-pointer`}
          >
            <Link href="/">TravelevarT</Link>
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
                      {...register("email", {
                        required: "이메일을 입력해주세요.",
                      })}
                      disabled={isLoading}
                      className="border border-gray-300 p-2 w-full rounded-lg py-3"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {String(errors.email.message)}
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
                        required: "비밀번호를 입력해주세요.",
                      })}
                      disabled={isLoading}
                      className="border border-gray-300 p-2 w-full rounded-lg py-3"
                      autoComplete="off"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {String(errors.password.message)}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-center">
                    {isLoginError && (
                      <p className="text-red-500 text-sm">
                        아이디 또는 비밀번호를 다시 확인해주세요.
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
                  <button
                    type="button"
                    onClick={handleGuestLogin}
                    disabled={isLoading}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg"
                  >
                    Guest 로그인
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
    </>
  );
}
