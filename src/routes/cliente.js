const express = require('express')
const router = express.Router()
const Cliente = require('../models/cliente')
const Plan = require('../models/plan');
const Dia = require('../models/day');
const Session = require('../models/sesion')
const Ejercicio = require('../models/ejercicio')
const generatePassword = require('../lib/passwordUtils').generatePassword;
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;

//Getting user info
router.get('/myInfo', isAuth, async (req, res) => {
    res.send(req.user)
})

//Getting all
router.get('/', isAdmin, async (req, res)=> {
    try{
        const clientes = await Cliente.find()
        res.json(clientes)
    }catch{
        res.status(500).json({message: err.message})
    }
})

//Getting one
router.get('/:username', isAdmin, getClient,(req, res)=> {
    res.send(res.cliente)
})

//Obtener los planes
router.get('/:username/planes', isAdmin, getClient,(req, res)=> {
    Plan.find({'_id': { $in: res.cliente.planes}}, function(err,docs) {
        res.send(docs)    
    });
    
})

//Agregar un plan a un cliente
router.post('/:username/planes', isAdmin, getClient,(req, res)=> {
    const newPlan = new Plan(req.body)
    newPlan.save()
    id = newPlan.id
    res.cliente.planes.push(id);
    res.cliente.save();
    res.send(newPlan)
})

//Obtener un plan de un cliente
router.get('/:username/planes/:idplan', isAdmin, getClient,(req, res)=> {
    
    Plan.findById(req.params.idplan, function(err,docs) {
        res.send(docs)
    });

})

//Obtener un plan de un cliente
router.get('/:username/planes/:idplan/dias', isAdmin, getClient,(req, res)=> {
    
    Plan.findById(req.params.idplan, function(err,docs) {
        Dia.find({'_id': { $in: docs.dias}}, function(err,docs2) {
            res.send(docs2)
         });
    });
    
})

/*Version vieja cuando poniamos el id
//Agregar un dia a un plan
router.post('/:username/planes/:idplan/dias', isAdmin, getClient,(req, res)=> {
    
    const newDay = new Dia(req.body)
    newDay.save()

    Plan.findById(req.params.idplan, function(err,docs) {
        docs.dias.push(newDay)
        docs.save()
    });

    res.send(newDay)
})
*/

//Agregar un dia a un plan
router.post('/:username/planes/:idplan/dias', isAdmin, getClient,(req, res)=> {
    
    const newDay = new Dia(req.body)
    newDay.save()

    Plan.findById(req.params.idplan, function(err,docs) {
        docs.dias.push(newDay)
        docs.save()
    });

    res.send(newDay)
})

//Agregar un ejercicio a un dia
router.post('/:username/planes/:idplan/dias/:iddia', isAdmin, getClient,(req, res)=> {
    
    const newEjercicio = new Ejercicio(req.body)
    newEjercicio.save()

    Plan.findById(req.params.idplan, function(err,docs) {
        docs.dias.filter(item => {return item._id == req.params.iddia;})[0].ejercicios.push(newEjercicio)
        docs.markModified('dias')
        docs.markModified('ejercicios')
        docs.save()
    });

    /*
    Dia.findById(req.params.iddia, function(err,docs) {
        if(docs == null){
            res.send(`No se encontro el dia con id ${req.params.iddia}`)
        }
        docs.ejercicios.push(newEjercicio)
        docs.save()
    });
    */

    res.send(newEjercicio)
})



//Creating one
router.post('/', async (req, res)=> {
    
    const saltHash = generatePassword(req.body.password);

     const salt = saltHash.salt;
     const hash = saltHash.hash;

     var admin = false

     if(req.body.admin === process.env.CREATE_ADMIN){ // METODO PARA CREAR ADMIN se pasa atributo y se verifica que sea igaul al valor de create admin
        admin = true;
     }

    const cliente = new Cliente({
        username: req.body.username,
        nombre: req.body.nombre,
        admin: admin,
        hash: hash,
        salt: salt
    })

    console.log(req.body.nombre)
    console.log(cliente)   

    try{
        const newClient = await cliente.save()
        res.status(201).json(newClient)
    }catch{
        res.status(400).json({message: err.message})
    }
})

//Updating one
router.patch('/', async (req, res)=> {//esta la hacemos despues, es con save()
   
})

//Deleting all
router.delete('/:username', isAdmin, getClient, async (req, res)=> {
    try{
        await res.cliente.remove()
        res.json({message: `Cliente con id: ${req.params.id} eliminado`})
    }catch (err){
        res.status(500).json({message: err.message})
    }
})


async function getClient(req, res, next){ //faltaria que el get sea segun la cedula
    let cliente

    try{
        //cliente = await Cliente.findOne({ "nombre": "joselito" }).exec(function (err, resad) {});
        cliente = await Cliente.findOne({ username: req.params.username }) //ojo aca no me estoy fijando errores
            //cliente = await Cliente.find({"cedula": req.params.id})//si uso esto cliente nunca es null entonces no entra en el error, por temas de eficiencia deberia usar findone pero no funca
        //cliente = await Cliente.findOne({"cedula": req.params.id})
        //cliente = await Cliente.findById(req.params.id)
        //console.log(cliente)
        if(cliente == null){
            return res.status(404).json({message: `No se encuentra el cliente con id ${req.params.id}`})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.cliente=cliente //IMPORTANTE ESTO SE USA DESPUES
    next()
}



module.exports = router
