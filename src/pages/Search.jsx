import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchBarC from '../components/assign1/SearchBarC';
function Search(props) {
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

  return (
    <Container>
      <Title>
        Artificial Intelligence <br />
        PXL <Span>Fashion</Span> Viewer
      </Title>
      <SearchBarC />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  max-width: 1200px;
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
  margin-bottom: 5.1rem;
  @media screen and (max-width: 768px) {
    line-height: 4rem;
    font-size: 4rem;
  }
`;
const Span = styled.span`
  font-weight: 300;
`;

export default Search;
