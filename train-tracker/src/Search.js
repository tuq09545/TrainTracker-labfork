import './styles/Search.css';

function Search({searchChange, criteriaChange, searchVal, searchByVal, startVal, endVal, startChange, endChange, stations}){
    return (
        <form className='form'>
                <div className='top-label'>
                    Search by: 
                    <select onChange={criteriaChange} value={searchByVal}>
                        <option value="1">Train Number</option>
                        <option value="2">Line Name</option>
                    </select>
                </div>
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
              </form>
    );
    
}

export default Search;