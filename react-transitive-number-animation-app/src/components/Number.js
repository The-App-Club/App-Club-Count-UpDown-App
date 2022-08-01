import {useState, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/css';
import {Flipper, Flipped} from 'react-flip-toolkit';

const StyledCounter = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 6rem;
  height: 100%;
  width: 100%;
  border-width: 8px;
  border-style: solid;
  border-image: linear-gradient(
    135deg,
    rgba(39, 111, 232, 1) 32%,
    rgba(53, 210, 219, 1) 92%
  );
  border-image-slice: 1;
`;

const Number = ({tik, count, lastValue, isUp = true}) => {
  const currentDomRef = useRef(null);
  const previousDomRef = useRef(null);
  useEffect(() => {
    const currentDom = currentDomRef.current;
    const a = currentDom.animate(
      [
        {
          transform: `translateY(${isUp ? '60px' : '-60px'})`,
          opacity: 0,
        },
        {
          transform: `translateY(${isUp ? '0px' : '0px'})`,
          opacity: 1,
        },
      ],
      {duration: 300, fill: 'both'}
    );
    const previousDom = previousDomRef.current;
    const b = previousDom.animate(
      [
        {
          transform: `translateY(${isUp ? '0px' : '0px'})`,
          opacity: 1,
        },
        {
          transform: `translateY(${isUp ? '-60px' : '60px'})`,
          opacity: 0,
        },
      ],
      {duration: 200, fill: 'both'}
    );

    return () => {
      a.cancel();
      b.cancel();
    };
  }, [tik]);
  return (
    <StyledCounter>
      <p
        ref={previousDomRef}
        className={css`
          position: absolute;
          top: 5%;
          font-size: 3rem;
        `}
      >
        {lastValue}
      </p>
      <p
        ref={currentDomRef}
        className={css`
          position: absolute;
          top: 5%;
          font-size: 3rem;
        `}
      >
        {count}
      </p>
    </StyledCounter>
  );
};

export {Number};
