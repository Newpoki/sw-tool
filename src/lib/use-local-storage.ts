import { useCallback, useMemo } from "react";
import type z from "zod";

export const useLocalStorage = <TSchema extends z.ZodType>(
  key: string,
  schema: TSchema,
) => {
  const handleGetValue = useCallback(() => {
    try {
      const raw = localStorage.getItem(key);

      if (raw == null) {
        return null;
      }

      return schema.parse(JSON.parse(raw));
    } catch (error) {
      console.error({ error });
      return null;
    }
  }, [key, schema]);

  const handleSetValue = useCallback(
    (value: z.infer<TSchema>) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error({ error });
      }
    },
    [key],
  );

  return useMemo(
    () => ({
      get: handleGetValue,
      set: handleSetValue,
    }),
    [handleGetValue, handleSetValue],
  );
};
