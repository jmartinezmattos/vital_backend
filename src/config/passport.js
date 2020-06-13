const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
//const connection
const cliente = require('../models/cliente')

const customFields = {//para nombrar los campos como quiero
    usernameField: 'usuario',
    passwordField: 'password'
}


const verifyCallback = (username, password, done) => { //hay que nombrarlos username y password si no definis custom fields
    
}

const strategy = new LocalStrategy()

passport.use()