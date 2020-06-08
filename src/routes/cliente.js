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
router.get('/:id', (req, res)=> {
    
})

//Creating one
router.post('/', async (req, res)=> {
    
    /*
    const cliente = new Cliente({
        nombre: req.body.nombre
    })
    */

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
router.patch('/', (req, res)=> {
    
})

//Deleting all
router.delete('/:id', (req, res)=> {
    
})

module.exports = router
