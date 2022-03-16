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
  const ref = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = ref.current.getContext('2d');
    if (drawState) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      dragArea.forEach((el) => {
        ctx.fillStyle = '#c7f4734a';
        ctx.strokeStyle = '#1793b56b';
        ctx.strokeRect(el[0], el[1], el[2], el[3]);
        ctx.fillRect(el[0], el[1], el[2], el[3]);
        ctx.fillStyle = 'black';
        ctx.font = '18px serif';
        ctx.fillText(el[4], el[0] + 1, el[1] + 18);
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
    if (addTextState) {
      ctx.fillStyle = 'black';
      ctx.font = '18px serif ';
      ctx.fillText(areaName, startPoint[0] + 1, startPoint[1] + 18);
      setAddTextState(false);
    }
  }, [addTextState, areaName, dragArea, drawState, endPoint, startPoint]);

  const draw = (e) => {
    const offsetX = e.target.offsetLeft;
    const offsetY = e.target.offsetTop;
    switch (e.type) {
      case 'mouseup':
        setEndPoint([e.pageX - offsetX, e.pageY - offsetY]);
        setDrawState(false);
        setDragArea([
          ...dragArea,
          [
            startPoint[0],
            startPoint[1],
            endPoint[0] - startPoint[0],
            endPoint[1] - startPoint[1],
          ],
        ]);
        setModalOpen(!modalOpen);
        // prompt();
        break;
      case 'mousedown':
        console.log(dragArea);
        setDrawState(true);
        setStartPoint([e.pageX - offsetX, e.pageY - offsetY]);
        setEndPoint([]);
        break;
      case 'mousemove':
        setEndPoint([e.pageX - offsetX, e.pageY - offsetY]);
        break;
      default:
        return;
    }
  };

  const modalTextChange = (e) => {};

  const confirmBtn = () => {
    setModalOpen(!modalOpen);
    // console.log(textRef.current.value);
    setAddTextState(true);
    setAreaName(textRef.current.value);
    const copyData = [...dragArea];
    copyData[copyData.length - 1].push(textRef.current.value);
    console.log(copyData);
    setDragArea(copyData);
  };
  console.log(dragArea);

  const cancelBtn = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <Container>
      <InfoBox>
        {dragArea.map((el, idx) => (
          <Info key={idx}>{el[4]}</Info>
        ))}
      </InfoBox>
      <Canvas
        width="900"
        height="1000"
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
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const InfoBox = styled.ul`
  width: 200px;
  height: auto;
  min-height: 180px;
  overflow: scroll;
  background-color: #fff;
  border: 1px solid #ccc;
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 30px 0;
`;

const Info = styled.li`
  width: 100%;
  height: auto;
  font-size: 2rem;
  list-style: disc;
  list-style-position: inside;
`;

const Canvas = styled.canvas`
  border: 1px solid black;
  background-size: cover;
  background-image: url(${getImg});
`;
