//defino la  'tabla' el esquema para la bdd

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);//crea indices
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({

    img: { 
        data: Buffer, 
        contentType: String 
    },
    username: { 
       type: String,
       unique : true,
       index: true,
       required: true
    },
    nombre: {
        type: String,
        required: true,
        default: "Sin nombre"
    },
    fecha_nacimiento: Date,
    nro_contacto: String,
    mail: String,
    hash: String,
    salt: String,
    admin: {
        type:Boolean,
        default: false
    },
    planes: [mongoose.Schema.Types.ObjectId],
    plan_asignado: mongoose.Schema.Types.ObjectId

});


module.exports = mongoose.model('clientes',ClienteSchema)//se almacenan en 'clientes'