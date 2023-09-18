import { useState } from "react";

const ParameterForm = ({ totalDots, setTotalDots, canvasHeight, setCanvasHeight, canvasWidth, setCanvasWidth, brushStrokeLength, setBrushStrokeLength, diameter, setDiameter, directionBeforeChange, setDirectionBeforeChange, opacity, setOpacity, speed, setSpeed, colourChange, setColourChange, smooth, setSmooth, run, setRun }) => {

    const [preset, setPreset] = useState("default")

    const handleTotalDotChange = (event) => {
        const newValue = Number(event.target.value)
        setTotalDots(newValue)
    };
    const handleCanvasHeightChange = (event) => {
        setCanvasHeight(event.target.value)
    };
    const handleCanvasWidthChange = (event) => {
        setCanvasWidth(event.target.value)
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
    const handlePresetChange = (event) => {
        event.preventDefault();
        console.log(event.target.value)
        setPreset(event.target.value)
        if (event.target.value === "classic") {
            setTotalDots(15000)
            setBrushStrokeLength(200)
            setDiameter(30)
            setOpacity(85)
            setDirectionBeforeChange(1)
            setSpeed(15)
            setColourChange(0.2)
            setSmooth(true)
        }
        else if (event.target.value === "dabs") {
            setTotalDots(10000)
            setBrushStrokeLength(100)
            setDiameter(15)
            setOpacity(75)
            setDirectionBeforeChange(1)
            setSpeed(7)
            setColourChange(0.1)
            setSmooth(false)
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
            setOpacity(85)
            setDirectionBeforeChange(3)
            setSpeed(50)
            setColourChange(5)
            setSmooth(true)
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
    const handleSubmit = (event) => {
        event.preventDefault();
        let runAgain = [...run]
        setRun([runAgain[0] + 1]);
    }

    return (
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
            {/* <label>Canvas Height (pixels):
                    <input onChange={handleCanvasHeightChange} min={100} max={700} value={canvasHeight} type='number'></input>
                </label>
                <label>Canvas Width (pixels):
                    <input onChange={handleCanvasWidthChange} min={100} max={1450} value={canvasWidth} type='number'></input>
                </label> */}
            <label>Speed of colour change:
                <input onChange={handleColourChange} min={0.1} max={5} value={colourChange} type='number' step={0.1}></input>
            </label>
            <label>Speed of dot generation (ms):
                <input onChange={handleSpeedChange} min={0.1} max={1000} value={speed} type='number' step={0.1}></input>
            </label>
            <fieldset onChange={handleSmoothChange}>
                <legend>Smooth direction changes?</legend>
                <label>True:
                    <input value={true} checked={smooth === true} type='radio'></input>
                </label>
                <label>False:
                    <input value={false} checked={smooth === false} type='radio'></input>
                </label>
            </fieldset>
            <label>Presets:
                <select onChange={handlePresetChange} value={preset}>
                    <option value="classic">Classic</option>
                    <option value="rainbow">Crawling Rainbow</option>
                    <option value="dabs">Dabs of Colour</option>
                    <option value="droplets">Droplets</option>
                    <option value="smoke">Smokescreen</option>
                    <option value="tartan">Tartan</option>
                    <option value="tiny">Tiny Snake</option>
                    <option value="wallpaper">70's Wallpaper</option>
                </select>
            </label>
            <input type="submit" value="ART!" />
        </form>
    );
};

export default ParameterForm;