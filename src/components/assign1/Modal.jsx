import React, { useState } from 'react';
import styled from 'styled-components';

function Modal(props) {
  const setOnClick = () => {
    props.setShowModal(false);
  };
  return (
    <Container onClick={setOnClick}>
      <Image src={props.imgUrl} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  background-color: #3d3d3dbf;
  cursor: pointer;
`;
const Image = styled.img`
  width: 50rem;
  height: 50rem;
  object-fit: contain;
`;
export default Modal;
