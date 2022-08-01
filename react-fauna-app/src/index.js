import React from 'react';
import {createRoot} from 'react-dom/client';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactionPositive} from './components/ReactionPositive';
import {ReactionNegative} from './components/ReactionNegative';
import styled from '@emotion/styled';
import {css} from '@emotion/css';

import useSWR from 'swr';
import {getDoc} from './fauna/count';
import '@fontsource/kaushan-script';

import {RecoilRoot} from 'recoil';

import './index.css';

const queryClient = new QueryClient();

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  @media screen and (max-width: 768px) {
  }
`;

const StyledPositiveContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
  flex-basis: 50%;
  gap: 1rem;
  @media screen and (max-width: 768px) {
  }
`;

const StyledNegativeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
  flex-basis: 50%;
  gap: 1rem;
  @media screen and (max-width: 768px) {
  }
`;

// const birdCount = 50;
const birdCount = 1;

const App = ({context}) => {
  const {data, error} = useSWR('a', async (a) => {
    try {
      const data = await getDoc();
      return data;
    } catch (error) {
      return error;
    }
  });
  if (error) {
    return <p>something went wrong...</p>;
  }
  return (
    <>
      <a
        target="_blank"
        href="https://icons8.com/icon/XbVA8x9987Ke/ハチドリ"
        rel="noreferrer"
        className={css`
          position: fixed;
          top: 10px;
          right: 10px;
        `}
      >
        ハチドリ icon by Icons8
      </a>
      <StyledContainer>
        {data && (
          <QueryClientProvider client={queryClient}>
            <StyledPositiveContainer>
              {[...Array(birdCount)].map((n, index) => {
                return (
                  <ReactionPositive key={index} count={data ? data.count : 0} />
                );
              })}
            </StyledPositiveContainer>
            <StyledNegativeContainer>
              {[...Array(birdCount)].map((n, index) => {
                return (
                  <ReactionNegative key={index} count={data ? data.count : 0} />
                );
              })}
            </StyledNegativeContainer>
          </QueryClientProvider>
        )}
      </StyledContainer>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
