import {useState, useRef, useLayoutEffect} from 'react';
import {css} from '@emotion/css';
import {motion} from 'framer-motion';

import {HummingBirdIcon} from './HummingBirdIcon';
import {Number} from './Number';
import {LoadingIcon} from './LoadingIcon';

import {usePrevious} from '../hooks/usePrevious';
import {useTimeout} from '../hooks/useTimeout';

import {formatCount} from '../plugins/count';
import {upsertDoc, watch} from '../fauna/count';

const ReactionPositive = ({count}) => {
  const isClicked = useRef(false);
  const [currentValue, setCurrentValue] = useState(count);
  const previousValue = usePrevious(currentValue);

  const [rotate, setRotate] = useState(0);

  const [isCountShow, setIsCountShow] = useState(false);

  useTimeout(() => {
    setIsCountShow(true);
  }, 300);

  const handleClick = async (e, count) => {
    isClicked.current = true;
    setCurrentValue(count);
    setRotate((prevState) => {
      return prevState - 360;
    });
    try {
      await upsertDoc({count});
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      isClicked.current = false;
    }, 1000);
  };

  useLayoutEffect(() => {
    const logger = (e) => {
      const {count} = e;
      console.log('[logger]', e);
      if (!isClicked.current) {
        setCurrentValue(count);
      }
    };
    const stream = watch({logger});
    return () => {
      stream.close();
    };
  }, []);

  const renderLazyShowCount = () => {
    if (isCountShow) {
      return (
        <Number
          isLiked={true}
          previousNumber={formatCount({count: previousValue})}
          currentNumber={formatCount({count: currentValue})}
        ></Number>
      );
    } else {
      return <LoadingIcon></LoadingIcon>;
    }
  };

  return (
    <motion.button
      onClick={(e) => {
        handleClick(e, currentValue + 1);
      }}
      initial={false}
      whileTap="press"
      onHoverStart={(e) => {}}
      onHoverEnd={(e) => {}}
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: none;
        outline: none;
        background: transparent;
        &:hover {
          cursor: pointer;
        }
      `}
    >
      <motion.div
        animate={{
          rotate: rotate,
          transition: {duration: 0.4},
        }}
      >
        <HummingBirdIcon color="#FEB139"></HummingBirdIcon>
      </motion.div>
      {renderLazyShowCount()}
    </motion.button>
  );
};

export {ReactionPositive};
