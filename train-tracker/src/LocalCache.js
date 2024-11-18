const LOCAL_CACHE="LOCAL"

const getLocalCache=()=>{

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

export const removeFromCache=(train)=>{
    const localCache=getLocalCache()
    let data=localCache.data
    delete data[train.routeName]
    try{
        localStorage.setItem(LOCAL_CACHE,JSON.stringify(localCache))
    }
    catch(e){
        alert("Unable to remove from Favorites");
    }
}

export const setToCache=(train)=>{

    const localCache=getLocalCache()
    let data=localCache.data

    const item={
        route:train.routeName,
    }

    data[train.routeName]=item

    try{
        localStorage.setItem(LOCAL_CACHE,JSON.stringify(localCache))
    }
    catch(e){
        alert("Unable to Save to Favorites");
    }

}

export const handleCache=(train)=>{}

// const confirmCheckIn = (username, password) =>{
//     const localUser = localStorage.getItem("USERNAME");
//     const localPass = localStorage.getItem("PASSWORD");
//     if(localUser===null||localPass===null){
//         alert("No current user detected for this device, please sign in or create a new account");
//     }
// }