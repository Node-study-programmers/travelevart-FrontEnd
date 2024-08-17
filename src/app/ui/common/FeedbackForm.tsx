"use client";

import useLogin from "@/app/hooks/auth/useLogin";
import sendFeedback from "@/app/hooks/useSendMail";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import { toast } from "react-toastify";

export default function FeedbackForm() {
  const { register, handleSubmit, setValue } = useForm<{ text: string }>();
  const { userData } = useLogin();
  const [isDisabled, setIsDisabled] = useState(true);

  const onSubmitFeedback = ({ text }: { text: string }) => {
    if (!userData) {
      toast.info("로그인은 필수입니다.");
      return;
    }

    sendFeedback(text);
    setValue("text", "");
    setIsDisabled(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitFeedback)}
      className="flex justify-between mt-2"
    >
      <input
        type="text"
        className="outline-none text-xs rounded-xl w-[85%] p-2"
        {...register("text", {
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length > 0) {
              setIsDisabled(false);
            } else {
              setIsDisabled(true);
            }
          },
        })}
      />
      <button
        className={`w-8 h-8 flex justify-center items-center rounded-full ${
          isDisabled ? "bg-secondary" : "bg-primary"
        }`}
        disabled={isDisabled}
      >
        <IoIosSend className="text-white" />
      </button>
    </form>
  );
}
