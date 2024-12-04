const LOCAL_CACHE="LOCAL"


/**
 * Function allowing the retrieval of the local cache values associated with this project.
 * @function
 * @returns {object[]} The list of the key value pairs found in the local cache.
 * @exports getLocalCache
 */
export const getLocalCache=()=>{

    let localCache={
        data:{},
    }  

    try {
        const data=localStorage.getItem(LOCAL_CACHE)

        if(data){
            localCache=JSON.parse(data)
        }
    }
    catch(e){
        console.error(e.message)
    }

    return localCache
}

/**
 * Function allowing the removal of a route name found in the local cache.
 * @function
 * @param {string} selectedRoute - A string containing a unique route name.
 * @returns {number} A value representing success or failure of the function 
 * @exports removeRouteFromCache
 */
export const removeRouteFromCache=(selectedRoute)=>{
    if (selectedRoute === ""){
        alert("No route selected");
        return 1;
    }
    const localCache=getLocalCache()
    let data=localCache.data
    delete data[selectedRoute]
    try{
        localStorage.setItem(LOCAL_CACHE,JSON.stringify(localCache))
    }
    catch(e){
        alert("Unable to remove from Favorites");
        return 1;
    }
    return 0;
}

/**
 * Function allowing the setting of a route name to the local cache on the device.
 * @function
 * @param {string} selectedRoute - A string containing a unique route name.
 * @returns {number} A value representing success or failure of the function.
 * @exports setRouteToCache
 */
export const setRouteToCache=(selectedRoute)=>{
    if (selectedRoute === ""){
        alert("No route selected");
        return 1;
    }

    const localCache=getLocalCache()
    let data=localCache.data

    const item={
        route:selectedRoute,
    }

    data[selectedRoute]=item

    try{
        localStorage.setItem(LOCAL_CACHE,JSON.stringify(localCache))
    }
    catch(e){
        alert("Unable to Save to Favorites");
        return 1;
    }
    return 0;

}

/**
 * Function facilitating the confirmation of whether a particular route is found in the local cache.
 * @function
 * @param {string} routeName - A string containing a unique route name.
 * @returns {boolean} The list of the key value pairs found in the local cache.
 * @exports isFavorited
 */
export const isFavorited=(routeName)=>{
    const localCache = getLocalCache();
    const data = localCache.data;
    if(routeName in data){
        return true;
    }
    return false;
}