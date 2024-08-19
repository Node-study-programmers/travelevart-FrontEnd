import { post } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export default function usePostNewPost() {
  return useMutation<void, unknown, FormData>({
    mutationFn: (formData: FormData, id?: number) => {
      console.log(formData);
      return post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
}
