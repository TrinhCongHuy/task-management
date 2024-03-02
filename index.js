const express = require('express')
require("dotenv").config();
const app = express()
const port = process.env.PORT
const database = require('./config/database')

database.connect()

const Task = require('./models/task.model')

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find({
        deleted: false
    })

    res.json(tasks)
})

app.get('/tasks/detail/:id', async (req, res) => {
    try {
        const id = req.params.id
        const taskDetail = await Task.findOne({
            _id: id,
            deleted: false
        })

        res.json(taskDetail)
    }catch(error) {
        res.json("Không tìm thấy!")
    }
    
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})