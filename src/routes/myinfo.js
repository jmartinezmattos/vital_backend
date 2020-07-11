const express = require('express')
const router = express.Router()
const Cliente = require('../models/cliente')
const Plan = require('../models/plan');
const Dia = require('../models/day');
const Session = require('../models/sesion')
const Ejercicio = require('../models/ejercicio');
const plan = require('../models/plan');
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
    
    Plan.findById(req.params.idplan, function (err, docs) {
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
    req.user.planes.push(id);
    req.user.save();
    res.send(newPlan)
})

//Agregar un dia a un plan
router.post('/planes/:idplan/dias', isAuth, async (req, res)=> {

    if(req.user.planes.includes(req.params.idplan)){
        const newDay = new Dia(req.body)
        try{
            plan = await Plan.findById(req.params.idplan)
            plan.dias.push(newDay)
            plan.markModified('dias')
            newDay.save()
            plan.save()

        }catch{
            res.send(`Error`)
        }
    }
    else{
        res.send("El usuario no contiene ese plan")
    }

})

//Agregar un ejercicio a un dia
router.post('/planes/:idplan/dias/:iddia/ejercicios', isAuth, async (req, res)=> {

    if(req.user.planes.includes(req.params.idplan)){
        
        const newEjercicio = new Ejercicio(req.body)
        try{
            plan = await Plan.findById(req.params.idplan)
            (plan.dias.filter(item => {return item._id == req.params.iddia;})[0]).ejercicios.push(newEjercicio)//Encuentro el dia y le meto el ejercicio nuevo
            plan.markModified('dias')
            plan.markModified('ejercicios')
            plan.save()
        }
        catch{
            res.send("Error")
        }
        
    }
    else{
        res.send("El usuario no contiene ese plan")
    }
})


//Agregar una sesion a un ejercicio
router.post('/planes/:idplan/dias/:iddia/ejercicios/:idejercicio/sesiones', isAuth, async (req, res)=> {

    if(req.user.planes.includes(req.params.idplan)){
        
        const newSesion = new Session(req.body)
        try{
            plan = await Plan.findById(req.params.idplan)
            plan.dias.filter(item => {return item._id == req.params.iddia;})[0].ejercicios.filter(item => {return item._id == req.params.idejercicio})[0].sesiones.push(newSesion)
            plan.markModified('dias')
            plan.markModified('ejercicios')
            plan.markModified('sesiones')
            plan.save()
        }
        catch{
            res.send("Error")
        }
        
    }
    else{
        res.send("El usuario no contiene ese plan")
    }
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

//Deleting a plan
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

//Cambiar pasword
router.post('/changepassword', isAuth, async (req, res)=> {
    
    const saltHash = generatePassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    req.user.salt = salt;
    req.user.hash = hash;

    req.user.save()
    res.send("Contra cambiada")
})

module.exports = router