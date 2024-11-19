import { getLocalCache } from "./LocalCache"

function Favorites({handleFavoriteClick}){

    const favoriteOptions = populateFavDrop()

    function populateFavDrop(){
        let favNames = []
        const cachedTrains = getLocalCache()
        Object.keys(cachedTrains.data).forEach(trainName => {
            favNames.push(trainName)
        });
        const mapping = favNames.map((element, index) => <option value={element} key={index}>{element}</option>)
        return mapping
    }

    function MakeFavoriteSelection({train}){

        const handleClick = () => {
            handleFavoriteClick(train);
        }

        return (
            <tr onClick={handleClick}>
                <td>{train}</td>
            </tr>
        );
    }

    return(
        <div className="train-list-container">
            <h1>Favorited Trains</h1>
                <table className="train-list">
                    <tbody>
                        {favoriteOptions.map(t =>
                            <MakeFavoriteSelection train={t} 
                            key={`${t}`}/>
                        )}
                    </tbody>
                </table>
            </div>
    );
}

export default Favorites