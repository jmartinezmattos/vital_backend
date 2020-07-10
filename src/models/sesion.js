const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SesionSchema = new Schema({

    nombre: String,
    dias: [mongoose.Schema.Types.ObjectId]

})

module.exports = mongoose.model('sesiones',SesionSchema)