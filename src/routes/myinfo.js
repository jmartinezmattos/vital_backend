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

//Obtener un plan del usuario
router.get('/planes/:idplan', isAuth, async (req, res) => {
    Plan.find({'_id': req.params.idplan}, function(err,docs) {
        
        if(docs){
            res.send(docs)
        }else{
            res.send("No se encontro el plan")
        } 
    });
})


//Modificar cosas del usuario
router.put('/', isAuth, async (req, res) => {
    
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


//Agregar un plan
router.post('/planes', isAuth, async (req, res)=> {
    const newPlan = new Plan(req.body)
    newPlan.save()
    id = newPlan.id
    user.planes.push(id);
    user.save();
    res.send(newPlan)
})

//Modificar un plan
router.put('/planes/:idplan', isAuth, async (req, res)=> {
    
    var conditions = { _id: req.params.idplan};

    admin = req.body.admin
    
    Cliente.update(conditions, req.body)
    .then(doc => {
        if(!doc){return res.status(404).end();}
        return res.status(200).json(doc)
    })
    
})

//Deleting 
router.delete('/planes/:idplan', isAuth, async (req, res)=> {

    if(req.user.planes.includes(req.params.idplan)){
        try{
            await Plan.findByIdAndRemove(req.params.idplan)
            res.json({message: `Plan con id: ${req.params.idplan} eliminado`})
        }catch (err){
            res.status(500).json({message: err.message})
        }
    }
    else{
        res.send(`Su usuario no contiene el plan con id: ${req.params.idplan}`)
    }
})


module.exports = router