const LocalStrategy = require('passport-local').Strategy
const fetch = require('node-fetch')

module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField: 'email'},
        async function(userEmail, password, done){
            let response = await fetch(`${process.env.API_HOST}/login/:${userEmail}/:${password}`)
            const user = await response.json()

            if(user.data == false){
                return done(null, false, {message: "Email e senha não correspondem"})
            }else{
                return done(null, user.data)
            }
        }
    ));

    passport.serializeUser(function(user, done){
        let userId = user.id
        done(null, userId)
      });
      
      passport.deserializeUser(async function(id, done){
        response = await fetch(`${process.env.API_HOST}/getPerfil/${id}`)
        data = await response.json()
        
        user = {id: data.user.id, name: data.user.name, location: data.user.location, isAdmin: data.user.isAdmin}
        return done(null, user)
    })
}