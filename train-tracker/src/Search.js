import './styles/Search.css';

function Search({searchChange, criteriaChange, searchVal, searchByVal, startVal, endVal, startChange, endChange, stations, station, stationChange,
    upcomingOnlyValue, upcomingOnlyChange, saveButton
}){
    return (
        <form className='form'>
                <div className='top-label'>
                    Search by: 
                </div>
                <select onChange={criteriaChange} value={searchByVal}>
                        <option value="1">Train Number</option>
                        <option value="2">Line Name</option>
                    </select>
                <input onChange={searchChange} type="text" value={searchVal}></input>
                <label className="optional-criteria-label">
                    Optional criteria:
                    <span className="select-label">
                        From:
                        <select value={startVal} onChange={startChange} children={stations}>
                        </select>
                    </span>
                    <span className="select-label">
                        To:
                        <select value={endVal} onChange={endChange} children={stations}>
                        </select>
                    </span>
                </label>
                <div className='top-label'>
                    Or search by station:
                    <span className="select-label">Trains passing through: </span>
                    <select value={station} onChange={stationChange} children={stations}>
                    </select>
                    <span className="select-label">
                        Upcoming trains only: 
                        <input onChange={upcomingOnlyChange} type="checkbox" checked={upcomingOnlyValue}></input>
                    </span>
                </div>
                <button className='saveForLater' onClick={saveButton}>Save Train</button>
              </form>
    );
    
}

export default Search;