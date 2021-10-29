const fetch = require('node-fetch')

module.exports = async function selectLibrary(locationUser){
    if (locationUser){
        let response = await fetch(`${process.env.API_HOST}/getLibrary/:${locationUser.location}`)
        let libraryId = await response.json()
        
        return libraryId.library.id
    }
    return 1
}