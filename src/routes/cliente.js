const express = require('express')
const router = express.Router()
const Cliente = require('../models/cliente')
const generatePassword = require('../lib/passwordUtils').generatePassword;
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;

//Getting user info
router.get('/myInfo', isAuth,async (req, res) => {
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

//Creating one
router.post('/', async (req, res)=> {
    
    const saltHash = generatePassword(req.body.password);

     const salt = saltHash.salt;
     const hash = saltHash.hash;

     var admin = false

     if(req.body.admin === "bananas_locas"){ // METODO PARA CREAR ADMIN
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
