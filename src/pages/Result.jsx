import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Nav from '../components/assign1/Nav';
import ImageBox from '../components/assign1/ImageBox';
import MoreBtn from '../components/assign1/MoreBtn';
import Modal from '../components/assign1/Modal';
import Loader from '../components/assign1/Loader';
import DisableScroll from '../util/disableScroll';

function Result(props) {
  const [showModal, setShowModal] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const { keyword } = useParams();
  const originDatas = JSON.parse(window.localStorage.getItem('productsData'));
  const filteredData = useRef([]);
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
    filteredData.current = [];
    if (keyword.includes(',')) {
      const keywordArr = keyword.split(',');
      filteredData.current.push(
        // eslint-disable-next-line
        ...originDatas.filter((obj) => {
          for (const key of keywordArr) {
            return obj.category_names.includes(key);
          }
        }),
      );
    } else {
      filteredData.current.push(
        ...originDatas.filter((obj) => obj.category_names.includes(keyword)),
      );
    }

    setViewDatas(filteredData.current.slice(0, 20));
    // eslint-disable-next-line
  }, [keyword]);

  DisableScroll(showModal);

  return (
    <Container>
      <Nav />
      {showModal && <Modal setShowModal={setShowModal} imgUrl={imgUrl} />}
      <ResultWrapper>
        {viewDatas.length ? (
          viewDatas.map((data) => (
            <ImageBox
              key={data.product_code}
              data={data}
              setShowModal={setShowModal}
              setImgUrl={setImgUrl}
            />
          ))
        ) : (
          <Loader type={'spin'} color={'rgb(96, 236, 145)'} />
        )}
      </ResultWrapper>
      {viewDatas.length ? (
        <ButtonWrapper>
          <MoreBtn getMoreData={getMoreData} />
        </ButtonWrapper>
      ) : (
        <Loader type={'spin'} color={'rgb(96, 236, 145)'} />
      )}
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
