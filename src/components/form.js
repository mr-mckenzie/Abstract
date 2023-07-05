import { useState } from "react"


const FormContainer = ({geoList, setGeoList, setGeoObj,runForecast, setSavedSearchList}) => {

    const rightHereRightNow = new Date().toISOString().slice(0, 10)

    const [search, setSearch] = useState({
        departureString: "",
        departureDate: "",
        departureTime: "",
        arrivalString: "",
        arrivalDate: "",
        arrivalTime: ""
    })

    const [saveSearchChecked, setSaveSearchChecked] = useState(false)

    const [departureGeoList, setDepartureGeoList] = useState("")
    const [arrivalGeoList, setArrivalGeoList] = useState("")

    const [selectedDepartureLocation, setSelectedDepartureLocation] = useState({
        departureLatitude: "",
        departureLongitude: "",
    })
    console.log(selectedDepartureLocation)
    const [selectedArrivalLocation, setSelectedArrivalLocation] = useState({
        arrivalLatitude: "",
        arrivalLongitude: "",
    })
    
 
    
    const mapFunction = (inputGeoList) => {
    let resultOfMap
        if (inputGeoList && inputGeoList.length > 0) {
            resultOfMap = inputGeoList.map( geoLocation => {
                const opt = `${geoLocation.name} - ${geoLocation.country} ${ (geoLocation.admin1 ? "- "  + geoLocation.admin1 :false || geoLocation.admin2 ? "- "  + geoLocation.admin2 :false)  || " "}` // consider adding a helper function, as same logic to the left can be needed for edge case when "country" is undefined nice api :)
                return <option key={geoLocation.id} value={geoLocation.id} > {opt} </option> 
        })}

    return resultOfMap}
    // onClick={()=>handleClick(geoLocation)}

    // let parsedDepartureGeoList;
    // let parsedArrivalGeoList;
    const parsedDepartureGeoList = mapFunction(departureGeoList)
    const parsedArrivalGeoList = mapFunction(arrivalGeoList)

    const onChangeSelect = (event) => {

        const id = event.target.value
        
        if (event.target.name === "departure-select") {
            const myLocation = departureGeoList.find((loc)=> loc.id == id)
            console.log({myLocation})
            setSelectedDepartureLocation({
                departureName: myLocation.name, 
                departureLatitude: myLocation.latitude,
                departureLongitude: myLocation.longitude
                
            })

        }
        if (event.target.name === "arrival-select") {
            const myLocation = arrivalGeoList.find((loc)=> loc.id == id)
            console.log({myLocation})
            setSelectedArrivalLocation({
                arrivalName: myLocation.name,
                arrivalLatitude: myLocation.latitude,
                arrivalLongitude: myLocation.longitude
            })
        }

    }
    
    const onChange = (event) => {
        const newSearch = Object.assign({}, search)
        newSearch[event.target.name] = event.target.value

        if(event.target.name === "save") {
            setSaveSearchChecked(!saveSearchChecked)
        }


        console.log("dep select: ",selectedDepartureLocation)
        console.log("arr select: ",selectedArrivalLocation)

        if (event.target.name === "departureString" && event.target.value.length >= 2) {
            setDepartureGeoList([])
        }

        if (event.target.name === "arrivalString" && event.target.value.length >= 2) {
            setArrivalGeoList([])
        }

        if (event.target.name === "departureString" && event.target.value.length > 2) {
            const newGeoList = ExternalServices.getGeoList(event.target.value)
            newGeoList.then(resultofGetGeoList => setDepartureGeoList(resultofGetGeoList))
            newSearch["departureLatitude"] = event.target.latitude
            newSearch["departureLongitude"] = event.target.longitude
        }
        if (event.target.name === "arrivalString" && event.target.value.length > 2) {
            const newGeoList = ExternalServices.getGeoList(event.target.value)
            newGeoList.then(resultofGetGeoList => setArrivalGeoList(resultofGetGeoList))
            newSearch["arrivalLatitude"] = event.target.latitude
            newSearch["arrivalLongitude"] = event.target.longitude
        }
        setSearch(newSearch)
    }




    const handleSubmit = (event) => {
        event.preventDefault()

        const newGeoObj = {
            departureName: selectedDepartureLocation.departureName,
            departureDate: search.departureDate,
            departureTime: search.departureTime,
            departureLongitude: selectedDepartureLocation.departureLongitude,
            departureLatitude: selectedDepartureLocation.departureLatitude,
            arrivalName: selectedArrivalLocation.arrivalName ? selectedArrivalLocation.arrivalName : "",
            arrivalDate: search.arrivalDate,
            arrivalTime: search.arrivalTime,
            arrivalLatitude: selectedArrivalLocation.arrivalLatitude,
            arrivalLongitude: selectedArrivalLocation.arrivalLongitude
        }
        setGeoObj(newGeoObj)

        if (saveSearchChecked === true) {
            postFlight(newGeoObj)
            .then( () => {
                
                getFlights().then((returnedFlights) => {
                setSavedSearchList(returnedFlights)})

            })
        }

        setSearch({
            departureString: "",
            departureDate: "",
            departureTime: "",
            arrivalString: "",
            arrivalDate: "",
            arrivalTime: ""
        })

        setSaveSearchChecked(false)

        setDepartureGeoList("")
        setArrivalGeoList("")
        setSelectedDepartureLocation({
            departureLatitude: "",
            departureLongitude: "",
        })

        setSelectedArrivalLocation({
            arrivalLatitude: "",
            arrivalLongitude: "",
        })

        runForecast(newGeoObj)
    }
    
    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div className="inform-container">
            <div className="departure-container">
                <label className="form-label" htmlFor="departure-name">From:</label>
                <input className="form-input" list="departure_name" name="departureString" id="departure-name" value={search.departureString} onChange={onChange} placeholder="type here" required />
                {parsedDepartureGeoList?                 
                <select id="departure-select" className="search-select" name="departure-select" onChange={onChangeSelect} required >
                    <option> Please select </option>
                    {parsedDepartureGeoList}
                </select>
                :
                <select className="search-select"><option>Nothing Found</option></select>}
                <label className="form-label" htmlFor="departure-date">Date:</label>
                <input className="form-input" type="date" id="departure-date" name="departureDate" value={search.departureDate} onChange={onChange} min={rightHereRightNow} required />
                <label className="form-label" htmlFor="departure-time">Time:</label>
                <input className="form-input" type="time" id="departure-time" name="departureTime" value={search.departureTime} onChange={onChange}  required />
            </div>
            <div className="arrival-container">
            <label className="form-label" htmlFor="arrival-name">To:</label>
                <input className="form-input" list="arrival_name"id="arrival-name" name="arrivalString" value={search.arrivalString} onChange={onChange} placeholder="type here" required />
                {parsedArrivalGeoList?                 
                <select id="arrival-select" className="search-select" name="arrival-select" onChange={onChangeSelect} required >
                    <option> Please select </option>
                    {parsedArrivalGeoList}
                </select>
                :
                <select className="search-select"><option>Nothing Found</option></select>}
                <label className="form-label" htmlFor="arrival-date">Date:</label>
                <input className="form-input" type="date" id="arrival-date" name="arrivalDate" value={search.arrivalDate} onChange={onChange} min={ search.departureDate || rightHereRightNow} required />
                <label className="form-label" htmlFor="arrival-time">Time:</label>
                <input className="form-input" type="time" id="arrival-time" name="arrivalTime" value={search.arrivalTime} onChange={onChange} required />
            </div>
            </div>
            <div className="submit-save-container">
            <div className="submit-container">
                <input className="form-button" type="submit" value="Aerosure?"/>
            </div>
            <div className="form-save">
                <label htmlFor="save-search">Save</label>
                <input id="save-search" name="save" type="checkbox" value={saveSearchChecked} checked={saveSearchChecked} onChange={onChange}></input>
            </div>

            </div>
        </form>
    )
}




export default FormContainer

const ArtSearch = ({getArt, setPage, page, setQuery, setCategory, query, category}) => {

    const handleSelectChange = (event) => {
        setCategory((event.target.value).toLowerCase())
    }

    const handleQueryChange = (event) => {
        setQuery((event.target.value).toLowerCase())
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (page !== 1){
            setPage(1)
        }
        if (query && category) {
            getArt(query, category, page)
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="category">
                    Choose a category:
                    <select id ="category" onChange={handleSelectChange} required>
                        <option value="q">Any</option>
                        <option value="query[term][artist_title]">Artist</option>
                        <option value="query[term][subject_titles]">Subject</option>
                        <option value="query[term][title]">Title</option>
                        <option value="query[term][style_titles]">Style</option>
                        <option value="query[term][theme_titles]">Theme</option>
                    </select>
                </label>
                <label>Enter your search query:
                    <input id="search" type="text" value={query} onChange={handleQueryChange} required/>
                </label>
                <input type="submit" value="Search" />
            </form>
        </>
    );

};

export default ArtSearch;