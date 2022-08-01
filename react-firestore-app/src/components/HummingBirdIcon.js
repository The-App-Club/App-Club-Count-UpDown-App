import styled from '@emotion/styled';
import {css} from '@emotion/css';
const StyledHummingBirdIcon = styled.div`
  --width: 80px;
  --height: 80px;
  width: var(--width);
  height: var(--height);
  position: relative;
  background: transparent;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  &::before {
    display: flex;
    justify-content: center;
    align-items: center;
    content: '';
    width: 70%;
    height: 70%;
    background: url(https://img.icons8.com/stickers/100/000000/hummingbird.png)
      no-repeat;
    background-size: 100%;
  }
`;

const HummingBirdIcon = ({color}) => {
  return (
    <StyledHummingBirdIcon
      className={css`
        background: ${color} !important;
      `}
    />
  );
};

export {HummingBirdIcon};
