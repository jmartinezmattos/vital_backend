const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiaSchema = new Schema({

    nombre: String,
    ejercicios: [mongoose.Schema.Types.ObjectId]

})

module.exports = mongoose.model('dias', DiaSchema)
