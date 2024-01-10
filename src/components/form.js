import { useState } from "react";

const ParameterForm = ({ totalDots, setTotalDots, brushStrokeLength, setBrushStrokeLength, diameter, setDiameter, directionBeforeChange, setDirectionBeforeChange, opacity, setOpacity, speed, setSpeed, colourChange, setColourChange, smooth, setSmooth, scroll, setScroll, run, setRun }) => {

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
    const handleScrollChange = (event) => {
        if (event.target.value === "true") {
            setScroll(true)
        } else if (event.target.value === "false") {
            setScroll(false)
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

    const updatePreset = (totalDots, brushStrokeLength, diameter, opacity, directionBeforeChange, speed, colourChange, smoothBoolean, scrollBoolean) => {
        setTotalDots(totalDots)
        setBrushStrokeLength(brushStrokeLength)
        setDiameter(diameter)
        setOpacity(opacity)
        setDirectionBeforeChange(directionBeforeChange)
        setSpeed(speed)
        setColourChange(colourChange)
        setSmooth(smoothBoolean)
        setScroll(scrollBoolean)
    }

    const handlePresetChange = (event) => {
        setPreset(event.target.value)
        if (event.target.value === "classic") {
            updatePreset(15000, 200, 30, 85, 1, 15, 1, true, true)
        }
        else if (event.target.value === "droplets") {
            updatePreset(7500, 1, 20, 85, 1, 5, 0.5, false, true)
        }
        else if (event.target.value === "rainbow") {
            updatePreset(100000, 100000, 30, 70, 3, 50, 5, true, false)
        }
        else if (event.target.value === "glyph") {
            updatePreset(10000, 500, 1, 100, 50, 5, 0.2, false, false)
        }
        else if (event.target.value === "meteor") {
            updatePreset(3500, 30, 20, 85, 0, 0.1, 0.6, false, true)
        }
        else if (event.target.value === "smoke") {
            updatePreset(10000, 5, 200, 1, 3, 3, 2, false, true)
        }
        else if (event.target.value === "squiggle") {
            updatePreset(75000, 75, 15, 75, 1, 7, 0.5, false, false)
        }
        else if (event.target.value === "tartan") {
            updatePreset(10000, 500, 20, 7, 0, 1, 1, false, false)
        }
        else if (event.target.value === "tiny") {
            updatePreset(30000, 30000, 2, 85, 3, 1, true, false)
        }
        else if (event.target.value === "undercoat") {
            updatePreset(1000, 50, 150, 35, 2, 0.1, 0, false, true)
        }
        else if (event.target.value === "wallpaper") {
            updatePreset(5000, 2, 100, 100, 2, 2, 4, false, true)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
                        <div id="button-box">
                <input onClick={handleStartButton} id="start-button" type="button" value="start" />
                <input onClick={handleStopButton} id="stop-button" type="button" value="stop" />
            </div>
            <h2>Basic settings</h2>
            <label>Mode:
                <select onChange={handlePresetChange} value={preset}>
                    <option value="classic">Classic</option>
                    <option value="rainbow">Crawling Rainbow</option>
                    <option value="droplets">Droplets</option>
                    <option value="glyph">Glyphs</option>
                    <option value="meteor">Meteor Shower</option>
                    <option value="smoke">Smokescreen</option>
                    <option value="squiggle">Squiggles</option>
                    <option value="tartan">Tartan</option>
                    <option value="tiny">Tiny Snake</option>
                    <option value="undercoat">Undercoat</option>
                    <option value="wallpaper">70s Wallpaper</option>
                </select>
            </label>
            <h2>Advanced settings</h2>
            <label>Total # of Dots:
                <input onChange={handleTotalDotChange} min={1000} value={totalDots} type='number'></input>
            </label>
            <label>Dots chained together:
                <input onChange={handleBrushStrokeLengthChange} value={brushStrokeLength} type='number'></input>
            </label>
            <label>Dots before direction change:
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
            <fieldset onChange={handleSmoothChange} tabIndex={0}>
                <legend>Smooth direction change:</legend>
                <label>Yes:
                    <input value={true} checked={smooth === true} type='radio'></input>
                </label>
                <label>No:
                    <input value={false} checked={smooth === false} type='radio'></input>
                </label>
            </fieldset>
            <fieldset onChange={handleScrollChange} tabIndex={0}>
                <legend>Edge Behaviour:</legend>
                <label>Scroll:
                    <input value={true} checked={scroll === true} type='radio'></input>
                </label>
                <label>Bounce:
                    <input value={false} checked={scroll === false} type='radio'></input>
                </label>
            </fieldset>
        </form>
    );
};

export default ParameterForm;