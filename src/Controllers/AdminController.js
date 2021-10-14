const fetch = require('node-fetch')
var response
var saga

class AdminController{
    async addBook(req, res){
        try{
            await fetch(`${process.env.API_HOST}/popularBooks`, {
                method: "GET"
            }).then(res => res.json()).then(json => saga = json)

            let collection = saga.collection

            res.render('adm', {page: 'bookCreate', collection})

        }catch(error){
            console.log(error)
        }
    }
}

module.exports = new AdminController()