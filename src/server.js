require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')


//mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})

//mongoose.connect('mongodb://localhost/suscribers', { useNewUrlParser: true})

//conectar a bdd
mongoose.connect('mongodb://localhost/vitalfit', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log('DB connected'))//tira este mensaje si se conecto
    .catch(err => console.log(err))//tira esto si no conecto

app.use(express.json());


//importing routes
const clientRoute = require('./routes/cliente');//le aviso que aca estan las rutas
//routes
app.use('/cliente', clientRoute);
//app.use(express.urlencoded({extended:false}));//para entender los datos que se envian al server
//app.use(express.bodyParser());


app.listen(3000, () => console.log('Server started at 3000'))

















