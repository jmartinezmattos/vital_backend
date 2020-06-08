const express = require('express')
const router = express.Router()
const Ejercicio = require('../models/ejercicio')

//Getting all
router.get('/', async (req, res)=> {
    try{
        const ejercicios = await Ejercicio.find()
        res.json(ejercicios)
    }catch{
        res.status(500).json({message: err.message})
    }
})



module.exports = router