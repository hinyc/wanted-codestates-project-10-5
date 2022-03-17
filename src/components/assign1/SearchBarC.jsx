import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import keywordList from '../../data/keywordList';
function SearchBarC(props) {
  const targetRef = useRef(null);
  const navigate = useNavigate();

  const setOnsubmit = (e) => {
    e.preventDefault();
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
    <SearchBox onSubmit={setOnsubmit}>
      <SearchBar placeholder="IMAGE URL or KEYWORD" ref={targetRef} />
      {props.hideBtn ? <></> : <Button type="submit">search</Button>}
    </SearchBox>
  );
}
const SearchBox = styled.form`
  width: 60%;
  min-width: 45rem;
  display: flex;
  align-items: center;
`;
const SearchBar = styled.input`
  width: 100%;
  height: 4.5rem;
  left: 28.8rem;
  top: 56.3rem;
  background: #ffffff;
  box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  transition: all 0.3s ease;
  font-size: 1.5rem;
  padding: 2.5rem;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 768px) {
    padding: 1.5rem;
    font-size: 1.2rem;
  }
`;
const Button = styled.button`
  width: 10.5rem;
  height: 4rem;
  left: 112.3rem;
  top: 56.7rem;
  background: #eeefef;
  margin-left: 1.5rem;
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
export default SearchBarC;
