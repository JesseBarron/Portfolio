const { mongoose } = require('./db')
const Schema = mongoose.Schema

const blogSchema = mongoose.Schema({
    title: { type: String, require: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    body: { type: String, required: false},
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: { type: Number, default: 0 },
})

export default mongoose.model('BlogPost', blogSchema);
