const express = require('express')
const app = express()
require("dotenv").config();
const port = process.env.PORT

const database = require('./config/database')
const routeApiVer1 = require('./api/v1/routes/index.route')
const bodyParser = require('body-parser')


database.connect()

// parse application/json
app.use(bodyParser.json())

// route version 1
routeApiVer1(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})