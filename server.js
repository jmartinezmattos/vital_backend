require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')

app.set('port', process.env.PORT || 3000)
//var server_port = 3000 //puerto del server

//mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})

//mongoose.connect('mongodb://localhost/suscribers', { useNewUrlParser: true})

//conectar a bdd
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log('DB connected'))//tira este mensaje si se conecto
    .catch(err => console.log(err))//tira esto si no conecto

app.use(express.json());

//importing routes
const clientRoute = require('./src/routes/cliente');
const ejercicioRoute = require('./src/routes/ejercicio');
const metricaRoute = require('./src/routes/metrica');
const rutinaRoute = require('./src/routes/rutina');

//routes
app.use('/clientes', clientRoute);
app.use('/ejercicios', ejercicioRoute);
app.use('/rutinas', rutinaRoute);
app.use('/metricas', metricaRoute);


//app.use(express.urlencoded({extended:false}));//para entender los datos que se envian al server
//app.use(express.bodyParser());

app.listen(app.get('port'), () => console.log(`Server started at port ${app.get('port')}`))
















