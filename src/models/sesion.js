const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SesionSchema = new Schema({

    nombre: String,
    series: Number,
    intensidad: String,
    tiempo: String

})

module.exports = mongoose.model('sesiones',SesionSchema)