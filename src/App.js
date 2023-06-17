import { useState } from 'react';
import './App.css';

function App() {

  const [colour, setColour] = useState("red")
  const [dotSize, setdotSize] = useState(100)

  let colourArray = ["red", "blue", "yellow"]

  // setInterval( () => {

  // }, 10*1000)

  const dotArray = []

  let maxHue = 5
  let minHue = -5

  let minTop = 0
  let maxTop = 0

  for (let i=0; i<3000; i++) {
    // if(i>2750){
    // maxHue = Math.floor(55)
    // minHue = Math.ceil(15)}
    if (i%10 && i>=2950){
      console.log("change of colour")
      maxHue = maxHue + 10
      minHue = minHue + 10
    }
    const randomMaxHue = Math.floor(maxHue)
    const randomMinHue = Math.ceil(minHue)
    const randomHue = Math.floor( Math.random() * (randomMaxHue-randomMinHue) + randomMinHue)

    const maxSat = Math.floor(100);
    const minSat = Math.ceil(70);
    const randomSaturation = Math.floor( Math.random()*(maxSat-minSat) + minSat)

    //let randomB = Math.floor( Math.random() * 255)
    let top = Math.floor(Math.random()*750)
    let left = Math.floor(Math.random()*750)
    let min = Math.ceil(20);
    let max = Math.floor(30);
    let diameter = Math.floor((Math.random()*(max-min)) + min)
    dotArray.push( {index: i, hue: randomHue, saturation: randomSaturation, top: top, left: left, diameter: diameter} )
  }




  return (
    <div className="App">
      <div id='canvas'>
          {dotArray.map(style => {
            return <div className='dot' key={style.index} style={{background: `hsl(${style.hue} ${style.saturation}% 50%)`, top: style.top, left: style.left, width: style.diameter, height: style.diameter}}></div>
          })}
        </div>
    </div>
  );
}

export default App;
