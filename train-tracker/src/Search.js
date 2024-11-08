import './styles/Search.css';

function Search({searchChange, criteriaChange, searchVal, searchByVal, startVal, endVal, startChange, endChange, stations}){
    return (
        <form className='form'>
                <label>
                    Search by: 
                    <select onChange={criteriaChange} value={searchByVal}>
                        <option value="1">Train Number</option>
                        <option value="2">Line Name</option>
                    </select>
                </label>
                <input onChange={searchChange} type="text" value={searchVal}></input>
                <label>
                    Optional criteria:
                    <label>
                        From:
                        <select value={startVal} onChange={startChange} children={stations}>
                        </select>
                    </label>
                    <label>
                        To:
                        <select value={endVal} onChange={endChange} children={stations}>
                        </select>
                    </label>
                </label>
              </form>
    );
    
}

export default Search;