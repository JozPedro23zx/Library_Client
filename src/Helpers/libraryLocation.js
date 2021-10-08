const fetch = require('node-fetch')

module.exports = async function selectLibrary(locationUser){
    let response
    await fetch(`http://localhost:8000/getLibrary/:${locationUser}`, {
        method: "GET"
    }).then(res => res.json()).then(json => response = json)

    if(response.library){
        return response.library.id
    }else{
        return 1
    }
}