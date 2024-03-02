const express = require('express')
require("dotenv").config();
const app = express()
const port = process.env.PORT
const database = require('./config/database')
const route = require('./api/v1/routes/index.route')

database.connect()
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})