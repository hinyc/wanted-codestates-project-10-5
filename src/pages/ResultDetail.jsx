
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import productSrc from '../assets/temp_product.png';
import Nav from '../components/assign1/Nav';
import ImageBox from '../components/assign1/ImageBox';

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
  const [searchKeyword, setSearchKeyword] = useState(dummyData);
  const [searchResults, setSearchResults] = useState([]); // 카테고리가 일치하는 검색 결과 데이터 리스트
  const [attributes, setAttributes] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');

  useEffect(() => {
    // Attributes 카테고리, 태그 배열에 담기
    const attrList = [];
    searchKeyword.attributes.forEach((attr) => {
      const [category, tags] = [
        Object.keys(attr)[0],
        Object.values(attr)[0].split('_or_'),
      ];
      tags.forEach((tag) => attrList.push([tag, category]));
    });

    setAttributes(attrList);

    // c1 카테고리 값 상태 값으로 저장
    setSearchCategory(searchKeyword.category_names[0].slice(3));
  }, [searchKeyword]);

  // 검색 결과 리스트 데이터 필터링해서 저장
  useEffect(() => {
    const originDatas = JSON.parse(window.localStorage.getItem('originData'));
    // const regionsData = JSON.parse(window.localStorage.getItem('regionsData'));

    const filteredData = originDatas.filter(({ category_names }) => {
      let flag = false;
      for (const name of category_names) {
        if (name === searchCategory) {
          flag = true;
        }
      }
      return flag;
    });
    console.log(filteredData[0]);
    setSearchResults(filteredData);
  }, [searchCategory]);

  return (
    <Container>
      <Nav />
      <Body>
        <DetailResult>
          <div>
            <img src={productSrc} alt="product detail view" />
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
                    <p className="item-category">{category.toUpperCase()}</p>
                  </li>
                );
              })}
            </Attributes>
          </div>
        </DetailResult>
        <ResultWrapper>
          {searchResults.slice(0, 10).map((productInfo, idx) => {
            return <ImageBox key={idx} productInfo={productInfo} />;
          })}
          {/* <ImageBox />
          <ImageBox />
          <ImageBox />
          <ImageBox />
          <ImageBox />
          <ImageBox />
          <ImageBox /> */}
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
