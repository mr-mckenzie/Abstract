import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import ParameterForm from './components/form';

function App() {

  const [dot, setDot] = useState({})
  const [totalDots, setTotalDots] = useState(15000)
  const [canvasHeight, setCanvasHeight] = useState(600)
  const [canvasWidth, setCanvasWidth] = useState(800)
  const [brushStrokeLength, setBrushStrokeLength] = useState(200)
  const [diameter, setDiameter] = useState(30)
  const [directionBeforeChange, setDirectionBeforeChange] = useState(1)
  const [opacity, setOpacity] = useState(85)
  const [speed, setSpeed] = useState(15)
  const [colourChange, setColourChange] = useState(1.0)
  const [smooth, setSmooth] = useState(true)
  const [run, setRun] = useState([])
  const [logoStyle, setLogoStyle] = useState("red")

  // A random starting hue
  let maxHue = Math.floor(Math.random() * 360)
  let minHue = maxHue - 10

  let maxLight = 65
  let minLight = 55

  const randomMaxlight = Math.floor(maxLight)
  const randomMinlight = Math.ceil(minLight)
  const randomlightness = Math.floor(Math.random() * (randomMaxlight - randomMinlight) + randomMinlight)

  const minTop = 0
  const minLeft = 0

  let dotCount = 0
  let top = 25
  let left = 25

  let randomDirection = Math.floor(Math.random() * 8)

  useEffect(() => {

    const interval = setInterval(() => {

      if (dotCount % directionBeforeChange === 0) {
        if (smooth === true) {
          if (randomDirection === 0) {
            randomDirection = [0, 4, 7][Math.floor(Math.random() * 3)]
          } else if (randomDirection === 1) {
            randomDirection = [1, 5, 6][Math.floor(Math.random() * 3)]
          } else if (randomDirection === 2) {
            randomDirection = [2, 4, 5][Math.floor(Math.random() * 3)]
          } else if (randomDirection === 3) {
            randomDirection = [3, 6, 7][Math.floor(Math.random() * 3)]
          } else if (randomDirection === 4) {
            randomDirection = [4, 0, 2][Math.floor(Math.random() * 3)]
          } else if (randomDirection === 5) {
            randomDirection = [5, 1, 2][Math.floor(Math.random() * 3)]
          } else if (randomDirection === 6) {
            randomDirection = [6, 1, 3][Math.floor(Math.random() * 3)]
          } else if (randomDirection === 7) {
            randomDirection = [7, 0, 3][Math.floor(Math.random() * 3)]
          }
        } else {
          randomDirection = Math.floor(Math.random() * 8)
        }
      }

      if (dotCount % brushStrokeLength === 0) {

        top = Math.floor(Math.random() * canvasHeight)
        left = Math.floor(Math.random() * canvasWidth)

        //TODO add in transition to fade colours
      }

      let min = Math.ceil(diameter - diameter / 5);
      let max = Math.floor(diameter);
      let randomDiameter = Math.floor((Math.random() * (max - min)) + min)

      if (randomDirection === 0) {
        top = top + randomDiameter / 3
      } else if (randomDirection === 1) {
        top = top - randomDiameter / 3
      } else if (randomDirection === 2) {
        left = left + randomDiameter / 3
      } else if (randomDirection === 3) {
        left = left - randomDiameter / 3
      } else if (randomDirection === 4) {
        top = top + randomDiameter / 3
        left = left + randomDiameter / 3
      } else if (randomDirection === 5) {
        top = top - randomDiameter / 3
        left = left + randomDiameter / 3
      } else if (randomDirection === 6) {
        top = top - randomDiameter / 3
        left = left - randomDiameter / 3
      } else {
        top = top + randomDiameter / 3
        left = left - randomDiameter / 3
      }

      if (top >= canvasHeight) {
        top = 1
      }
      if (top <= minTop) {
        top = canvasHeight
      }
      if (left >= canvasWidth) {
        left = 1
      }
      if (left <= minLeft) {
        left = canvasWidth
      }

      const randomMaxHue = Math.floor(maxHue)
      const randomMinHue = Math.ceil(minHue)
      const randomHue = Math.floor(Math.random() * (randomMaxHue - randomMinHue) + randomMinHue)

      const maxSat = Math.floor(100);
      const minSat = Math.ceil(65);
      const randomSaturation = Math.floor(Math.random() * (maxSat - minSat) + minSat)

      // Hue either randomly goes clockwise or anticlockwise on colour wheel
      if (Math.floor(Math.random() * 2) === 0) {
        maxHue = maxHue + colourChange
        minHue = minHue + colourChange
      } else {
        maxHue = maxHue - colourChange
        minHue = minHue - colourChange
      }

      setDot({ index: dotCount, hue: randomHue, saturation: randomSaturation, lightness: randomlightness, top: top, left: left, diameter: randomDiameter, opacity: opacity, dotNumber: dotCount})

      //add to dot count
      dotCount++

      //end the loop
      if (dotCount >= totalDots) {
        clearInterval(interval)
      }
    }
      //rate of dot generation
      , speed);

    return () => clearInterval(interval);

  }, [run]);

  let canvas;
  let context;

  //set canvas background to white
  useEffect(() => {
    canvas = document.getElementById('dotCanvas')   // access the canvas object
    context = canvas.getContext('2d')                // set context to 2d
    context.fillStyle = 'whitesmoke'
    context.fillRect(0, 0, canvasWidth, canvasHeight)
  }, [run])

  useEffect(() => {
    canvas = document.getElementById('dotCanvas')   // access the canvas object
    context = canvas.getContext('2d')                // set context to 2d

    let blob = new Path2D();
    //TO DO - make it that dot is centred on the line and does not generate with overhang below or to right
    blob.roundRect(dot.left - (diameter / 2), dot.top - (diameter / 2), dot.diameter, dot.diameter, dot.diameter / 5)

    context.fillStyle = `hsl(${dot.hue} ${dot.saturation}% ${dot.lightness}% / ${dot.opacity}%)`
    context.fill(blob)

    if ((dot.dotNumber * speed) % 1000 === 0 || dot.dotNumber===0) {
      setLogoStyle(`hsl(${dot.hue} ${dot.saturation}% ${dot.lightness}% / 85%)`)
    }

  }, [dot])

  return (
    <div className="App">
      <div className="header">
        {/* <div className="divLogo"></div> */}
        <div className="divLogo" style={{ backgroundColor: logoStyle}}></div>
        <h1>Abstract</h1>
      </div>
      <div className="content">
        <canvas id="dotCanvas" width={canvasWidth} height={canvasHeight}>
          Please upgrade your browser
        </canvas>
        <ParameterForm totalDots={totalDots} setTotalDots={setTotalDots} canvasHeight={canvasHeight} setCanvasHeight={setCanvasHeight} canvasWidth={canvasWidth} setCanvasWidth={setCanvasWidth} brushStrokeLength={brushStrokeLength} setBrushStrokeLength={setBrushStrokeLength} diameter={diameter} setDiameter={setDiameter} directionBeforeChange={directionBeforeChange} setDirectionBeforeChange={setDirectionBeforeChange} opacity={opacity} setOpacity={setOpacity} speed={speed} setSpeed={setSpeed} colourChange={colourChange} setColourChange={setColourChange} smooth={smooth} setSmooth={setSmooth} run={run} setRun={setRun} />
      </div>
    </div>
  );
}

export default App;