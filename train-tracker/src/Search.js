function Search({searchChange, selectChange, searchVal, searchByVal}){
    return (
        <form>
                <input onChange={searchChange} type="text" value={searchVal}></input>
                <label>
                    Search by: 
                    <select onChange={selectChange} value={searchByVal}>
                        <option value="1">Train Number</option>
                        <option value="2">Line Name</option>
                    </select>
                </label>
              </form>
    );
    
}

export default Search;