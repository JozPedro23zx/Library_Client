const LocalStrategy = require('passport-local').Strategy
const fetch = require('node-fetch')
var response

module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField: 'email'},
        async function(userEmail, password, done){
            await fetch(`http://localhost:8000/login/:${userEmail}/:${password}`, {
                method: "GET"
            }).then(res => res.json()).then(json => response = json)

            const user = response.userData

            if(user == false){
                return done(null, false, {message: "Email e senha não correspondem"})
            }else{
                return done(null, user)
            }
        }
    ));

    passport.serializeUser(function(user, done){
        let userId = user.id
        done(null, userId)
      });
      
      passport.deserializeUser(async function(id, done){
        response = await fetch(`http://localhost:8000/getPerfil/${id}`)
        data = await response.json()
        
        user = {id: data.user.id, name: data.user.name, location: data.user.location, isAdmin: data.user.isAdmin}
        return done(null, user)
    })
}