import React from 'react';
import styled from 'styled-components';

function TextModal({
  modalTextChange,
  confirmBtn,
  cancelBtn,
  textRef,
  showCaution,
}) {
  return (
    <Container>
      <Modal>
        <h1>영역의 이름은 무엇인가요?</h1>
        <TextInput
          type="text"
          onChange={modalTextChange}
          onKeyDown={modalTextChange}
          ref={textRef}
        />
        {showCaution && <Caution>이름을 입력해주세요.</Caution>}
        <BtnArea>
          <NoBtn onClick={cancelBtn}>취소</NoBtn>
          <YesBtn onClick={confirmBtn}>확인</YesBtn>
        </BtnArea>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  & h1 {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    width: 100%;
    color: #ffffff;
  }
`;

const Modal = styled.div`
  width: 400px;
  height: 170px;
  background-color: #42424c;
  position: relative;
  border-radius: 10px;
  padding: 20px;
`;

const TextInput = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 10px;
  background-color: #212129;
  border-radius: 5px;
  color: white;
  font-size: 20px;
`;

const BtnArea = styled.div`
  position: absolute;
  right: 20px;
  bottom: 10px;
`;
const YesBtn = styled.button`
  width: 60px;
  height: 40px;
  font-size: 20px;
  background-color: #01deff;
  border-radius: 5px;
  margin-left: 20px;
  /* color: #fff; */
`;
const NoBtn = styled.button`
  width: 60px;
  height: 40px;
  font-size: 20px;
  color: #fff;
  background-color: #2a2932;
  border-radius: 5px;
`;

const Caution = styled.div`
  margin-top: 5px;
  font-size: 1.4rem;
  color: #fff;
`;
export default TextModal;
