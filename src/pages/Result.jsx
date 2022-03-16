
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Nav from '../components/assign1/Nav';
import ImageBox from '../components/assign1/ImageBox';
import MoreBtn from '../components/assign1/MoreBtn';

function Result(props) {
  const { keyword } = useParams();
  const originDatas = JSON.parse(window.localStorage.getItem('productsData'));
  let filteredData = useRef([]);
  const [viewDatas, setViewDatas] = useState([]);
  const getMoreData = useMemo(() => {
    return (function* () {
      let loadCtn = 20;
      while (true) {
        setViewDatas(filteredData.current.slice(0, (loadCtn += 20)));
        yield;
      }
    })();
  }, []);
  useEffect(() => {
    filteredData.current.push(
      ...originDatas.filter((obj) => obj.category_names.includes(keyword)),
    );
    setViewDatas(filteredData.current.slice(0, 20));
  }, []);
  return (
    <Container>
      <Nav />
      <ResultWrapper>
        {viewDatas.map((data) => (
          <ImageBox key={data.product_code} data={data} />
        ))}
      </ResultWrapper>
      <ButtonWrapper>
        <MoreBtn getMoreData={getMoreData} />
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
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 4.2rem;
  padding-bottom: 1rem;
`;

export default Result;
