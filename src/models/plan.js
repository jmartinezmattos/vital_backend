const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const Dia = require('../models/day');

const PlanSchema = new Schema({
    nombre: String,
    dias: Array
})

module.exports = mongoose.model('planes',PlanSchema)