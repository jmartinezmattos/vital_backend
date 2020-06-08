//defino la  'tabla' el esquema para la bdd

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({

    usuario: { 
       type: String
       //required: true
    },
    password: String,
    nombre: String,
    nacimiento: Date,
    nro_contacto: Number,
    mail: String,
    ejercicios: Array,
    metricas_iniciales: Array,
    metricas_avance: Array,
    metricas_objetivo: Array,
    fecha_creacion: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model('clientes',ClienteSchema)//se almacenan en 'clientes'