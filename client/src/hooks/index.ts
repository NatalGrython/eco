import { MutableRefObject, useCallback, useEffect, useRef } from "react";

export const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | null>,
  handler: (event: MouseEvent) => any,
  when: boolean = true
) => {
  const savedHandler = useRef(handler);

  const memoizedCallback = useCallback((e: MouseEvent) => {
    if (ref && ref.current && !ref.current.contains(e.target as Element)) {
      savedHandler.current(e);
    }
  }, []);

  useEffect(() => {
    savedHandler.current = handler;
  });

  useEffect(() => {
    if (when) {
      document.addEventListener("click", memoizedCallback, true);
      //@ts-ignore
      document.addEventListener("ontouchstart", memoizedCallback, true);

      return () => {
        document.removeEventListener("click", memoizedCallback, true);
        //@ts-ignore
        document.removeEventListener("ontouchstart", memoizedCallback, true);
      };
    }
  }, [ref, handler, when]);
};
