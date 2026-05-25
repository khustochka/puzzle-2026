import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {

  const [value, setValue] = useState<T>(() => {
    const readVal = localStorage.getItem(key)
    if (readVal) return JSON.parse(readVal);
    else return initialValue
  })

  useEffect(() => {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value])

  return [value, setValue]
}
