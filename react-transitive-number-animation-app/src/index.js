import {useState, useEffect, useMemo, createRef} from 'react';
import {createRoot} from 'react-dom/client';
import styled from '@emotion/styled';
import {css} from '@emotion/css';
import {Button} from '@mui/material';
import {Number} from './components/Number';

import '@fontsource/kaushan-script';
import './index.scss';
import {useCounter} from './hooks/useCounter';
import {usePrevious} from './hooks/usePrevious';

const StyledCounter = styled.div`
  display: grid;
  min-height: 100vh;
  place-items: center;
`;

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledController = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const App = () => {
  const [tik, setTik] = useState(new Date());
  const [isUp, setIsUp] = useState(true);
  const [count, {incrementCount, decrementCount}] = useCounter();
  const lastValue = usePrevious(count);
  return (
    <StyledCounter>
      <StyledContainer>
        <StyledController>
          <Button
            variant={'outlined'}
            onClick={(e) => {
              incrementCount();
              setTik(new Date());
              setIsUp(true);
            }}
          >
            Up
          </Button>
          <Button
            variant={'outlined'}
            onClick={(e) => {
              decrementCount();
              setTik(new Date());
              setIsUp(false);
            }}
          >
            Down
          </Button>
        </StyledController>
        <Number tik={tik} count={count} lastValue={lastValue} isUp={isUp} />
      </StyledContainer>
    </StyledCounter>
  );
};
const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
