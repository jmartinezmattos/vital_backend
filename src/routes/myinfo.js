const express = require('express')
const router = express.Router()
const Cliente = require('../models/cliente')
const Plan = require('../models/plan');
const Dia = require('../models/day');
const Session = require('../models/sesion')
const Ejercicio = require('../models/ejercicio');
const generatePassword = require('../lib/passwordUtils').generatePassword;
const isAuth = require('./authMiddleware').isAuth;

//Getting user info
router.get('/', isAuth, async (req, res) => {
    res.send(req.user)
})


//Getting user planes
router.get('/planes', isAuth, async (req, res) => {
    Plan.find({'_id': { $in: req.user.planes}}, function(err,docs) {
        res.send(docs)    
    });
})

//Modificar cosas del usuario
router.post('/', isAuth, async (req, res) => {
    
    var conditions = { _id: user._id};

    admin = req.body.admin

    if(admin === true || admin == true || admin == "true"){
        console.log("Hacker loco")
        res.send("Aja vos me queres hackear loquillo")
    }else{
        Cliente.update(conditions, req.body)
        .then(doc => {
            if(!doc){return res.status(404).end();}
            return res.status(200).json(doc)
        })
    }


})


module.exports = router