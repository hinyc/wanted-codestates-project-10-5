import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import getImg from '../assets/fashion-unsplash.jpeg';

export default function ImgCanvas() {
  const [startPoint, setStartPoint] = useState([]);
  const [endPoint, setEndPoint] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    console.dir(ref.current);
    let ctx = ref.current.getContext('2d');
    ctx.fillStyle = 'rgb(200,0,0)';
    ctx.strokeRect(0, 0, 5, 2.5);
    ctx.fillStyle = 'rgb(100,50,0)';
    ctx.strokeRect(5, 5, 5, 2.5);
    ctx.fillStyle = 'rgb(200,200,0)';
    ctx.strokeRect(10, 10, 5, 2.5);
    ctx.fillStyle = 'rgb(200,0,200)';
    ctx.strokeRect(15, 15, 5, 2.5);
    ctx.fillStyle = 'rgb(0,200,0)';
    ctx.strokeRect(20, 20, 5, -2.5);

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }, [endPoint, startPoint]);

  const draw = (e) => {
    console.log(e);
    let ctx = ref.current.getContext('2d');
    // ctx.moveTo(0, 0);
    // ctx.lineTo(200, 20);
    // ctx.stroke();
    const offsetX = e.target.offsetLeft;
    const offsetY = e.target.offsetTop;
    console.log(e.target);
    switch (e.type) {
      case 'mouseup':
        setEndPoint([e.pageX - offsetX, e.pageY - offsetY]);
        break;
      case 'mousedown':
        setStartPoint([e.pageX - offsetX, e.pageY - offsetY]);
        setEndPoint([]);
        console.log('a');
        break;
      // case 'mousemove':
      // console.log('a');
      //   break;
      default:
        return;
    }
  };
  console.log(startPoint, endPoint);
  return (
    <Container>
      <Canvas
        ref={ref}
        onMouseDown={draw}
        // onMouseMove={draw}
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
  width: 1000px;
  height: 500px;
  border: 1px solid black;
  background-size: cover;
  background-image: url(${getImg});

  /* background-color: rgba(0, 0, 0, 0); */
`;
