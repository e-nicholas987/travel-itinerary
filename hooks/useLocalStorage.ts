import { useCallback } from "react";
import { toast } from "sonner";

const isBrowser = () => typeof window !== "undefined";

interface UseLocalStorageHelpers {
  getItem: <T>(key: string) => T | null;
  setItem: <T>(key: string, value: T) => boolean;
  removeItem: (key: string) => boolean;
}

export function useLocalStorage(): UseLocalStorageHelpers {
  const getItem = useCallback(<T>(key: string): T | null => {
    if (!isBrowser()) return null;

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      toast.error(
        `Failed to get item from local storage: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      return null;
    }
  }, []);

  const setItem = useCallback(<T>(key: string, value: T): boolean => {
    if (!isBrowser()) return false;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      toast.error(
        `Failed to save item to local storage: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      return false;
    }
  }, []);

  const removeItem = useCallback((key: string): boolean => {
    if (!isBrowser()) return false;

    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      toast.error(
        `Failed to remove item from local storage: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      return false;
    }
  }, []);

  return {
    getItem,
    setItem,
    removeItem,
  };
}
