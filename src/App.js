import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

function App() {

  const [colour, setColour] = useState("red")
  const [dotSize, setdotSize] = useState(100)
  const [dot, setDot] = useState({})
  const [dots, setDots] = useState([])

  //let colourArray = ["red", "blue", "yellow"]

  const dotArray = []

  let maxHue = Math.floor( Math.random()*360)
  let minHue = maxHue - 10

  let maxLight = 65
  let minLight = 55

  const randomMaxlight = Math.floor(maxLight)
  const randomMinlight = Math.ceil(minLight)
  const randomlightness = Math.floor( Math.random() * (randomMaxlight - randomMinlight) + randomMinlight)

  const minTop = 0
  const maxTop = 750

  const minLeft = 0
  const maxLeft = 1400

  let dotCount = 0
  let top = 25
  let left = 25

  useEffect(() => {

    const interval = setInterval(() => {

      if (dotCount%20 === 0) {
        top = Math.floor(Math.random()*maxTop)
        left = Math.floor(Math.random()*maxLeft)

        if (Math.floor(Math.random()*4) === 0) {
        maxHue = maxHue +2
        minHue = minHue +2
        } else {
          maxHue = maxHue -1
          minHue = minHue -1
        }

      } else {
        let randomDirection = Math.floor(Math.random() * 8) 

        if (randomDirection === 0) {
          top = top+15
        } else if (randomDirection === 1) {
          top = top-15
        } else if (randomDirection === 2) {
          left = left+15
        } else if (randomDirection === 3) {
          left = left-15
        } else if (randomDirection === 4) {
          top = top +10
          left = left+10
        } else if (randomDirection === 5) {
          top = top-10
          left = left+10
        } else if (randomDirection === 6) {
          top = top -10
          left = left-10
        } else {
          top = top +10
          left = left-10
        }

        if (top >= maxTop) {
          top = top - 15
        }
        if (top <= minTop) {
          top = top + 15
        }
        if (left >= maxLeft) {
          left = left - 15
        }
        if (left <= minLeft) {
          left = left + 15
        }
      }


  
      // if (top < 250) {
      //   maxHue = maxHueOne
      //   minHue = minHueOne
      // } else if (dotCount >= 4000) {
      //   maxHue = 5
      //   minHue = -5
      //   top = top + 1
      //   left = left + 1   
      //   if (top >750) {
      //     top = Math.floor(Math.random()*750)
      //   }
      //   if (left > 1400) {
      //     left = Math.floor(Math.random()*1400)
      //   }
      // } else {
      //   maxHue = maxHueTwo
      //   minHue = minHueTwo
      // }

      const randomMaxHue = Math.floor(maxHue)
      const randomMinHue = Math.ceil(minHue)
      const randomHue = Math.floor( Math.random() * (randomMaxHue-randomMinHue) + randomMinHue)
  
      const maxSat = Math.floor(100);
      const minSat = Math.ceil(65);
      const randomSaturation = Math.floor( Math.random()*(maxSat-minSat) + minSat)

      let min = Math.ceil(20);
      let max = Math.floor(30);
      let diameter = Math.floor((Math.random()*(max-min)) + min)
      
      setDot( {index: dotCount, hue: randomHue, saturation: randomSaturation, lightness: randomlightness, top: top, left: left, diameter: diameter} )

      //add to dot count
      dotCount++


      //end the loop
      if (dotCount >= 4000) {
        clearInterval(interval)
      }

    }
      
    ,20);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {
    setDots([...dots, dot])
  }, [dot])



  return (
    <div className="App">
      <div id='canvas'>
          {[...dots.map( dot => {
            return <div className='dot' key={dot.key} style={{background: `hsl(${dot.hue} ${dot.saturation}% ${dot.lightness}%)`, top: dot.top, left: dot.left, width: dot.diameter, height: dot.diameter}}></div>
          })]}
        </div>
    </div>
  );
}

export default App;
