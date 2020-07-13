const express = require('express')
const router = express.Router()
const Cliente = require('../models/cliente')
const Plan = require('../models/plan');
const Dia = require('../models/day');
const Session = require('../models/sesion')
const Ejercicio = require('../models/ejercicio');
const generatePassword = require('../lib/passwordUtils').generatePassword;
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;



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

//Getting plan asignado
router.get('/:username/plan_asignado', isAdmin, getClient,(req, res)=> {
    
    try{
    Plan.findById(req.params.plan_asignado, function(err,docs) {
        res.send(docs)    
    });
    }
    catch{
        res.send("No se encontro el plan asignado")
    }
})

//Post plan asignado
router.post('/:username/plan_asignado', isAdmin, getClient,(req, res)=> {
    
    try{
        req.cliente.plan_asignado = req.body.plan_asignado
        req.cliente.save()
        res.send(req.cliente.plan_asignado)
    }
    catch(err){
     res.send("error")
    }
})


//Modificar un usuario DESDE ACA SE PUEDE MODIFICAR EL ADMIN CUIDADO
router.put('/:username', isAdmin, getClient,(req, res)=> {
    var conditions = { username: req.params.username};

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

//Obtener los planes
router.get('/:username/planes', isAdmin, getClient,(req, res)=> {
    Plan.find({'_id': { $in: res.cliente.planes}}, function(err,docs) {
        res.send(docs)    
    });
    
})

//Agregar un plan a un cliente
router.post('/:username/planes', isAdmin, getClient,(req, res)=> {
    
    const newPlan = new Plan(req.body)
    newPlan.markModified("dias")
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

//Eliminar un plan de un cliente
router.delete('/:username/planes/:idplan', isAdmin, getClient,(req, res)=> {
    
    try{
        Plan.findByIdAndRemove(req.params.idplan, function(err,docs) {
            
            indice = req.cliente.planes.indexOf(req.params.idplan)
            req.cliente.planes.splice(indice)
            req.cliente.markModified('planes')
            req.cliente.save()
          
            res.send("Eliminado")
        });
    }catch(error){
        console.log(error)
        res.send("Error")
    }

})


//Obtener un dis de un plan de un cliente
router.get('/:username/planes/:idplan/dias', isAdmin, getClient,(req, res)=> {
    
    Plan.findById(req.params.idplan, function(err,docs) {
        Dia.find({'_id': { $in: docs.dias}}, function(err,docs2) {
            res.send(docs2)
         });
    });
    
})

//Agregar un dia a un plan
router.post('/:username/planes/:idplan/dias', isAdmin, getClient,(req, res)=> {
    
    const newDay = new Dia(req.body)
    newDay.save()

    Plan.findById(req.params.idplan, function(err,docs) {
        docs.dias.push(newDay)
        docs.markModified('dias')
        docs.save()
    });

    res.send(newDay)
})

//Agregar un ejercicio a un dia
router.post('/:username/planes/:idplan/dias/:iddia/ejercicios', isAdmin, getClient,(req, res)=> {
    
    const newEjercicio = new Ejercicio(req.body)
    newEjercicio.save()

    Plan.findById(req.params.idplan, function(err,docs) {
        docs.dias.filter(item => {return item._id == req.params.iddia;})[0].ejercicios.push(newEjercicio)
        docs.markModified('dias')
        docs.markModified('ejercicios')
        docs.save()
    });

    res.send(newEjercicio)
})

//Agregar una sesion a un ejercicio
router.post('/:username/planes/:idplan/dias/:iddia/ejercicios/:idejercicio/sesiones', isAdmin, getClient,(req, res)=> {
    
    const newSesion = new Session(req.body)

    Plan.findById(req.params.idplan, function(err,docs) {
        docs.dias.filter(item => {return item._id == req.params.iddia;})[0].ejercicios.filter(item => {return item._id == req.params.idejercicio;})[0].sesiones.push(newSesion)
        docs.markModified('dias')
        docs.markModified('ejercicios')
        docs.markModified('sesiones')
        docs.save()
    });

    res.send(newSesion)
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
        fecha_nacimiento: req.body.fecha_nacimiento,
        nro_contacto: req.body.nro_contacto,
        mail: req.body.mail,
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
        res.status(400)
        res.send("Error al guardar")
    }
})

//Updating one
router.patch('/', async (req, res)=> {//esta la hacemos despues, es con save()
   
})

//Deleting 
router.post('/:username/borrar', isAdmin, getClient, async (req, res)=> {
    try{
        await res.cliente.remove()
        res.json({message: `Cliente con el: ${req.params.username} eliminado`})
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
