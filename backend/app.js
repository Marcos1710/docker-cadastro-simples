const app = require('express')()
const restful = require('node-restful')
const mongoose = restful.mongoose
const bodyParse = require('body-parser')
const cors = require('cors')

// Database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb')

// Middlewares
app.use(bodyParse.urlencoded({ extended: true }))
app.use(bodyParse.json())
app.use(cors())

// ODM
const Client = restful.model('Client', {
    name: { type: String, required: true }
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({ new: true, runValidators: true })

// Routes
Client.register(app, '/clients')

app.listen(3000)