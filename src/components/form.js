const ParameterForm = ({totalDots, setTotalDots, canvasHeight, setCanvasHeight, canvasWidth, setCanvasWidth, brushStrokeLength, setBrushStrokeLength, diameter, setDiameter, directionBeforeChange, setDirectionBeforeChange, opacity, setOpacity, speed, setSpeed, run, setRun}) => {

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
    const handleSubmit = (event) => {
        event.preventDefault();
        let runAgain = [...run]
        setRun([runAgain[0] + 1]);
    }

    return (
        <div>
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
        </div>
    );
};

export default ParameterForm;