const express = require('express')
const router = express.Router()
const Ejercicio = require('../models/ejercicio')

const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;

//Getting all
router.get('/', isAdmin, async (req, res)=> {
    try{
        const ejercicios = await Ejercicio.find()
        res.json(ejercicios)
    }catch{
        res.status(500).json({message: err.message})
    }
})

//Getting one
router.get('/:id', isAdmin, getEjericio,(req, res)=> {
    res.send(res.ejercicio)
})

//Creating one
router.post('/', isAuth, async (req, res)=> {
    
    const ejercicio = new Ejercicio(req.body)

    try{
        const newEjercicio = await ejercicio.save()
        res.status(201).json(newEjercicio)
    }catch{
        res.status(400).json({message: err.message})
    }
})

//Updating one
router.patch('/', async (req, res)=> {//esta la hacemos despues, es con save()
   
})


//Deleting all
router.delete('/:id', isAdmin , getEjericio, async (req, res)=> {
    try{
        await res.ejercicio.remove()
        res.json({message: `Ejercicio con id: ${req.params.id} eliminado`})
    }catch (err){
        res.status(500).json({message: err.message})
    }
})


async function getEjericio(req, res, next){ 
    let ejercicio

    try{
        ejercicio = await Ejercicio.findById(req.params.id)
        if(ejercicio == null){
            return res.status(404).json({message: `No se encuentra el ejercicio con id ${req.params.id}`})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.ejercicio=ejercicio //IMPORTANTE ESTO SE USA DESPUES
    next()
}


module.exports = router