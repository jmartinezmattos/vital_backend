require('dotenv').config()

const express = require('express')
const app = express()


mongoose.conect(process.env.DATABASE_URL, { useNewUrlParser: True})

app.listen(3000, () => console.log('Server started at 3000'))

const db = mongooose.conection

db.on('error', (error) => console.error(error))
db.once('open', )


















