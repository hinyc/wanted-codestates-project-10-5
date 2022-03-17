import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Main() {
  const navigate = useNavigate();
  return (
    <Container>
      <button
        onClick={() => {
          navigate('/search');
        }}
      >
        과제 1
      </button>
      <button
        onClick={() => {
          navigate('/imgCanvas');
        }}
      >
        과제 2
      </button>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  button {
    margin: 20px;
    width: 400px;
    height: 300px;
    font-size: 3rem;
    border-radius: 20px;
    box-shadow: 0 0 34px -2px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 0 34px -2px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 0 34px -2px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    :hover {
      transform: scale(1.1);
    }
  }
`;
