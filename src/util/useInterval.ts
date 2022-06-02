import { useEffect, useRef } from 'react';

type CallbackFunction = () => unknown;

export const useInterval = (delay: number, callback: CallbackFunction, dependencies: any[]) => {
  const callbackRef = useRef<CallbackFunction>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let id = setInterval(() => callbackRef.current!(), delay);
    return () => clearInterval(id);
  }, dependencies);
};
