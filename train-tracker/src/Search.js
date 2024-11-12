import './styles/Search.css';

function Search({
    number = "", setNumber = function(){},
    route = "", setRoute = function(){}, routes = <option value={""}>{}</option>,
    station = "", setStation = function(){}, stations = <option value={""}>{}</option>,
    upcoming = false, setUpcoming = function(){},
    searchFun = function(){}, clearFun = function (){},
    fromStation = "", setFromStation = function(){},
    toStation = "", setToStation = function(){},
    saveButton = function(){}
}){
    return (
        <form className='form'>
                <div className='top-label'>
                    Search options: 
                </div>
                <span className="select-label">
                        Train Number:
                        <input value={number} onChange={setNumber} type="number" placeholder="Enter Train Number"></input>
                    </span>
                <span className="select-label">
                        Route:
                        <select value={route} onChange={setRoute} children={routes}></select>
                    </span>
                <span className="select-label">By station: </span>
                    <select value={station} onChange={setStation} children={stations}></select>
                    <span className="select-label">
                        Upcoming trains only: 
                        <input checked={upcoming} onChange={setUpcoming} type="checkbox" ></input>
                    </span>
                
                <span>
                    <button type="button" onClick={searchFun}>Search</button>
                    <button type="button" onClick={clearFun}>Clear</button>
                    <button type="button" onClick={saveButton}>Save Search</button>
                </span>
                

                <label className="optional-criteria-label">
                    Optional criteria:
                    <span className="select-label">
                        From:
                        <select value={fromStation} onChange={setFromStation} children={stations}></select>
                    </span>
                    <span className="select-label">
                        To:
                        <select value={toStation} onChange={setToStation} children={stations}></select>
                    </span>
                </label>
              </form>
    );
    
}

export default Search;