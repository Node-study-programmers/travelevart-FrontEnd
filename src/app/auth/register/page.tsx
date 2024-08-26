"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useLogin from "@/app/hooks/auth/useLogin";
import { RiKakaoTalkFill } from "react-icons/ri";
import Link from "next/link";
import { post } from "@/lib/api";
import { toast } from "react-toastify";
import { logoFont } from "@/app/asset/fonts/fonts";

interface SignupFormInputs {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const [signUpErrorMessage, setSignUpErrormessage] = useState("");
  const { handleLogin } = useLogin();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignupFormInputs> = async (body) => {
    try {
      const response = await post<SignupFormInputs>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/local/join`,
        body,
      );

      setSignUpErrormessage("");

      toast.info("회원가입 완료되었습니다.", { autoClose: 1500 });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.replace("/");
    } catch (error) {
      setSignUpErrormessage("이미 사용중인 이메일입니다.");
    }
  };

  return (
    <div className="bg-[whitesmoke]">
      <div className="w-screen lg:max-w-screen-md mx-auto border-2 border-gray-300">
        <h1
          className={`p-5 bg-white text-left my-auto flex items-center text-3xl ${logoFont.className} border-gray-300 border-b-2 cursor-pointer`}
        >
          <Link href="/">TravelevarT</Link>
        </h1>
        <div className="flex justify-center items-center bg-white flex-col py-20 px-auto">
          <div className="w-full lg:w-1/2 mx-auto flex flex-col gap-10 px-5 lg:px-1">
            <div className="flex justify-center items-center flex-col w-full">
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
                {signUpErrorMessage.length > 0 && (
                  <p className="text-red-500">{signUpErrorMessage}</p>
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
              <div className="pb-5">
                <label htmlFor="confirmPassword" className="block pb-2">
                  비밀번호 확인
                </label>
                <input
                  placeholder="비밀번호 확인 입력"
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "비밀번호 확인을 입력해주세요.",
                    validate: (value) =>
                      value === watch("password") ||
                      "비밀번호가 일치하지 않습니다.",
                  })}
                  className="border border-gray-300 p-2 w-full rounded-lg py-3"
                  autoComplete="off"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
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
