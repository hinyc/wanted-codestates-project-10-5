import React from 'react';
import styled from 'styled-components';
import Nav from '../components/assign1/Nav';
import ImageBox from '../components/assign1/ImageBox';
import MoreBtn from '../components/assign1/MoreBtn';

function Result(props) {
  return (
    <Container>
      <Nav />
      <ResultWrapper>
        <ImageBox />
        <ImageBox />
        <ImageBox />
        <ImageBox />
        <ImageBox />
        <ImageBox />
        <ImageBox />
        <ImageBox />
        <ImageBox />
        <ImageBox />
        <ImageBox />
        <ImageBox />
        <ImageBox />
        <ImageBox />
      </ResultWrapper>
      <ButtonWrapper>
        <MoreBtn />
      </ButtonWrapper>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
const ResultWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 4rem;
  width: 100%;
  height: auto;
  padding: 0 3rem;
`;
export default Result;
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 4.2rem;
  padding-bottom: 1rem;
`;
