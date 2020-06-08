const express = require('express')
const router = express.Router()
const Cliente = require('../models/cliente')

//Getting all
router.get('/', async (req, res)=> {
    try{
        const clientes = await Cliente.find()
        res.json(clientes)
    }catch{
        res.status(500).json({message: err.message})
    }
})

//Getting one
router.get('/:id', getClient,(req, res)=> {
    res.send(res.cliente)
})

//Creating one
router.post('/', async (req, res)=> {
    
    const cliente = new Cliente(req.body)

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
router.delete('/:id', getClient, async (req, res)=> {
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
        cliente = await Cliente.findById(req.params.id)
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
