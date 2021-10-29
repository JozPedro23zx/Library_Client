const fetch = require('node-fetch')

module.exports = async function selectLibrary(locationUser){
    let response
    await fetch(`${process.env.API_HOST}/getLibrary/:${locationUser.location}`, {
        method: "GET"
    }).then(res => res.json()).then(json => response = json)

    if(response.library){
        return response.library.id
    }else{
        return 1
    }
}