const fetch = require('node-fetch')

module.exports = async function selectUserData(){
    var user 
    var idUser
    var locationUser
    let response2 
    await fetch(`http://localhost:8000/getUserName`, {
        method: "GET"
    }).then(res => res.json()).then(json => response2 = json)

    if(response2.user != null){
        user = response2.user.nameUser
        idUser = response2.user.idUser
        locationUser = response2.user.location
        if (user.length > 22) user = user.slice(0, 22)
    }else{
        user = null
        idUser = null
        locationUser = null
    }


    return {user, idUser, locationUser}
}  

