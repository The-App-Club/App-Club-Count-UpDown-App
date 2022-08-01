import {useRef, useEffect} from 'react';

const useTimeout = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setTimeout(tick, delay);
      return () => {
        return clearTimeout(id);
      };
    }
  }, [delay]);
};

export {useTimeout};
