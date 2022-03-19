import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Nav from '../components/assign1/Nav';
import ImageBox from '../components/assign1/ImageBox';
import MoreBtn from '../components/assign1/MoreBtn';

const dummyData = {
  product_code: 1,
  region_id: 2910,
  image_url: 'https://static.pxl.ai/problem/images/VT-070.jpg',
  gender: 'gender.unisex',
  attributes: [
    {
      style: 'basic_or_minimal_or_normcore',
    },
    {
      season: 'summer',
    },
    {
      occasion: 'gym_or_outdoor',
    },
    {
      fabric: 'knit_or_angora',
    },
    {
      sense: 'sportive',
    },
    {
      pattern: 'leopard',
    },
  ],
  category_names: ['c1.tops', 'c2.outwears', 'c3.vests'],
};

function ResultDetail(props) {
  const [searchProduct, setSearchProduct] = useState(dummyData);
  const [viewDatas, setViewDatas] = useState([]); // 화면에 보여줄 검색 결과 데이터
  const [attributes, setAttributes] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');
  const [isValidProduct, setIsValidProduct] = useState(false);
  const [searchParams] = useSearchParams();
  const savedFilteredData = useRef([]); // 카테고리가 일치하는 검색 결과 데이터 리스트
  const searchedKeyword = searchParams.get('keyword');

  useEffect(() => {
    // const word = keyword; // props로 전달 받는 검색된 image_url 값 또는 product_code 값

    if (!searchedKeyword) {
      setIsValidProduct(false);
      return;
    }

    const regionsData = JSON.parse(window.localStorage.getItem('regionsData'));
    const productIndex = regionsData.findIndex(
      (data) =>
        data.image_url === searchedKeyword ||
        data.product_code === parseInt(searchedKeyword),
    );

    // 존재하는 상품일 경우
    if (productIndex > -1) {
      setSearchProduct(regionsData[productIndex]);
      setIsValidProduct(true);
    } else {
      // 존재하지 않는 상품일 경우
      // setSearchProduct({});
      setIsValidProduct(false);
    }
  }, [searchedKeyword]);

  useEffect(() => {
    // 검색된 상품의 Attributes 카테고리, 태그 값 저장
    const attrList = [];
    searchProduct.attributes.forEach((attr) => {
      const [category, tags] = [
        Object.keys(attr)[0],
        Object.values(attr)[0].split('_or_'),
      ];
      tags.forEach((tag) => attrList.push([tag, category]));
    });

    setAttributes(attrList);

    // c1 카테고리 값을 상태 값으로 저장
    const c1 = searchProduct.category_names[0].slice(3);
    setSearchCategory(c1);

    // c1 카테고리에 해당하는 데이터 필터링해서 상태 값 업데이트
    const productsData = JSON.parse(
      window.localStorage.getItem('productsData'),
    );

    savedFilteredData.current = productsData.filter(({ category_names }) => {
      let flag = false;
      for (const name of category_names) {
        if (name.slice(3) === c1) {
          flag = true;
        }
      }
      return flag;
    });

    setViewDatas(savedFilteredData.current.slice(0, 20));
  }, [searchProduct]);

  const getMoreData = useMemo(() => {
    return (function* () {
      let loadCtn = 20;
      while (true) {
        setViewDatas(savedFilteredData.current.slice(0, (loadCtn += 20)));
        yield;
      }
    })();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <Container>
      <Nav />
      <Body>
        {!isValidProduct ? (
          <EmptyResult>검색된 상품 결과가 없습니다 ❌</EmptyResult>
        ) : (
          <>
            <DetailResult>
              <div>
                <img src={searchProduct.image_url} alt="product detail view" />
                <p className="section-label">ITEMS</p>
                <div className="category">{searchCategory.toUpperCase()}</div>
              </div>
              <Divider />
              <div>
                <p className="section-label">ATTRIBUTES</p>
                <Attributes>
                  {attributes.map(([tag, category], idx) => {
                    return (
                      <li key={idx} className="attributes-item">
                        <p className="item-tag">#{tag.toUpperCase()}</p>
                        <p className="item-category">
                          {category.toUpperCase()}
                        </p>
                      </li>
                    );
                  })}
                </Attributes>
              </div>
            </DetailResult>
            <SimilarResult>
              <ResultWrapper>
                {viewDatas.map((productInfo, idx) => {
                  return (
                    <ImageBox
                      key={idx}
                      data={productInfo}
                      image_url={productInfo.image_url}
                    />
                  );
                })}
              </ResultWrapper>
              <ButtonWrapper>
                <MoreBtn getMoreData={getMoreData} />
              </ButtonWrapper>
            </SimilarResult>
          </>
        )}
      </Body>
      {/* <div style={{ width: '100%' }}>
        <JumpToTopBtn onClick={scrollToTop}>&#94;</JumpToTopBtn>
      </div> */}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
const Body = styled.div`
  width: 100%;
  height: auto;
  min-height: calc(80vh - 8rem); // Nav 바 margin-bottom 값 빼기
  // padding-bottom: 8rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const EmptyResult = styled.div`
  font-size: 3.5rem;
  font-weight: 500;
`;

const DetailResult = styled.aside`
  width: 50rem;
  min-width: 45rem;
  max-width: 50rem;
  height: 100vh;
  padding: 0 8rem;
  position: sticky;
  top: 0;
  transition: all 0.5s ease-in-out;
  @media screen and (max-width: 768px) {
    position: relative;
    padding: 0 4rem;
  }
  img {
    max-width: 100%;
    height: 35rem;
    object-fit: contain;
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
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 2.1rem;
    @media screen and (max-width: 768px) {
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.5;
    }
  }
  .item-category {
    color: #838383;
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 1.6rem;
    margin-top: 0.6rem;
  }
`;
const SimilarResult = styled.div`
  display: flex;
  flex-direction: column;
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
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 4.2rem;
  padding-bottom: 1rem;
`;
const JumpToTopBtn = styled.button`
  position: sticky;
  // bottom: 3rem;
  top: -3rem;
  right: 3rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: #9d6ef5;
  color: #fff;
  font-size: 3rem;
  line-height: 5.5rem;
`;

export default ResultDetail;
