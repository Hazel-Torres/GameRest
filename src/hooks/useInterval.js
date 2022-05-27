import { useEffect, useRef } from 'react';

export default function useInterval(callback, delay) {
  const GuardarCallback = useRef();

  useEffect(() => {
    GuardarCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      GuardarCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
