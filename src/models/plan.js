const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanSchema = new Schema({

    nombre: String,
    dias: [mongoose.Schema.Types.ObjectId]

})

module.exports = mongoose.model('planes',PlanSchema)