
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TiposSchema = new Schema({

    nombre: {
      type:String,
      required:true,
      unique:true,
      index:true
    }

})



module.exports = mongoose.model('tiposEjercicio',TiposSchema)