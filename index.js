const express = require('express')
const bodyParser = require('body-parser')
require("dotenv").config();
const cookieParser = require('cookie-parser')
const database = require('./config/database')
const cors = require('cors')

const routeApiVer1 = require('./api/v1/routes/index.route')

const port = process.env.PORT
const app = express()

app.use(cors())
database.connect()

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser());

// route version 1
routeApiVer1(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})