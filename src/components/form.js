import { useState } from "react";

const ParameterForm = ({totalDots, setTotalDots, canvasHeight, setCanvasHeight, canvasWidth, setCanvasWidth, brushStrokeLength, setBrushStrokeLength, diameter, setDiameter, directionBeforeChange, setDirectionBeforeChange, opacity, setOpacity, speed, setSpeed, run, setRun}) => {

    const [preset, setPreset] = useState("default")

    const handleTotalDotChange = (event) => {
        setTotalDots(event.target.value)
    };
    const handleCanvasHeightChange = (event) => {
        setCanvasHeight(event.target.value)
    };
    const handleCanvasWidthChange = (event) => {
        setCanvasWidth(event.target.value)
    };
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
    const handlePresetChange = (event) => {
        event.preventDefault();
        console.log(event.target.value)
        setPreset(event.target.value)
        if(event.target.value === "classic") {
            setTotalDots(15000)
            setBrushStrokeLength(200)
            setDiameter(30)
            setOpacity(85)
            setDirectionBeforeChange(1)
            setSpeed(15)
        }
        else if(event.target.value === "rain") {
            setTotalDots(3000)
            setBrushStrokeLength(1)
            setDiameter(20)
            setOpacity(85)
            setDirectionBeforeChange(1)
            setSpeed(5)
        }
        else if(event.target.value === "tartan") {
            setTotalDots(2000)
            setBrushStrokeLength(2000)
            setDiameter(30)
            setOpacity(100)
            setDirectionBeforeChange(100)
            setSpeed(5)
        }
        else if(event.target.value === "telly") {
            setTotalDots(5000)
            setBrushStrokeLength(2)
            setDiameter(100)
            setOpacity(100)
            setDirectionBeforeChange(2)
            setSpeed(2)
        }
        else if(event.target.value === "tiny") {
            setTotalDots(30000)
            setBrushStrokeLength(30000)
            setDiameter(2)
            setOpacity(85)
            setDirectionBeforeChange(2)
            setSpeed(1)
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
                <label>Canvas Height (pixels):
                    <input onChange={handleCanvasHeightChange} min={100} max={700} value={canvasHeight} type='number'></input>
                </label>
                <label>Canvas Width (pixels):
                    <input onChange={handleCanvasWidthChange} min={100} max={1450} value={canvasWidth} type='number'></input>
                </label>
                <label>Speed of dot generation (ms):
                    <input onChange={handleSpeedChange} min={0.1} max={1000} value={speed} type='number' step={0.1}></input>
                </label>
                <label>Presets:
                    <select onChange={handlePresetChange} value={preset}>
                        <option value="classic">Classic</option>
                        <option value="rain">Raindrops</option>
                        <option value="tartan">Tartan</option>
                        <option value="telly">Terrestrial Telly</option>
                        <option value="tiny">Tiny Snake</option>
                    </select>
                </label>
                <input type="submit" value="ART!" />
            </form>
    );
};

export default ParameterForm;