import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import getImg from '../assets/fashion-unsplash.jpeg';
import TextModal from '../components/TextModal';

export default function ImgCanvas() {
  const [modalOpen, setModalOpen] = useState(false);
  const [startPoint, setStartPoint] = useState([]);
  const [endPoint, setEndPoint] = useState([]);
  const [drawState, setDrawState] = useState(false);
  const [addTextState, setAddTextState] = useState(false);
  const [dragArea, setDragArea] = useState([]);
  const [areaName, setAreaName] = useState('');
  const [showCaution, setShowCaution] = useState(false);
  const [modifyTarget, setModifyTarget] = useState(undefined);

  const ref = useRef(null);
  const textRef = useRef(null);
  const modifyTextRef = useRef(null);

  useEffect(() => {
    let ctx = ref.current.getContext('2d');
    if (true) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      dragArea.forEach((el) => {
        ctx.fillStyle = '#c7f4734a';
        ctx.strokeStyle = '#1793b56b';
        ctx.strokeRect(el[0], el[1], el[2] - el[0], el[3] - el[1]);
        ctx.fillRect(el[0], el[1], el[2] - el[0], el[3] - el[1]);
        ctx.fillStyle = 'black';
        ctx.font = '18px serif';
        if (el[4]) {
          if (el[0] < el[2] && el[1] < el[3]) {
            ctx.fillText(el[4], el[0] + 1, el[1] + 18);
          }
          if (el[0] > el[2] && el[1] < el[3]) {
            ctx.fillText(el[4], el[2] + 1, el[1] + 18);
          }
          if (el[0] > el[2] && el[1] > el[3]) {
            ctx.fillText(el[4], el[2] + 1, el[3] + 18);
          }
          if (el[0] < el[2] && el[1] > el[3]) {
            ctx.fillText(el[4], el[0] + 1, el[3] + 18);
          }
        }
      });
      ctx.fillStyle = '#c7f4734a';
      ctx.strokeStyle = '#1793b56b';
      ctx.strokeRect(
        startPoint[0],
        startPoint[1],
        endPoint[0] - startPoint[0],
        endPoint[1] - startPoint[1],
      );
      ctx.fillRect(
        startPoint[0],
        startPoint[1],
        endPoint[0] - startPoint[0],
        endPoint[1] - startPoint[1],
      );
    }
  }, [addTextState, areaName, dragArea, drawState, endPoint, startPoint]);

  const draw = (e) => {
    const offsetX = e.target.offsetLeft;
    const offsetY = e.target.offsetTop;
    switch (e.type) {
      case 'mouseup':
        setEndPoint([e.pageX - offsetX, e.pageY - offsetY]);
        setDrawState(false);
        if (
          startPoint[0] !== e.pageX - offsetX ||
          startPoint[1] !== e.pageY - offsetY
        ) {
          setDragArea([
            ...dragArea,
            [startPoint[0], startPoint[1], endPoint[0], endPoint[1]],
          ]);
          setModalOpen(!modalOpen);
        }
        setStartPoint([]);

        break;
      case 'mousedown':
        setDrawState(true);
        setStartPoint([e.pageX - offsetX, e.pageY - offsetY]);
        setEndPoint([]);
        break;
      case 'mousemove':
        if (startPoint.length > 0) {
          setEndPoint([e.pageX - offsetX, e.pageY - offsetY]);
        }
        break;
      default:
        return;
    }
  };

  const modalTextChange = (e) => {
    if (textRef.current.value.length > 0) {
      setShowCaution(false);
    }
    if (e.type === 'keydown' && e.key === 'Enter') {
      setModalOpen(!modalOpen);
      setAddTextState(true);
      setAreaName(textRef.current.value);

      const copyData = [...dragArea];
      copyData[copyData.length - 1].push(textRef.current.value);
      setDragArea(copyData);
      setStartPoint([]);
    }
  };

  const confirmBtn = () => {
    if (!textRef.current.value) {
      setShowCaution(true);
      return;
    }

    setModalOpen(!modalOpen);
    setAddTextState(true);
    setAreaName(textRef.current.value);

    const copyData = [...dragArea];
    copyData[copyData.length - 1].push(textRef.current.value);
    setDragArea(copyData);
    setStartPoint([]);
  };

  const cancelBtn = () => {
    setModalOpen(!modalOpen);
    const cancelDragArea = [...dragArea];
    cancelDragArea.pop();
    // setDrawState(true);
    setDragArea(cancelDragArea);
    setStartPoint([]);
  };

  const removeHandler = (targetIdx) => {
    const copyDragArea = [...dragArea];
    const filter = copyDragArea.filter((el, idx) => idx !== targetIdx);
    setDragArea(filter);
  };
  const modifyHandler = (targetIdx) => {
    const copyDragArea = [...dragArea];
    copyDragArea[targetIdx][4] = modifyTextRef.current.value;
    setDragArea(copyDragArea);
    setModifyTarget(undefined);
  };
  return (
    <Container>
      <InfoBox>
        {dragArea.map(
          (el, idx) =>
            el[4] && (
              <Info key={idx}>
                <span>•</span>
                {modifyTarget === idx ? (
                  <input ref={modifyTextRef} placeholder={el[4]} />
                ) : (
                  <div className="text"> {el[4]}</div>
                )}
                <div>
                  {modifyTarget === idx ? (
                    <>
                      <button
                        className="confirm"
                        onClick={() => modifyHandler(idx)}
                      >
                        확인
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setModifyTarget(idx)}>수정</button>
                      <button onClick={() => removeHandler(idx)}>삭제</button>
                    </>
                  )}
                </div>
              </Info>
            ),
        )}
      </InfoBox>
      <Canvas
        width="630"
        height="700"
        ref={ref}
        onMouseDown={draw}
        onMouseMove={draw}
        onMouseUp={draw}
        getImg={getImg}
      />
      {modalOpen && (
        <TextModal
          modalTextChange={modalTextChange}
          confirmBtn={confirmBtn}
          cancelBtn={cancelBtn}
          textRef={textRef}
          showCaution={showCaution}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 630px;
  height: 700px;
  display: flex;
  justify-content: center;
`;

const InfoBox = styled.ul`
  width: 200px;
  height: auto;
  min-height: 180px;
  overflow: scroll;
  background-color: #cdc9d4;
  border-radius: 10px;
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 30px 10px;
`;

const Info = styled.li`
  width: 100%;
  height: auto;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  span {
    font-size: 1.8rem;
    height: 25px;
    line-height: 25px;
  }
  div.text {
    font-size: 1.8rem;
    width: 90px;
    height: 25px;
    line-height: 25px;
  }
  input {
    height: 25px;
    line-height: 25px;
    font-size: 1.8rem;
    width: 90px;
    border-radius: 5px;
    border: 1px solid #c8c8c8;
    ::placeholder {
      color: white;
      font-weight: 400;
    }
  }
  button {
    border-radius: 5px;
    width: 30px;
    height: 20px;
    margin-left: 5px;
    background-color: skyblue;
    :hover {
      background-color: #c8c8c8;
    }
  }
  button.confirm {
    width: 60px;
  }
`;

const Canvas = styled.canvas`
  border: 1px solid black;
  background-size: cover;
  background-image: url(${getImg});
`;
