import React from 'react';
import styled from 'styled-components';

function Search(props) {
  return (
    <Container>
      <Title>
        Artificial Intelligence <br />
        PXL <Span>Fashion</Span> Viewer
      </Title>
      <SearchBox>
        <SearchBar placeholder="IMAGE URL or KEYWORK" />
        <Button>search</Button>
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
