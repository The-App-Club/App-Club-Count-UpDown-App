import {useState, useRef, useLayoutEffect} from 'react';
import {css} from '@emotion/css';
import {motion} from 'framer-motion';
import {database} from '../firebase';

import {HummingBirdIcon} from './HummingBirdIcon';
import {Number} from './Number';
import {LoadingIcon} from './LoadingIcon';

import {usePrevious} from '../hooks/usePrevious';
import {useTimeout} from '../hooks/useTimeout';

import {formatCount} from '../plugins/count';

const ReactionNegative = ({count}) => {
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
    const {doc, db, runTransaction} = database;
    try {
      await runTransaction(db, async (transaction) => {
        transaction.set(doc(db, 'count', 'humming'), {
          count,
        });
      });
      console.log('Transaction successfully committed!');
    } catch (error) {
      console.log('Transaction failed: ', error);
    }
    setTimeout(() => {
      isClicked.current = false;
    }, 1000);
  };

  useLayoutEffect(() => {
    const {doc, db, onSnapshot} = database;
    const unsubscribe = onSnapshot(
      doc(db, 'count', 'humming'),
      {includeMetadataChanges: true},
      (doc) => {
        const info = {id: doc.id, ...doc.data()};
        const {count} = info;
        if (!isClicked.current) {
          setCurrentValue(count);
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, [currentValue]);

  const renderLazyShowCount = () => {
    if (isCountShow) {
      return (
        <Number
          isLiked={false}
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
        handleClick(e, currentValue - 1);
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
        <HummingBirdIcon color={'#55B3B1'}></HummingBirdIcon>
      </motion.div>
      {renderLazyShowCount()}
    </motion.button>
  );
};

export {ReactionNegative};
