const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SesionSchema = new Schema({

    nombre: String,
    series: Number,
    intensidad: String,
    tiempo: String,
    repeticiones: Number

})

module.exports = mongoose.model('sesiones',SesionSchema)