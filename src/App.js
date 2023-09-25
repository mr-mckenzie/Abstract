import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import ParameterForm from './components/form';

function App() {

  const [dot, setDot] = useState({})
  const [totalDots, setTotalDots] = useState(15000)
  const [brushStrokeLength, setBrushStrokeLength] = useState(200)
  const [diameter, setDiameter] = useState(30)
  const [directionBeforeChange, setDirectionBeforeChange] = useState(1)
  const [opacity, setOpacity] = useState(85)
  const [speed, setSpeed] = useState(15)
  const [colourChange, setColourChange] = useState(1.0)
  const [smooth, setSmooth] = useState(true)
  const [run, setRun] = useState(true)
  const [logoStyle, setLogoStyle] = useState("aquamarine")
  const [scroll, setScroll] = useState(true)

  // A random starting hue
  let maxHue = Math.floor(Math.random() * 360)
  let minHue = maxHue - 10

  let maxLight = 65
  let minLight = 55

  const randomMaxlight = Math.floor(maxLight)
  const randomMinlight = Math.ceil(minLight)
  const randomlightness = Math.floor(Math.random() * (randomMaxlight - randomMinlight) + randomMinlight)

  let canvasHeight = 600
  let canvasWidth = 800

  let dotCount = 0
  let xAxis = 0
  let yAxis = 0

  let randomDirection = Math.floor(Math.random() * 8)

  useEffect(() => {

    if (run === true || run === "restart") {

      const interval = setInterval(() => {
        if (dotCount % directionBeforeChange === 0) {
          if (smooth === true) {
            randomDirection = [(randomDirection + 7) % 8, randomDirection, (randomDirection + 1) % 8][Math.floor(Math.random() * 3)]
          } else {
            randomDirection = Math.floor(Math.random() * 8)
          }
        }

        let min = Math.ceil(diameter - diameter / 5);
        let max = Math.floor(diameter);
        let randomDiameter = Math.floor((Math.random() * (max - min)) + min)

        let directionChange = [
          //right
          { xAxis: xAxis + randomDiameter / 3,
            yAxis: yAxis },
          //up and right
          { xAxis: xAxis + randomDiameter / 3,
            yAxis: yAxis + randomDiameter / 3 },
          //up
          { xAxis: xAxis,
            yAxis: yAxis + randomDiameter / 3 },
          //up and left
          { xAxis: xAxis - randomDiameter / 3,
            yAxis: yAxis + randomDiameter / 3 },
          //left
          { xAxis: xAxis - randomDiameter / 3,
            yAxis: yAxis },
          //down and left
          { xAxis: xAxis - randomDiameter / 3,
            yAxis: yAxis - randomDiameter / 3 },
          //down
          { xAxis: xAxis,
            yAxis: yAxis - randomDiameter / 3 },
          //down and right
          { xAxis: xAxis + randomDiameter / 3,
            yAxis: yAxis - randomDiameter / 3 },
        ]

        if (dotCount % brushStrokeLength === 0) {
          xAxis = Math.floor(Math.random() * canvasWidth)
          yAxis = Math.floor(Math.random() * canvasHeight)
        } else {
          xAxis = directionChange[randomDirection].xAxis
          yAxis = directionChange[randomDirection].yAxis
        }

        let oppositeX = ((12 - randomDirection) % 8)
        let oppositeY = ((8 - randomDirection) % 8)

        if (scroll == true) {
          if (yAxis > canvasHeight) {
            yAxis = 0
          }
          if (yAxis < 0) {
            yAxis = canvasHeight
          }
          if (xAxis > canvasWidth) {
            xAxis = 0
          }
          if (xAxis < 0) {
            xAxis = canvasWidth
          }
        } else if (scroll == false) {
          if (yAxis > canvasHeight || yAxis < 0) {
            randomDirection = oppositeY
            xAxis = directionChange[randomDirection].xAxis
            yAxis = directionChange[randomDirection].yAxis
          }
          if (xAxis > canvasWidth || xAxis < 0) {
            randomDirection = oppositeX
            xAxis = directionChange[randomDirection].xAxis
            yAxis = directionChange[randomDirection].yAxis
          }
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

        setDot({ dotNumber: dotCount, hue: randomHue, saturation: randomSaturation, lightness: randomlightness, xAxis: xAxis, yAxis: yAxis, diameter: randomDiameter, opacity: opacity })

        //add to dot count
        dotCount++

        //end the loop
        if (dotCount >= totalDots) {
          clearInterval(interval)
        }
      }
        , speed);

      return () => clearInterval(interval);

    }
  }, [run]);

  let canvas;
  let context;

  useEffect(() => {
    if (run !== false) {
      canvas = document.getElementById('dotCanvas')     // access the canvas object
      context = canvas.getContext('2d')                 // set context to 2d
      context.fillStyle = 'whitesmoke'                
      context.fillRect(0, 0, canvasWidth, canvasHeight) // set canvas background to whitesmoke
    }
  }, [run])

  useEffect(() => {
    canvas = document.getElementById('dotCanvas')
    context = canvas.getContext('2d')

    let blob = new Path2D();
    blob.roundRect(dot.xAxis - (dot.diameter / 2), dot.yAxis - (dot.diameter / 2), dot.diameter, dot.diameter, dot.diameter / 5)
    context.fillStyle = `hsl(${dot.hue} ${dot.saturation}% ${dot.lightness}% / ${dot.opacity}%)`
    context.fill(blob)

    if (dot.dotNumber % Math.round(1000 / speed) === 0 || dot.dotNumber === 0) {
      setLogoStyle(`hsl(${dot.hue} ${dot.saturation}% ${dot.lightness}% / 85%)`)
    }

  }, [dot])

  return (
    <div className="App">
      <div className="header">
        <div className="divLogo" style={{ backgroundColor: logoStyle }}></div>
        <h1>Abstract</h1>
      </div>
      <div className="content">
        <canvas id="dotCanvas" width={canvasWidth} height={canvasHeight}>
          Please upgrade your browser
        </canvas>
        <ParameterForm totalDots={totalDots} setTotalDots={setTotalDots} brushStrokeLength={brushStrokeLength} setBrushStrokeLength={setBrushStrokeLength} diameter={diameter} setDiameter={setDiameter} directionBeforeChange={directionBeforeChange} setDirectionBeforeChange={setDirectionBeforeChange} opacity={opacity} setOpacity={setOpacity} speed={speed} setSpeed={setSpeed} colourChange={colourChange} setColourChange={setColourChange} smooth={smooth} setSmooth={setSmooth} scroll={scroll} setScroll={setScroll} run={run} setRun={setRun} />
      </div>
    </div>
  );
}

export default App;