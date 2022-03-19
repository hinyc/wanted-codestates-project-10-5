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
  border: 2px solid #eeefef;
  cursor: pointer;
`;
const Image = styled.img`
  width: 100%;
  height: 27.6rem;
  border: 2px solid #eeefef;
  object-fit: cover;
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
