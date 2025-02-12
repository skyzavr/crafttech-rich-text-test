import { useEffect, useState } from 'react';

type debounceProps = (value: string, delay: number) => string;

export const useDebounce: debounceProps = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};
