import { useEffect, useRef } from "react";

const useScrollIntoView = <T extends HTMLElement>(dependency: unknown) => {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [dependency]);

  return elementRef;
};

export default useScrollIntoView;
