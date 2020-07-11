const express = require('express')
const router = express.Router()
const TiposEjercicio = require('../models/tiposEjercicio')

const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;


//Getting all
router.get('/', isAuth,async (req, res)=> {
    try{
        const rutinas = await TiposEjercicio.find()
        res.json(rutinas)
    }catch{
        res.status(500).json({message: err.message})
    }
})

//Getting one
router.get('/:id', isAuth, getTipoEjercicio,(req, res)=> {
    res.send(res.tipo)
})

//Creating one
router.post('/', isAdmin, async (req, res)=> {
    
    const tipo = new TiposEjercicio(req.body)

    console.log(tipo)   

    try{
        const newTipo= await tipo.save()
        res.status(201).json(newTipo)
    }catch{
        res.status(400).json({message: err.message})
    }
})

//Updating one
router.patch('/', async (req, res)=> {//esta la hacemos despues, es con save()
   
})

//Deleting one
router.delete('/:id', isAdmin, getTipoEjercicio, async (req, res)=> {
    try{
        await res.tipo.remove()
        res.json({message: `Tipo con id: ${req.params.id} eliminado`})
    }catch (err){
        res.status(500).json({message: err.message})
    }
})



async function getTipoEjercicio(req, res, next){
    let tipo

    try{
        tipo = await TiposEjercicio.findById(req.params.id)
        if(rutina == null){
            return res.status(404).json({message: `No se encuentra el tipo de ejercicio con id ${req.params.id}`})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.tipo=tipo //IMPORTANTE ESTO SE USA DESPUES
    next()
}




module.exports = router