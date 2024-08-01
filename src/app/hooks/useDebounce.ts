import { useRef } from "react";

export default function useDebounce(
  callback: () => void,
  ms: number,
): () => void {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  function debounceFunction() {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    const newTimer = setTimeout(callback, ms);
    timer.current = newTimer;
  }
  return debounceFunction;
}
