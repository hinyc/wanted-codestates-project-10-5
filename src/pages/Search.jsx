import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
function Search(props) {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const originDatas = [];
  const keywordList = {
    상의: 'c1.tops',
    tops: 'c1.tops',
    하의: 'c1.bottoms',
    bottoms: 'c1.bottoms',
    바지: 'c2.pants',
    pants: 'c2.pants',
    원피스: 'c2.dresses',
    드레스: 'c2.dresses',
    dresses: 'c2.dresses',
    신발: 'c2.shoes',
    shoes: 'c2.shoes',
    겉옷: ['c2.outwears', 'c3.outer'],
    outwears: 'c2.outwears',
    outwear: 'c2.outwears',
    조끼: 'c3.vests',
    베스트: 'c3.vests',
    vests: 'c3.vests',
    자켓: 'c3.jackets',
    jackets: 'c3.jackets',
    코트: 'c3.coats',
    coats: 'c3.coats',
    니트: 'c3.knitwear',
    knit: 'c3.knitwear',
    knitwear: 'c3.knitwear',
    아우터: 'c3.outer',
    outer: 'c3.outer',
    outers: 'c3.outer',
    셔츠: 'c3.shirts',
    shirts: 'c3.shirts',
    후드집업: 'c3.sweater',
    후드티: 'c3.sweater',
    맨투맨: 'c3.sweater',
    스웨터: 'c3.sweater',
    sweaters: 'c3.sweater',
    sweater: 'c3.sweater',
    가디건: 'c3.cardigans',
    cardigans: 'c3.cardigans',
    블라우스: 'c3.blouses',
    blouses: 'c3.blouses',
    치마: 'c3.skirts',
    스커트: 'c3.skirts',
    skirts: 'c3.skirts',
  };
  useEffect(() => {
    (async () => {
      const { data: pData } = await axios.get(
        'https://static.pxl.ai/problem/data/products.json',
      );
      const { data: rData } = await axios.get(
        'https://static.pxl.ai/problem/data/regions.json',
      );
      window.localStorage.setItem('productsData', JSON.stringify(pData));
      window.localStorage.setItem('regionsData', JSON.stringify(rData));
    })();
  }, []);

  const setOnSearch = () => {
    const res = targetRef.current.value;
    try {
      if (keywordList[res]) {
        const keyword = keywordList[res];
        navigate(`/result/${keyword}`);
      } else {
        navigate(`/result-detail?keyword=${res}`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      targetRef.current.value = '';
      targetRef.current.focus();
    }
  };

  return (
    <Container>
      <Title>
        Artificial Intelligence <br />
        PXL <Span>Fashion</Span> Viewer
      </Title>
      <SearchBox>
        <SearchBar placeholder="IMAGE URL or KEYWORK" ref={targetRef} />
        <Button onClick={setOnSearch}>search</Button>
      </SearchBox>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 5rem;
  line-height: 5.9rem;
  transition: all 0.3s ease;
  @media screen and (max-width: 768px) {
    line-height: 4rem;
    font-size: 4rem;
  }
`;
const Span = styled.span`
  font-weight: 300;
`;
const SearchBox = styled.div`
  width: 60%;
  min-width: 45rem;
  display: flex;
  align-items: center;
  margin-top: 5.1rem;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 6.6rem;
  left: 28.8rem;
  top: 56.3rem;
  background: #ffffff;
  box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  padding: 3rem;
  transition: all 0.3s ease;
  font-size: 2rem;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 768px) {
    height: 6rem;
    font-size: 1.2rem;
  }
`;
const Button = styled.button`
  width: 10.5rem;
  height: 4rem;
  left: 112.3rem;
  top: 56.7rem;
  background: #eeefef;
  margin-left: 3rem;
  border-radius: 1rem;
  transition: all 0.3s ease;
  font-size: 1.5rem;
  &:hover {
    background: #3b3b3b;
    color: #ffffff;
  }
  @media screen and (max-width: 768px) {
    width: 9rem;
    height: 3.5rem;
    font-size: 1.2rem;
  }
`;

export default Search;
