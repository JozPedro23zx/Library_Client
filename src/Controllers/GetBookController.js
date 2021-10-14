const fetch = require('node-fetch')
const selectLibraryLocation = require('../Helpers/libraryLocation')

class GetBookController{
    async listBookGroup(req, res){
        let group = req.params.id
        let user = req.user || null
        let library = await selectLibraryLocation(user)
        try{
            let response = await fetch(`${process.env.API_HOST}/${library}/${group}/listBookForGroup`)
            let listBooks = await response.json()
    
            res.render("index", {page: 'booksList', list: listBooks.collectionList, user})
        }
        catch (error){
            console.log(error)
        }
    }

    async bookSearchResult(req, res){
        let search = req.query.search
        let user = req.user || null
        let library = await selectLibraryLocation(user)
        try{
            let response = await fetch(`${process.env.API_HOST}/${library}/listBook/:${search}`)
            let searchResult = await response.json()

            res.render("index", {page: 'booksList', list: searchResult.book, user})
        }
        catch (error){
            console.log(error)
        }
    }
}

module.exports = new GetBookController()