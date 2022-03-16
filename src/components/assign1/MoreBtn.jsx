import React from 'react';
import styled from 'styled-components';

function MoreBtn(props) {
  return <Button>more</Button>;
}
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #667bc7;
  color: #ffffff;
  width: 15.4rem;
  height: 5.6rem;
  border-radius: 2.5rem;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 2.5rem;
`;

export default MoreBtn;
