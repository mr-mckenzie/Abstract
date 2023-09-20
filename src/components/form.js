import { useState } from "react";

const ParameterForm = ({ totalDots, setTotalDots, brushStrokeLength, setBrushStrokeLength, diameter, setDiameter, directionBeforeChange, setDirectionBeforeChange, opacity, setOpacity, speed, setSpeed, colourChange, setColourChange, smooth, setSmooth, run, setRun }) => {

    const [preset, setPreset] = useState("classic")

    const handleTotalDotChange = (event) => {
        const newValue = Number(event.target.value)
        setTotalDots(newValue)
    };
    const handleBrushStrokeLengthChange = (event) => {
        const newValue = Number(event.target.value)
        setBrushStrokeLength(newValue)
    };
    const handleDiameterChange = (event) => {
        const newValue = Number(event.target.value)
        setDiameter(newValue)
    };
    const handleOpacityChange = (event) => {
        const newValue = Number(event.target.value)
        setOpacity(newValue)
    };
    const handleDirectionBeforeChange = (event) => {
        const newValue = Number(event.target.value)
        setDirectionBeforeChange(newValue)
    };
    const handleSpeedChange = (event) => {
        const newValue = Number(event.target.value)
        setSpeed(newValue)
    };
    const handleColourChange = (event) => {
        const newValue = Number(event.target.value)
        setColourChange(newValue)
    };
    const handleSmoothChange = (event) => {
        if (event.target.value === "true") {
            setSmooth(true)
        } else if (event.target.value === "false") {
            setSmooth(false)
        }
    }
    const handleStartButton = (event) => {
        if (run != true) {
            setRun(true)
        } else if (run != "restart") {
            setRun("restart")
        }
    }
    const handleStopButton = (event) => {
        setRun(false)
    }
    const handlePresetChange = (event) => {
        setPreset(event.target.value)
        if (event.target.value === "classic") {
            setTotalDots(15000)
            setBrushStrokeLength(200)
            setDiameter(30)
            setOpacity(85)
            setDirectionBeforeChange(1)
            setSpeed(15)
            setColourChange(1)
            setSmooth(true)
        }
        else if (event.target.value === "droplets") {
            setTotalDots(3000)
            setBrushStrokeLength(1)
            setDiameter(20)
            setOpacity(85)
            setDirectionBeforeChange(1)
            setSpeed(5)
            setColourChange(0.5)
            setSmooth(false)
        }
        else if (event.target.value === "rainbow") {
            setTotalDots(100000)
            setBrushStrokeLength(100000)
            setDiameter(30)
            setOpacity(70)
            setDirectionBeforeChange(3)
            setSpeed(50)
            setColourChange(5)
            setSmooth(true)
        }
        else if (event.target.value === "ghost") {
            setTotalDots(10000)
            setBrushStrokeLength(1000)
            setDiameter(20)
            setOpacity(7)
            setDirectionBeforeChange(6)
            setSpeed(60)
            setColourChange(1)
            setSmooth(true)
        }
        else if (event.target.value === "meteor") {
            setTotalDots(3500)
            setBrushStrokeLength(100)
            setDiameter(80)
            setOpacity(85)
            setDirectionBeforeChange(100)
            setSpeed(0.1)
            setColourChange(0.6)
            setSmooth(false)
        }
        else if (event.target.value === "smoke") {
            setTotalDots(10000)
            setBrushStrokeLength(5)
            setDiameter(200)
            setOpacity(1)
            setDirectionBeforeChange(3)
            setSpeed(3)
            setColourChange(2)
            setSmooth(false)
        }
        else if (event.target.value === "squiggle") {
            setTotalDots(75000)
            setBrushStrokeLength(75)
            setDiameter(15)
            setOpacity(75)
            setDirectionBeforeChange(1)
            setSpeed(7)
            setColourChange(0.5)
            setSmooth(false)
        }
        else if (event.target.value === "tartan") {
            setTotalDots(2000)
            setBrushStrokeLength(2000)
            setDiameter(30)
            setOpacity(100)
            setDirectionBeforeChange(100)
            setSpeed(5)
            setColourChange(2)
            setSmooth(false)
        }
        else if (event.target.value === "tiny") {
            setTotalDots(30000)
            setBrushStrokeLength(30000)
            setDiameter(2)
            setOpacity(85)
            setDirectionBeforeChange(3)
            setSpeed(1)
            setSmooth(true)
        }
        else if (event.target.value === "undercoat") {
            setTotalDots(1000)
            setBrushStrokeLength(50)
            setDiameter(150)
            setOpacity(35)
            setDirectionBeforeChange(2)
            setSpeed(0.1)
            setColourChange(0)
            setSmooth(false)
        }
        else if (event.target.value === "wallpaper") {
            setTotalDots(5000)
            setBrushStrokeLength(2)
            setDiameter(100)
            setOpacity(100)
            setDirectionBeforeChange(2)
            setSpeed(2)
            setColourChange(4)
            setSmooth(false)
        }
    }

    return (
        <form>
            <label>Total # of Dots:
                <input onChange={handleTotalDotChange} min={1000} value={totalDots} type='number'></input>
            </label>
            <label>Brush Stroke Length:
                <input onChange={handleBrushStrokeLengthChange} value={brushStrokeLength} type='number'></input>
            </label>
            <label>Change Direction:
                <input onChange={handleDirectionBeforeChange} min={1} value={directionBeforeChange} type='number'></input>
            </label>
            <label>Dot diameter:
                <input onChange={handleDiameterChange} value={diameter} min={1} max={200} type='range'></input>
            </label>
            <label>Opacity (%):
                <input onChange={handleOpacityChange} min={0} max={100} value={opacity} type='range'></input>
            </label>
            <label>Rate of colour change:
                <input onChange={handleColourChange} min={0.1} max={5} value={colourChange} type='range' step={0.1}></input>
            </label>
            <label>Interval between dot generation:
                <input onChange={handleSpeedChange} min={0.1} max={100} value={speed} type='range' step={0.1}></input>
            </label>
            <fieldset onChange={handleSmoothChange}>
                <legend>Smooth direction change:</legend>
                <label>Yes:
                    <input value={true} checked={smooth === true} type='radio'></input>
                </label>
                <label>No:
                    <input value={false} checked={smooth === false} type='radio'></input>
                </label>
            </fieldset>
            <label>Preset:
                <select onChange={handlePresetChange} value={preset}>
                    <option value="classic">Classic</option>
                    <option value="rainbow">Crawling Rainbow</option>
                    <option value="droplets">Droplets</option>
                    <option value="ghost">Ghost Train</option>
                    <option value="meteor">Meteor Shower</option>
                    <option value="smoke">Smokescreen</option>
                    <option value="squiggle">Squiggles</option>
                    <option value="tartan">Tartan</option>
                    <option value="tiny">Tiny Snake</option>
                    <option value="undercoat">Undercoat</option>
                    <option value="wallpaper">70s Wallpaper</option>
                </select>
            </label>
            <input onClick={handleStartButton} id="start-button" type="button" value="stART"/>
            <input onClick={handleStopButton} id="stop-button" type="button" value="stop"/>
        </form>
    );
};

export default ParameterForm;