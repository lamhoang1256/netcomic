import { Dispatch, SetStateAction, useDebugValue, useEffect, useState } from "react";

export const parseJson = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export default function useLocalStorage<T>(
  key: string = "",
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(defaultValue as T);
  useDebugValue(state);
  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) setState(parseJson(item));
  }, [key]);
  useEffect(() => {
    if (state !== defaultValue) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [defaultValue, key, state]);
  return [state, setState];
}
