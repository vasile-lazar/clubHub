import { useCallback, useState } from 'react';

export function useForm<T extends Record<string, string>>(
  initialValues: T
): {
  values: T;
  setValue: (key: keyof T, value: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  reset: () => void;
} {
  const [values, setValues] = useState<T>(initialValues);

  const setValue = useCallback((key: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const reset = useCallback(() => setValues(initialValues), [initialValues]);

  return { values, setValue, handleChange, reset };
}
