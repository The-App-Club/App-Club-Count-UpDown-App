import {useEffect, memo} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/css';
import {motion, useAnimation} from 'framer-motion';

const currentCountVariants = {
  unliked: {
    opacity: [1, 0],
    y: [0, 40],
    fontSize: ['3rem', '1rem'],
    transition: {duration: 0.35},
  },
  liked: {
    opacity: [1, 0],
    y: [0, 40],
    fontSize: ['3rem', '1rem'],
    transition: {duration: 0.35},
  },
};

const newCountVariants = {
  unliked: {
    opacity: [0, 1],
    y: [-40, 0],
    fontSize: ['1rem', '3rem'],
    transition: {duration: 0.45},
  },
  liked: {
    opacity: [0, 1],
    y: [-40, 0],
    fontSize: ['1rem', '3rem'],
    transition: {duration: 0.45},
  },
};

const StyledNumber = styled.div`
  --width: 80px;
  --height: 80px;
  min-width: var(---width);
  min-height: var(---height);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  font-size: 1rem;
  color: #000000;
  font-family: 'Kaushan Script', sans-serif;
  font-weight: 900;
`;

const _Number = ({previousNumber, currentNumber, isLiked}) => {
  const starControls = useAnimation();
  useEffect(() => {
    if (isLiked) {
      starControls.start('liked');
      // console.log('isLiked', isLiked);
    } else {
      starControls.start('unliked');
      // console.log('isLiked', isLiked);
    }
  }, [starControls, previousNumber, currentNumber, isLiked]);

  return (
    <StyledNumber>
      <motion.div
        animate={starControls}
        variants={currentCountVariants}
        className={css``}
      >
        {previousNumber}
      </motion.div>
      <motion.div
        animate={starControls}
        variants={newCountVariants}
        className={css`
          position: absolute;
        `}
      >
        {currentNumber}
      </motion.div>
    </StyledNumber>
  );
};

const Number = memo(_Number);

export {Number};
