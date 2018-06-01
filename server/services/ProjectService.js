const { Project } = require('../db')

class ProjectService {
    constructor() {}
    
    async find(params) {
        try {
            return await Project.find(params.query)
        } catch (e) {
            console.log(e)
        }
    }

    async get(id, params) {
        try {
            return await Project.findById(id)
        } catch (e) {
            console.log(e)
        }
    }

    async create(data, params) {
        try {
            const newProject = new Project(data)
            const savedProject = await newProject.save()
            return savedProject
        } catch (e) {
            console.log(e)
        }
    }

    async remove(id, params) {
        try {
            const removedProj = await this.get(id)
            await Project.remove({ id, params }) 
            return removedProj
        } catch (e) {
            console.log(e)
        }
    }

    async update(id, data, params) {
        try {
            await Project.findByIdAndUpdate(id, data)
            return await this.get(id)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = ProjectService