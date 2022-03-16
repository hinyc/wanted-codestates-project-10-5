import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import getImg from '../assets/fashion-unsplash.jpeg';

export default function ImgCanvas() {
  const [startPoint, setStartPoint] = useState([]);
  const [endPoint, setEndPoint] = useState([]);
  const [drawState, setDrawState] = useState(false);
  const [addTextState, setAddTextState] = useState(false);
  const [dragArea, setDragArea] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    let ctx = ref.current.getContext('2d');
    ctx.fillStyle = '#c7f4734a';
    ctx.strokeStyle = '#1793b56b';
    if (drawState) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      dragArea.forEach((el) => {
        ctx.strokeRect(el[0], el[1], el[2], el[3]);
        ctx.fillRect(el[0], el[1], el[2], el[3]);
      });

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
      console.log('a');
      ctx.fillStyle = 'black';
      ctx.font = '18px serif ';
      ctx.fillText('good', startPoint[0] + 1, startPoint[1] + 18);
      setAddTextState(false);
    }
  }, [dragArea, drawState, endPoint, startPoint]);

  useEffect(() => {});

  const draw = (e) => {
    const offsetX = e.target.offsetLeft;
    const offsetY = e.target.offsetTop;
    switch (e.type) {
      case 'mouseup':
        setEndPoint([e.pageX - offsetX, e.pageY - offsetY]);
        setDrawState(false);
        setAddTextState(true);
        setDragArea([
          ...dragArea,
          [
            startPoint[0],
            startPoint[1],
            endPoint[0] - startPoint[0],
            endPoint[1] - startPoint[1],
          ],
        ]);
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
  return (
    <Container>
      <Canvas
        width="900"
        height="1000"
        ref={ref}
        onMouseDown={draw}
        onMouseMove={draw}
        onMouseUp={draw}
        getImg={getImg}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Canvas = styled.canvas`
  border: 1px solid black;
  background-size: cover;
  background-image: url(${getImg});
`;
