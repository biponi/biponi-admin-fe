import { useEffect, useRef, useCallback } from "react";

const useThrottleEffect = (
  callback: () => void,
  dependencies: any[],
  delay: number
) => {
  const latestCallback = useRef<() => void>(callback);

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);
  //eslint-disable-next-line
  const throttledCallback = useCallback(
    throttle(() => {
      latestCallback.current();
    }, delay),
    [] // Ensure throttle is only created once
  );

  useEffect(() => {
    throttledCallback();
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useThrottleEffect;

export const throttle = (func: (...args: any[]) => void, delay: number) => {
  let lastCall = 0;
  return function (...args: any[]) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
};
