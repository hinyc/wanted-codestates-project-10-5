import React from 'react';
import styled from 'styled-components';

function ImageBox(props) {
  const { name, image_url, price } = props.data;
  const setOnClick = () => {
    props.setShowModal(true);
    props.setImgUrl(image_url);
  };
  return (
    <Container onClick={setOnClick}>
      <Image src={image_url} />
      <Contents>
        <Title>{name}</Title>
        <Price>₩ {price.toLocaleString('ko-KR')}</Price>
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 20rem;
  height: 40rem;
  background: #ffffff;
  border: 1px solid #eee;
  border-radius: 10px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    height: 30rem;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 27.6rem;
  border-radius: 10px 10px 0 0;
  object-fit: cover;
  background-position: top;
  @media screen and (max-width: 768px) {
    height: 20rem;
  }
`;
const Contents = styled.div`
  position: absolute;
  width: 100%;
  height: 12.4rem;
  padding: 1rem;
  @media screen and (max-width: 768px) {
    height: 10rem;
  }
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
  color: #6e6e6e;
`;
export default ImageBox;
