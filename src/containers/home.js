import React, { useState, useRef } from "react";
import Spacing from "../components/spacing";
import Styles from "../styles";
const Home = () => {
  const [margin, setMargin] = useState(10);
  const [currentPattern, setCurrentPattern] = useState(6);

  const changeMargin = newMargin => {
    setMargin(newMargin);
  };
  const shuffleColors = () => {
    setCurrentPattern(Math.floor(Math.random() * Math.floor(6)));
  };

  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);

  function* generateCoordinates() {
    for (let x = 0; x < 128; x++) {
      for (let y = 0; y < 256; y++) {
        yield [x, y];
      }
    }
    return 3;
  }

  const getColor = (r, g, b) => {
    let color = "";
    switch (currentPattern) {
      case 1:
        color = r + "," + g + "," + b;
        break;
      case 2:
        color = r + "," + b + "," + g;
        break;
      case 3:
        color = g + "," + b + "," + r;
        break;
      case 4:
        color = g + "," + r + "," + b;
        break;
      case 5:
        color = b + "," + g + "," + r;
        break;
      case 6:
        color = b + "," + r + "," + g;
        break;
      default:
        color = r + "," + g + "," + b;
    }
    return color;
  };

  React.useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");
      if (renderCtx) {
        setContext(renderCtx);
      }
      if (context) {
        let coordinates = generateCoordinates();
        //to clear canvas
        // context.clearRect(0, 0, 512, 256);
        for (let r = 0; r < 256; r += 8) {
          for (let g = 0; g < 256; g += 8) {
            for (let b = 0; b < 256; b += 8) {
              let [x, y] = coordinates.next().value;
              context.fillStyle = `rgb(${getColor(r, g, b)})`;
              context.fillRect(x * margin, y * margin, 10, 10);
            }
          }
        }
      }
    }
  }, [context, margin, currentPattern]);

  return (
    <div>
      <div style={Styles.container}>
        <h2>COLOUR GENERATED IMAGE</h2>
        <div style={Styles.spacingContainer}>
          <Spacing margin={margin} changeMargin={changeMargin} />
          <button onClick={shuffleColors}>Shuffle Colors</button>
        </div>
        <div
          style={{
            textAlign: "center"
          }}
        >
          <canvas
            id="canvas"
            ref={canvasRef}
            width={512}
            height={256}
            style={{
              border: "1px solid #000",
              marginTop: 10,
              padding: 5
            }}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default Home;
