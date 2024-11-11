import './styles/Search.css';

function Search({searchChange, criteriaChange, searchVal, searchByVal, startVal, endVal, startChange, endChange, stations, station, stationChange,
    upcomingOnlyValue, upcomingOnlyChange, update, updateChange
}){
    return (
        <form className='form'>
                <div className='top-label'>
                    Search options: 
                </div>
                <span className="select-label">
                        Route:
                        <select value={startVal} onChange={startChange} children={stations}>
                        </select>
                    </span>
                <span className="select-label">Train Number: </span>
                <span className="select-label">
                        <input onChange={searchChange} type="text" placeholder={searchVal}>
                        </input>
                    </span>
                <span className="select-label">By station: </span>
                    <select value={station} onChange={stationChange} children={stations}>
                    </select>
                    <span className="select-label">
                        Upcoming trains only: 
                        <input onChange={upcomingOnlyChange} type="checkbox" checked={upcomingOnlyValue}></input>
                    </span>
                <button type="button" onClick={updateChange}>Search</button>
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
              </form>
    );
    
}

export default Search;