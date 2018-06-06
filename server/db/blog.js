const { mongoose } = require('./db')
const Schema = mongoose.Schema

const blogSchema = mongoose.Schema({
    title: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    body: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: Number,
    media: [{type: Schema.Types.ObjectId, ref: 'Media'}]
})

module.exports = mongoose.model('BlogPost', blogSchema)