const route = require('express').Router()
const passport = require('passport')

const ViewerBookController = require('./Controllers/ViewerBooksController')
const GetBookController = require('./Controllers/GetBookController')
const GetUserController = require('./Controllers/GetUserController')


route.get('/', ViewerBookController.dataFromHomePage)
route.get('/book/:idBook', ViewerBookController.bookInformation)

route.get('/searchBook', GetBookController.bookSearchResult)
route.get('/getGroupBook/:id', GetBookController.listBookGroup)

route.get('/perfil/:id', forwardAuthenticated, GetUserController.dataUser)
route.get('/confirm/:method/:idBook', forwardAuthenticated, GetUserController.registerBookOnHistoric)

route.get('/login', (req, res)=>res.render("login", {mistake: req.flash('error')}))
route.get('/register', (req, res)=>res.render("register", {mistake: req.flash("message")}))

route.post('/loginAuthentication',
    passport.authenticate("local", {
        successRedirect: '/', 
        failureRedirect: '/login',
        failureFlash: true
    })
)

route.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
});


route.get('/mistakeRegister/:routeOrigin', (req, res)=>{
    req.flash("message", req.query.mistake)
    res.redirect(`/${req.params.routeOrigin}`)
})


route.get('/mistakeGetBook/:idBook', (req, res)=>{
    req.flash("message", req.query.mistake)
    res.redirect(`/book/${req.params.idBook}`)
})

function forwardAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }{
        res.redirect('/login')
    }
}


module.exports = route