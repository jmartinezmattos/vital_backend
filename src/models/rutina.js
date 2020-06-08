const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RutinaSchema = new Schema({

    ejercicios: Array,
    fecha: {
        type: Date,
        required:true,
        default: Date.now
    }

})


module.exports = mongoose.model('rutinas',RutinaSchema)