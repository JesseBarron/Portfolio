const { mongoose } = require('./db')
const Schema = mongoose.Schema

const projectSchema = mongoose.Schema({
    title: String,
    description: String,
    dateCreated: Date,
    technologies: [String],
    URL: String,
    githubRepo: String,
    screenshot: String,
    featured: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Project', projectSchema)