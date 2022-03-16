import React from 'react';
import styled from 'styled-components';
import Nav from '../components/assign1/Nav';
import ImageBox from '../components/assign1/ImageBox';

function Result(props) {
  return (
    <Container>
      <Nav />
      <ImageBox />
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
export default Result;
