const mongoose = require('mongoose')

const url = process.env.DB_URL || 'mongodb://localhost:27017/portfolio'
mongoose.connect(url)
const db = mongoose.connection

db.on('error', console.error.bind(console, "connection error"))

module.exports = {
    db,
    mongoose
}
