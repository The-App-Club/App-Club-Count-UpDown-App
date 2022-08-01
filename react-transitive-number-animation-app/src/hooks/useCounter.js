import {useState} from 'react';

const useCounter = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((count) => {
      return count + 1;
    });
  };

  const decrementCount = () => {
    setCount((count) => {
      return count - 1;
    });
  };

  return [count, {setCount, incrementCount, decrementCount}];
};

export {useCounter};
