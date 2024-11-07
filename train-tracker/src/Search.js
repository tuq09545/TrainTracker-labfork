import './styles/Search.css';

function Search({searchChange, selectChange, searchVal, searchByVal}){
    return (
        <form className='form'>
                <label>
                    Search by: 
                    <select onChange={selectChange} value={searchByVal}>
                        <option value="1">Train Number</option>
                        <option value="2">Line Name</option>
                    </select>
                </label>
                <input onChange={searchChange} type="text" value={searchVal}></input>
              </form>
    );
    
}

export default Search;