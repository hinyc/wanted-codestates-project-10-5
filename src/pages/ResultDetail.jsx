import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoSrc from '../assets/logo_pxl.png';
import productSrc from '../assets/temp_product.png';
import ImageBox from '../components/assign1/ImageBox';

// 스니펫: rsf

function ResultDetail(props) {
  const navigate = useNavigate();
  const c1 = 'ONE PIECE';
  const attributesData = [
    ['basic', 'style'],
    ['dresses', 'style'],
    ['nomcore', 'style'],
    ['summer', 'season'],
    ['gym', 'occasion'],
    ['outdoor', 'occasion'],
  ];

  const moveToSearchPage = () => {
    navigate('/search');
  };

  return (
    <Container>
      <Head>
        <button>
          <img src={logoSrc} alt="PXL 아이콘" onClick={moveToSearchPage} />
        </button>
      </Head>
      <Body>
        <DetailResult>
          <div>
            <img src={productSrc} alt="product detail view" />
            <p className="section-label">ITEMS</p>
            <div className="category">{c1}</div>
          </div>
          <Divider />
          <div>
            <p className="section-label">ATTRIBUTES</p>
            <Attributes>
              <li className="attributes-item">
                <p className="item-tag">#BASIC</p>
                <p className="item-category">STYLE</p>
              </li>
              <li className="attributes-item">
                <p className="item-tag">#DRESSES</p>
                <p className="item-category">STYLE</p>
              </li>
              <li className="attributes-item">
                <p className="item-tag">#NOMCORE</p>
                <p className="item-category">STYLE</p>
              </li>
              <li className="attributes-item">
                <p className="item-tag">#BASIC</p>
                <p className="item-category">STYLE</p>
              </li>
              <li className="attributes-item">
                <p className="item-tag">#BASIC</p>
                <p className="item-category">STYLE</p>
              </li>
            </Attributes>
          </div>
        </DetailResult>
        <ResultWrapper>
          <ImageBox />
          <ImageBox />
          <ImageBox />
          <ImageBox />
          <ImageBox />
          <ImageBox />
          <ImageBox />
        </ResultWrapper>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
const Head = styled.nav`
  width: 100%;
  height: 8rem;
  display: flex;
  align-items: center;
  padding: 0 5rem;
  border-bottom: 2px solid #f3f4f3;

  button {
    width: 9.7rem;
    cursor: pointer;

    img {
      width: inherit;
    }
  }
`;
const Body = styled.div`
  width: 100%;
  height: auto;
  padding-bottom: 8rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const DetailResult = styled.aside`
  width: 50rem;
  min-width: 40rem;
  height: 100vh;
  padding: 0 8rem;
  position: sticky;
  top: 0;

  img {
    max-width: 100%;
    width: 44rem;
    height: auto;
  }

  .section-label {
    color: #585858;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 2.1rem;
    margin: 1.8rem 0;
  }
  .category {
    width: 108px;
    height: 40px;
    padding: 0.9rem 0.6rem;
    background-color: #9d6ef5;
    color: #fff;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 2.1rem;
    text-align: center;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 0;
  border-top: 0.15rem solid #f3f4f3;
  margin-top: 2.5rem;
  margin-bottom: 1.8rem;
`;
const Attributes = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .attributes-item {
    width: min-content;
    margin-right: 2.3rem;
    margin-bottom: 1.3rem;
  }
  .item-tag {
    color: #9d6ef5;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 2.1rem;
  }
  .item-category {
    color: #838383;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.6rem;
    margin-top: 0.6rem;
  }
`;

const ResultWrapper = styled.section`
  width: 100%;
  max-width: 100rem;
  height: auto;
  display: flex;
  // justify-content: space-around;
  flex-wrap: wrap;
  margin: -2.5rem 0;

  > div {
    margin: 2.5rem;
  }
`;

export default ResultDetail;
