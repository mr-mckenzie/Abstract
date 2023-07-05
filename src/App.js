import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import { eventWrapper } from '@testing-library/user-event/dist/utils';

function App() {

  const [dot, setDot] = useState({})
  // const [dots, setDots] = useState([])
  const [totalDots, setTotalDots] = useState(15000)
  const [canvasHeight, setCanvasHeight] = useState(600)
  const [canvasWidth, setCanvasWidth] = useState(800)
  const [brushStrokeLength, setBrushStrokeLength] = useState(100)
  const [diameter, setDiameter] = useState(22)
  const [directionBeforeChange, setDirectionBeforeChange] = useState(2)
  const [opacity, setOpacity] = useState(80)
  const [run, setRun] = useState([])
  const [speed, setSpeed] = useState(3)


  const dotArray = []

  let maxHue = Math.floor( Math.random()*360)
  let minHue = maxHue - 10

  let maxLight = 65
  let minLight = 55

  const randomMaxlight = Math.floor(maxLight)
  const randomMinlight = Math.ceil(minLight)
  const randomlightness = Math.floor( Math.random() * (randomMaxlight - randomMinlight) + randomMinlight)

  const minTop = 0
  //const canvasHeight = 500

  const minLeft = 0
  //const canvasWidth = 500

  //const totalDots = 100000
  
  const handleTotalDotChange = (event) => {
    setTotalDots(event.target.value)
  };
  
  const handleCanvasHeightChange = (event) => {
    setCanvasHeight(event.target.value)
  };
  
  const handleCanvasWidthChange = (event) => {
    setCanvasWidth(event.target.value)
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      let runAgain = [...run]
      setRun([runAgain[0] + 1]);
  }
  
  const handleBrushStrokeLengthChange = (event) => {
    setBrushStrokeLength(event.target.value)
  };
  const handleDiameterChange = (event) => {
    setDiameter(event.target.value)
  };
  const handleOpacityChange = (event) => {
    setOpacity(event.target.value)
  };
  const handleDirectionBeforeChange = (event) => {
    setDirectionBeforeChange(event.target.value)
  };
  const handleSpeedChange = (event) => {
    setSpeed(event.target.value)
  };
  //const brushStrokeLength = 1000

  let dotCount = 0
  let top = 25
  let left = 25

  let randomDirection = Math.floor(Math.random() * 8)

  useEffect(() => {

    const interval = setInterval(() => {

      if (dotCount%directionBeforeChange === 0) {
        if (randomDirection === 0) {
          randomDirection = [0,4,7][Math.floor(Math.random() * 3)]
        } else if (randomDirection === 1) {
          randomDirection = [1, 5, 6][Math.floor(Math.random() * 3)]          
        } else if (randomDirection === 2){
        randomDirection = [2, 4, 5][Math.floor(Math.random() * 3)] 
        } else if (randomDirection === 3){
        randomDirection = [3, 6, 7][Math.floor(Math.random() * 3)] 
        } else if (randomDirection === 4) {
        randomDirection = [4, 0, 2][Math.floor(Math.random() * 3)] 
        } else if (randomDirection === 5) {
        randomDirection = [5, 1, 2][Math.floor(Math.random() * 3)] 
        } else if (randomDirection === 6) {
        randomDirection = [6, 1, 3][Math.floor(Math.random() * 3)] 
        } else if (randomDirection === 7) {
        randomDirection = [7, 0, 3][Math.floor(Math.random() * 3)] 
      } else {
        Math.floor(Math.random() * 8)
      }
    }
      


      if (dotCount%brushStrokeLength === 0) {
        
        top = Math.floor(Math.random()*canvasHeight)
        left = Math.floor(Math.random()*canvasWidth)

        // if (Math.floor(Math.random()*2) === 0) {
        // maxHue = maxHue +1
        // minHue = minHue +1
        // } else {
        //   maxHue = maxHue -1
        //   minHue = minHue -1
        // }

        //TODO add in transition to fade colours

      }

      let min = Math.ceil(diameter-diameter/5);
      let max = Math.floor(diameter);
      let randomDiameter = Math.floor((Math.random()*(max-min)) + min)

        if (randomDirection === 0) {
          top = top+randomDiameter/3
        } else if (randomDirection === 1) {
          top = top-randomDiameter/3
        } else if (randomDirection === 2) {
          left = left+randomDiameter/3
        } else if (randomDirection === 3) {
          left = left-randomDiameter/3
        } else if (randomDirection === 4) {
          top = top+randomDiameter/3
          left = left+randomDiameter/3
        } else if (randomDirection === 5) {
          top = top-randomDiameter/3
          left = left+randomDiameter/3
        } else if (randomDirection === 6) {
          top = top-randomDiameter/3
          left = left-randomDiameter/3
        } else {
          top = top+randomDiameter/3
          left = left-randomDiameter/3
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
      const randomHue = Math.floor( Math.random() * (randomMaxHue-randomMinHue) + randomMinHue)
  
      const maxSat = Math.floor(100);
      const minSat = Math.ceil(65);
      const randomSaturation = Math.floor( Math.random()*(maxSat-minSat) + minSat)


        if (Math.floor(Math.random()*2) === 0) {
        maxHue = maxHue +0.2
        minHue = minHue +0.2
        } else {
          maxHue = maxHue -0.2
          minHue = minHue -0.2
        }
      
      setDot( {index: dotCount, hue: randomHue, saturation: randomSaturation, lightness: randomlightness, top: top, left: left, diameter: randomDiameter} )

      //add to dot count
      dotCount++


      //end the loop
      if (dotCount >= totalDots) {
        clearInterval(interval)
      }

    }
      //speed of dot generation
    ,speed);

    return () => clearInterval(interval);

  }, [run]);

  // useEffect(() => {
  //   setDots([...dots, dot])
  // }, [dot])

let canvas;
let context;

//set canvas background to white
useEffect(() => {
  canvas = document.getElementById('dotCanvas')   // access the canvas object
  context = canvas.getContext('2d')                // set context to 2d
  context.fillStyle = 'whitesmoke'
  context.fillRect(0,0, canvasWidth, canvasHeight)
}, [canvasHeight, canvasWidth, run])

  useEffect(() => {
    canvas = document.getElementById('dotCanvas')   // access the canvas object
    context = canvas.getContext('2d')                // set context to 2d

    let blob = new Path2D();
    //TO DO - make it that dot is centred on the line and does not generate with overhang below or to right
    blob.roundRect(dot.left, dot.top, dot.diameter, dot.diameter, dot.diameter/5)

    context.fillStyle = `hsl(${dot.hue} ${dot.saturation}% ${dot.lightness}% / ${opacity}%)`
    context.fill(blob)
    //context.fill(dot.left, dot.top, diameter, diameter)
  }, [dot, run])



  return (
    <div className="App">
      {/* <div id='canvas'>
          {[...dots.map( dot => {
            return <div className='dot' key={dot.key} style={{background: `hsl(${dot.hue} ${dot.saturation}% ${dot.lightness}%)`, top: dot.top, left: dot.left, width: dot.diameter, height: dot.diameter}}></div>
          })]} */}
          <canvas id="dotCanvas" width={canvasWidth} height={canvasHeight}>
  UPDATE BROWSER PLEASE!
            </canvas>
            <form onSubmit={handleSubmit}>
              <label>Total # of Dots:
                <input onChange={handleTotalDotChange} min={1000} value={totalDots} type='number'></input>
              </label>
              <label>Brush Stroke Length:
                <input onChange={handleBrushStrokeLengthChange} value={brushStrokeLength} type='number'></input>
              </label>
              <label>Change Direction (px):
                <input onChange={handleDirectionBeforeChange} min={1} value={directionBeforeChange} type='number'></input>
              </label>
              <label>Diameter (px):
                <input onChange={handleDiameterChange} value={diameter} type='number'></input>
              </label>
              <label>Opacity (%):
                <input onChange={handleOpacityChange} min={0} max={100} value={opacity} type='number'></input>
              </label>
              <label>Canvas Height (pixels):
                <input onChange={handleCanvasHeightChange} min={100} max={700} value={canvasHeight} type='number'></input>
              </label>
              <label>Canvas Width (pixels):
                <input onChange={handleCanvasWidthChange} min={100} max={1450} value={canvasWidth} type='number'></input>
              </label>
              <label>Speed of dot generation (ms):
                <input onChange={handleSpeedChange} min={0.1} max={1000} value={speed} type='number' step={0.1}></input>
              </label>
              <input type="submit" value="ART!" />
            </form>
        {/* </div> */}
    </div>
  );
}

export default App;
