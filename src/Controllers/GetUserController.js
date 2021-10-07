const fetch = require('node-fetch')


class GetUserController{
    async dataUser(req, res){
        let user = req.user || null
        let id = req.params.id
        try{
            let response = await fetch(`http://localhost:8000/getPerfil/${id}`)
            let userData = await response.json()

            let response2 = await fetch(`http://localhost:8000/getHistoricBook/${id}`)
            let history = await response2.json()

            let response3 = await fetch(`http://localhost:8000/getAllLibraries`)
            let libraries = await response3.json()
            
            var fullName = userData.user.name
            var age = userData.user.age
            var location = userData.user.location
            var email = userData.user.email

            let index = email.indexOf('@')
            email = email.substring(0, 1) + "*******" + email.substring(index)

            index = libraries.indexOf(location)
            libraries.splice(index, 1)

            var books
            var book
            history.allBooks ? books = history.allBooks : books = null
            history.oneBook ? book = history.oneBook : book = null

            books = books.slice().sort((a, b) => b.createdAt > a.createdAt ? 1 : -1)

            res.render("index", {page: 'perfil', fullName, user, age, location, email, id, libraries, booksList: books, atualBook: book, message: req.query.q})
        }catch(error){
            console.log(error)
        }
    }

    async registerBookOnHistoric(req, res){
        let method = req.params.method
        let idBook = req.params.idBook
        let idUser = req.user.id
        
        res.render("lent", {page: "lent", idBook, idUser, method})
    }
}

module.exports = new GetUserController()