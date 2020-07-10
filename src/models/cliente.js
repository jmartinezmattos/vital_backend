//defino la  'tabla' el esquema para la bdd

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);//crea indices
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({

    username: { 
       type: String,
       unique : true,
       index: true,
       required: true
    },
    nombre: String,
    nacimiento: Date,
    nro_contacto: Number,
    mail: String,
    hash: String,
    salt: String,
    admin: {
        type:Boolean,
        default: false
    },
    planes: [mongoose.Schema.Types.ObjectId]

});


module.exports = mongoose.model('clientes',ClienteSchema)//se almacenan en 'clientes'