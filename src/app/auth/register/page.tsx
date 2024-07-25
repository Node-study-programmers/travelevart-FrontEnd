"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useLogin from "@/app/hooks/auth/useKaKaoLogin";
import { logoFont } from "@/font";
import { RiKakaoTalkFill } from "react-icons/ri";
import Link from "next/link";

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
    <div className="bg-[whitesmoke]">
      <div className="w-screen lg:max-w-screen-md mx-auto border-2 border-gray-300">
        <h1
          className={`p-5 bg-white text-left my-auto flex items-center text-3xl ${logoFont.className} border-gray-300 border-b-2`}
        >
          TravelevarT
        </h1>
        <div className="flex justify-center items-center bg-white flex-col py-10 px-auto">
          <div className="lg:w-1/2 mx-auto flex flex-col gap-10">
            <div className="flex justify-center items-center flex-col">
              <span className="text-3xl font-bold">
                나만의 여행 계획 사이트
              </span>
              <br />
              <span className="text-xl font-thin">
                지금 TravelevarT에 가입하세요!
              </span>
            </div>
            <div
              onClick={() => handleLogin("kakao")}
              className="w-full bg-yellow-300 flex justify-center items-center py-3 text-lg rounded-lg gap-1 cursor-pointer"
            >
              <RiKakaoTalkFill className="text-3xl" />
              카카오로 바로 가입하기
            </div>
            <div className="w-full h-[1px] bg-gray-300"></div>
            <div className="font-bold text-2xl">이메일로 가입하기</div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-5"
            >
              <div>
                <label htmlFor="nickname" className="block pb-2">
                  닉네임
                </label>
                <input
                  placeholder="닉네임 입력"
                  id="nickname"
                  type="text"
                  {...register("nickname", {
                    required: "닉네임 입력해주세요.",
                  })}
                  className="border border-gray-300 p-2 w-full rounded-lg py-3"
                />
                {errors.nickname && (
                  <p className="text-red-500">{errors.nickname.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block pb-2">
                  이메일
                </label>
                <input
                  placeholder="abc@example.com"
                  id="email"
                  type="email"
                  {...register("email", { required: "이메일을 입력해주세요." })}
                  className="border border-gray-300 p-2 w-full rounded-lg py-3"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block pb-2">
                  비밀번호
                </label>
                <input
                  placeholder="비밀번호 입력"
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "비밀번호를 입력해주세요.",
                  })}
                  className="border border-gray-300 p-2 w-full rounded-lg py-3"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                회원가입
              </button>
            </form>
            <div className="text-sm text-center">
              이미 회원이신가요?{" "}
              <Link href="/auth/login" className="underline cursor-pointer">
                로그인으로 가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
