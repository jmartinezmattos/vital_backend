require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose');
const passport = require('passport');
const bodyparser = require("body-parser");

app.set('port', process.env.PORT || 3000);

//conectar a bdd
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log('DB connected'))//tira este mensaje si se conecto
    .catch(err => console.log(err))//tira esto si no conecto


//Json middleware para que reconozca las entradas como json
app.use(express.json());

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

//Passport
require('./src/config/passport');

app.use(passport.initialize());
app.use(passport.session());


//importing routes
const clientRoute = require('./src/routes/cliente');
const ejercicioRoute = require('./src/routes/ejercicio');
const metricaRoute = require('./src/routes/metrica');
const rutinaRoute = require('./src/routes/rutina');
const passport_test = require('./src/routes/passport_test');

//routes
app.use('/clientes', clientRoute);
app.use('/ejercicios', ejercicioRoute);
app.use('/rutinas', rutinaRoute);
app.use('/metricas', metricaRoute);
app.use('/', passport_test);




app.listen(app.get('port'), () => console.log(`Server started at port ${app.get('port')}`))
















