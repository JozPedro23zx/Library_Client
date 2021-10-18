const fetch = require('node-fetch')
const selectLibraryLocation = require('../Helpers/libraryLocation')

class ViewerBooksController{
    
    async dataFromHomePage(req, res){
        let user = req.user || null
        let library = await selectLibraryLocation(user)
        console.log(library)
        try{
            let response = await fetch(`${process.env.API_HOST}/${library}/listBook`)
            let listBook = await response.json()

            let response2 = await fetch(`${process.env.API_HOST}/popularBooks`)
            let popularBooks = await response2.json()


            let sortedBooks = listBook.book.slice().sort((a, b) => b.newAdd > a.newAdd ? 1 : -1)
            sortedBooks.length = 5
            let sortedCollection = popularBooks.collection


            res.render("index", {page: 'home', bookInfo: sortedBooks, sortedCollection, user})
        }
        catch (error){
            console.log(error)
        }
    }


    async bookInformation(req, res){
        const idBook = req.params.idBook
        let user = req.user || null
        let library = await selectLibraryLocation(user)

        try{
            
            let response = await fetch(`${process.env.API_HOST}/${library}/getBook/${idBook}`)
            let bookData = await response.json()

            res.render("index", {page: 'bookPage', bookInfo: bookData.book, tagsBook: bookData.tags, bookList: bookData.recommendation, mistake: req.flash("message") ,user})
        }
        catch (error){
            console.log(error)
        }
    }
}

module.exports = new ViewerBooksController()