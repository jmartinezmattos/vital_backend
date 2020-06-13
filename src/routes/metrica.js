const express = require('express')
const router = express.Router()
const Metrica = require('../models/metrica')

const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;

//Getting all
router.get('/', isAdmin, async (req, res)=> {
    try{
        const metricas = await Metrica.find()
        res.json(metricas)
    }catch{
        res.status(500).json({message: err.message})
    }
})

//Getting one
router.get('/:id', isAdmin, getMetrica,(req, res)=> {
    res.send(res.metrica)
})

//Creating one
router.post('/', isAdmin, async (req, res)=> {
    
    const metrica = new Metrica(req.body)

    console.log(req.body.nombre)
    console.log(metrica)   

    try{
        const newClient = await metrica.save()
        res.status(201).json(newClient)
    }catch{
        res.status(400).json({message: err.message})
    }
})

//Updating one
router.patch('/', async (req, res)=> {//esta la hacemos despues, es con save()
   
})

//Deleting all
router.delete('/:id', isAdmin, getMetrica, async (req, res)=> {
    try{
        await res.metrica.remove()
        res.json({message: `Metrica con id: ${req.params.id} eliminado`})
    }catch (err){
        res.status(500).json({message: err.message})
    }
})


async function getMetrica(req, res, next){ //faltaria que el get sea segun la cedula
    let metrica

    try{
        metrica = await Metrica.findById(req.params.id)
        if(metrica == null){
            return res.status(404).json({message: `No se encuentra la metrica con id ${req.params.id}`})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.metrica=metrica //IMPORTANTE ESTO SE USA DESPUES
    next()
}


module.exports = router