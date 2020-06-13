//defino la  'tabla' el esquema para la bdd

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);//crea indices
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({

    cedula:{
        type:Number,
        unique : true,
        index: true,
        required: true
    },
    username: { 
       type: String,
       required: true
    },
    /* Esto se cambia por el hash
    password: {
        type: String,
        required: true
    },
    */
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
    },
    hash: String,
    salt: String

});


module.exports = mongoose.model('clientes',ClienteSchema)//se almacenan en 'clientes'