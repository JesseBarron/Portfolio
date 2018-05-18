const mongoose = require('mongoose')
//TODO: change this to be compatible with heroku
const url = process.env.DB_URL || 'mongodb://localhost:27017/boilerplate'
mongoose.connect(url)
const db = mongoose.connection

db.on('error', console.error.bind(console, "connection error"))

module.exports = {
    db,
    mongoose
}
