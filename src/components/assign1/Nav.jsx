import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoSrc from '../../assets/logo_pxl.png';
import SearchBarC from '../assign1/SearchBarC';
function Nav() {
  const navigate = useNavigate();
  const moveToSearchPage = () => {
    navigate('/search');
  };
  return (
    <Head>
      <button>
        <img src={logoSrc} alt="PXL 아이콘" onClick={moveToSearchPage} />
      </button>
      <SearchBarWrapper>
        <SearchBarC hideBtn={true} />
      </SearchBarWrapper>
    </Head>
  );
}
const Head = styled.nav`
  position: relative;
  width: 100%;
  height: 8rem;
  display: flex;
  align-items: center;
  padding: 0 5rem;
  border-bottom: 2px solid #f3f4f3;
  margin-bottom: 8rem;
  button {
    width: 9.7rem;
    cursor: pointer;
    img {
      width: inherit;
    }
  }
`;
const SearchBarWrapper = styled.div`
  position: absolute;
  right: 5rem;
`;
export default Nav;
