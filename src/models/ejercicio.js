//defino la  'tabla' el esquema para la bdd

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EjercicioSchema = new Schema({

    nombre: String,
    series: Number,
    repeticiones: Number,
    intensidad: String,
    tiempo: String,
    sesiones: [mongoose.Schema.Types.ObjectId]

})



module.exports = mongoose.model('ejercicios',EjercicioSchema)