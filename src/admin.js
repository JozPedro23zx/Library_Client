const AdminController = require('./Controllers/AdminController')
const admin = require('express').Router()
const fetch = require('node-fetch')

admin.get('/admin', adminVerification, (req, res) => res.render("adm", {page: "libraryCreate"}))
admin.get('/admin/registerBook', adminVerification, AdminController.addBook)
admin.get('/admin/registerGroup', adminVerification, (req, res) => res.render('adm', {page: "groupCreate"}))



async function adminVerification(req, res, next){
    if(req.user){
        let checkAdm = req.user.isAdmin
        if(checkAdm == true){
            return next()
        }
    }
    res.redirect('http://localhost:5000/')
}

module.exports = admin