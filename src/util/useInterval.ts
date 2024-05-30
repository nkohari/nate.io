import { useEffect, useRef } from 'react';

type CallbackFunction = () => unknown;

export const useInterval = (delay: number, callback: CallbackFunction) => {
  const callbackRef = useRef<CallbackFunction>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const interval = setInterval(() => callbackRef.current!(), delay);
    return () => clearInterval(interval);
  }, [delay]);
};
