import { useEffect, useState } from 'react';
import { debounce, isEqual } from 'lodash-es';

interface IUseDebounceProps<T> {
  valueWatch: T;
  timeout?: number;

  callback(value: T): void;
}

export const useDebounce = <T>({ valueWatch, callback, timeout = 300 }: IUseDebounceProps<T>) => {
  const [value, setValue] = useState<T>(valueWatch);

  const handleDebouncedInput = debounce((data: T) => {
    if (!isEqual(value, data)) {
      setValue(data);
      callback(data);
    }
  }, timeout);

  useEffect(() => {
    handleDebouncedInput(valueWatch);

    return () => {
      handleDebouncedInput.cancel();
    };
  }, [valueWatch, handleDebouncedInput]);
};
