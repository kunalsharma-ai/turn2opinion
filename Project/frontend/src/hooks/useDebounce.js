import { useEffect } from "react";

export default function useDebounce(callback, delay = 500, deps = []) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(timeout);
  }, [...deps, delay]);
}