import React from 'react';
import styled from 'styled-components';

function ImageBox(props) {
  return (
    <Container>
      <Image />
      <Contents>
        <Title>조끼_070</Title>
        <Price>₩ 9,999,9999</Price>
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 20rem;
  height: 40rem;
  background: #ffffff;
  border: 2px solid #eeefef;
`;
const Image = styled.img.attrs({
  src: 'https://picsum.photos/400/400',
})`
  width: 100%;
  height: 27.6rem;
  border: 2px solid #eeefef;
`;
const Contents = styled.div`
  position: absolute;
  width: 100%;
  height: 12.4rem;
  padding: 1rem;
`;
const Title = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 2.1rem;
`;
const Price = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 2.1rem;
  color: rgba(157, 110, 245, 1);
`;
export default ImageBox;
