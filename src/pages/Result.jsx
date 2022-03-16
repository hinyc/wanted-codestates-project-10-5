import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Nav from '../components/assign1/Nav';
import ImageBox from '../components/assign1/ImageBox';
import MoreBtn from '../components/assign1/MoreBtn';
import axios from 'axios';
function Result(props) {
  const originDatas = [];
  const [viewDatas, setViewDatas] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        'https://static.pxl.ai/problem/data/regions.json',
      );
      originDatas.push(...data);
      setViewDatas(originDatas.slice(0, 20));
    })();
  }, []);

  const getMoreData = useMemo(() => {
    return (function* () {
      let loadCtn = 20;
      while (true) {
        setViewDatas(originDatas.slice(0, (loadCtn += 20)));
        yield;
      }
    })();
  }, []);

  return (
    <Container>
      <Nav />
      <ResultWrapper>
        {viewDatas.map((data) => (
          <ImageBox key={data.product_code} />
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
