const express = require('express')
const router = express.Router()
const Rutina = require('../models/rutina')


//Getting all
router.get('/', async (req, res)=> {
    try{
        const rutinas = await Rutina.find()
        res.json(rutinas)
    }catch{
        res.status(500).json({message: err.message})
    }
})

//Getting one
router.get('/:id', getRutina,(req, res)=> {
    res.send(res.rutina)
})

//Creating one
router.post('/', async (req, res)=> {
    
    const rutina = new Rutina(req.body)

    console.log(req.body.nombre)
    console.log(rutina)   

    try{
        const newClient = await rutina.save()
        res.status(201).json(newClient)
    }catch{
        res.status(400).json({message: err.message})
    }
})

//Updating one
router.patch('/', async (req, res)=> {//esta la hacemos despues, es con save()
   
})

//Deleting all
router.delete('/:id', getRutina, async (req, res)=> {
    try{
        await res.rutina.remove()
        res.json({message: `Rutina con id: ${req.params.id} eliminado`})
    }catch (err){
        res.status(500).json({message: err.message})
    }
})


async function getRutina(req, res, next){
    let rutina

    try{
        rutina = await Rutina.findById(req.params.id)
        if(rutina == null){
            return res.status(404).json({message: `No se encuentra la rutina con id ${req.params.id}`})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.rutina=rutina //IMPORTANTE ESTO SE USA DESPUES
    next()
}


module.exports = router