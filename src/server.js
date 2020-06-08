//require('.env').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})

const db = mongoose.conection

db.on('error', (error) => console.error(error))
db.once('open', )

//importing routes
const indexRoutes = require('./src/routes/cliente');//le aviso que aca estan las rutas
//routes
app.use('/', indexRoutes);

app.listen(3000, () => console.log('Server started at 3000'))
















