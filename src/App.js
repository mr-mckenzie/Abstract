import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

function App() {

  const [dot, setDot] = useState({})
  const [dots, setDots] = useState([])

  const dotArray = []

  let maxHue = Math.floor( Math.random()*360)
  let minHue = maxHue - 10

  let maxLight = 65
  let minLight = 55

  const randomMaxlight = Math.floor(maxLight)
  const randomMinlight = Math.ceil(minLight)
  const randomlightness = Math.floor( Math.random() * (randomMaxlight - randomMinlight) + randomMinlight)

  const minTop = 0
  const maxTop = 250

  const minLeft = 0
  const maxLeft = 250

  let dotCount = 0
  let top = 25
  let left = 25

  let randomDirection = Math.floor(Math.random() * 8)

  useEffect(() => {

    const interval = setInterval(() => {

      if (dotCount%2 === 0) {
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
      


      if (dotCount%10000 === 0) {
        
        top = Math.floor(Math.random()*maxTop)
        left = Math.floor(Math.random()*maxLeft)

        // if (Math.floor(Math.random()*2) === 0) {
        // maxHue = maxHue +1
        // minHue = minHue +1
        // } else {
        //   maxHue = maxHue -1
        //   minHue = minHue -1
        // }

        //TODO add in transition to fade colours

      }

        if (randomDirection === 0) {
          top = top+3
        } else if (randomDirection === 1) {
          top = top-3
        } else if (randomDirection === 2) {
          left = left+3
        } else if (randomDirection === 3) {
          left = left-3
        } else if (randomDirection === 4) {
          top = top +2
          left = left+2
        } else if (randomDirection === 5) {
          top = top-2
          left = left+2
        } else if (randomDirection === 6) {
          top = top -2
          left = left-2
        } else {
          top = top +2
          left = left-2
        }

        if (top >= maxTop) {
          top = minTop + 15
        }
        if (top <= minTop) {
          top = maxTop - 15
        }
        if (left >= maxLeft) {
          left = minLeft + 15
        }
        if (left <= minLeft) {
          left = maxLeft - 15
        }
      

      const randomMaxHue = Math.floor(maxHue)
      const randomMinHue = Math.ceil(minHue)
      const randomHue = Math.floor( Math.random() * (randomMaxHue-randomMinHue) + randomMinHue)
  
      const maxSat = Math.floor(100);
      const minSat = Math.ceil(65);
      const randomSaturation = Math.floor( Math.random()*(maxSat-minSat) + minSat)

      let min = Math.ceil(7);
      let max = Math.floor(10);
      let diameter = Math.floor((Math.random()*(max-min)) + min)

        if (Math.floor(Math.random()*2) === 0) {
        maxHue = maxHue +0.5
        minHue = minHue +0.5
        } else {
          maxHue = maxHue -0.5
          minHue = minHue -0.5
        }
      
      setDot( {index: dotCount, hue: randomHue, saturation: randomSaturation, lightness: randomlightness, top: top, left: left, diameter: diameter} )

      //add to dot count
      dotCount++


      //end the loop
      if (dotCount >= 10000) {
        clearInterval(interval)
      }

    }
      //speed of dot generation
    ,10);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {
    setDots([...dots, dot])
  }, [dot])

let canvas;
let context;

  useEffect(() => {
    canvas = document.getElementById('dotCanvas')   // access the canvas object
    context = canvas.getContext('2d')                // set context to 2d
    context.fillStyle = `hsl(${dot.hue} ${dot.saturation}% ${dot.lightness}% / 90%)`
    context.fillRect(dot.left, dot.top, 3, 3)
  }, [dot])



  return (
    <div className="App">
      {/* <div id='canvas'>
          {[...dots.map( dot => {
            return <div className='dot' key={dot.key} style={{background: `hsl(${dot.hue} ${dot.saturation}% ${dot.lightness}%)`, top: dot.top, left: dot.left, width: dot.diameter, height: dot.diameter}}></div>
          })]} */}
          <canvas id="dotCanvas" width={maxLeft} height={maxTop}>
  UPDATE BROWSER PLEASE!
            </canvas>
        {/* </div> */}
    </div>
  );
}

export default App;
