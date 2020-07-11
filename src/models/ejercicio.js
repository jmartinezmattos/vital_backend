//defino la  'tabla' el esquema para la bdd

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EjercicioSchema = new Schema({

    nombre: String,
    series: Number,
    repeticiones: Number,
    intensidad: String,
    tiempo: String,
    sesiones: []

})



module.exports = mongoose.model('ejercicios',EjercicioSchema)