import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

function App() {

  const [colour, setColour] = useState("red")
  const [dotSize, setdotSize] = useState(100)
  const [dot, setDot] = useState({})
  const [dots, setDots] = useState([])

  let colourArray = ["red", "blue", "yellow"]

  // setInterval( () => {




  // }, 10*1000)

  const dotArray = []

  let maxHueTop = Math.floor( Math.random()* 360)
  let minHueTop = maxHueTop - 10

  let maxHueBottom = Math.floor( Math.random()* 360)
  let minHueBottom = maxHueBottom - 10

  let minTop = 0
  let maxTop = 750

  let minLeft = 0
  let maxLeft = 1400


  let dotCount = 0


  useEffect(() => {


    const interval = setInterval(() => {

      let top = Math.floor(Math.random()*750)
      let left = Math.floor(Math.random()*1400)

      let maxHue
      let minHue
  
      if (top < 250) {
        maxHue = maxHueBottom
        minHue = minHueBottom
      } else if (dotCount >= 4000) {
        maxHue = 5
        minHue = -5
        top = top + 1
        left = left + 1   
        if (top >750) {
          top = Math.floor(Math.random()*750)
        }
        if (left > 1400) {
          left = Math.floor(Math.random()*1400)
        }
      } else {
        maxHue = maxHueTop
        minHue = minHueTop
      }

      // if (dotCount >= 5000 && dotCount%100===0) {
      //   maxHue = maxHue + 30
      //   minHue = minHue + 30
      //   minTop = minTop + 100
      //   maxTop = maxTop - 100
      //   const randomMaxTop = Math.floor(maxTop)
      //   const randomMinTop = Math.ceil(minTop)
      //   top = Math.floor(Math.random() * (randomMaxTop-randomMinTop) + randomMinTop)
      // }
  
      // if(i>2750){
      // maxHue = Math.floor(55)
      // minHue = Math.ceil(15)}
      // if (i%10 && i>=4920){
      //   console.log("change of colour")
      //   maxHue = maxHue + 1
      //   minHue = minHue - 1
      // }
      const randomMaxHue = Math.floor(maxHue)
      const randomMinHue = Math.ceil(minHue)
      const randomHue = Math.floor( Math.random() * (randomMaxHue-randomMinHue) + randomMinHue)
  
      const maxSat = Math.floor(100);
      const minSat = Math.ceil(70);
      const randomSaturation = Math.floor( Math.random()*(maxSat-minSat) + minSat)

      let min = Math.ceil(20);
      let max = Math.floor(30);
      let diameter = Math.floor((Math.random()*(max-min)) + min)

      
      setDot( {index: dotCount, hue: randomHue, saturation: randomSaturation, top: top, left: left, diameter: diameter} )

      //add to dot count
      dotCount++

      //end the loop
      if (dotCount > 5000) {
        clearInterval(interval)
      }

    }
      
    ,1);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {
    setDots([...dots, dot])
  }, [dot])



  return (
    <div className="App">
      <div id='canvas'>
          {[...dots.map( dot => {
            return <div className='dot' key={dot.key} style={{background: `hsl(${dot.hue} ${dot.saturation}% 50%)`, top: dot.top, left: dot.left, width: dot.diameter, height: dot.diameter}}></div>
          })]}
        </div>
    </div>
  );
}

export default App;
