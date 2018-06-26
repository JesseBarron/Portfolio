const { Project } = require('../db')

export default class ProjectService {
    constructor() {}
    
    async find(params: object) {
        try {
            return await Project.find(params.query)
        } catch (e) {
            console.log(e)
        }
    }

    async get(id: string, params: object) {
        try {
            return await Project.findById(id, params)
        } catch (e) {
            console.log(e)
        }
    }

    async create(data: object, params: object) {
        try {
            return await Project.create(data, params)
        } catch (e) {
            console.log(e)
        }
    }

    async remove(id: string, params: object) {
        try {
            const removedProj = await this.get(id, {})
            await Project.remove({ id, params }) 
            return removedProj
        } catch (e) {
            console.log(e)
        }
    }

    async update(id: string, data: object, params: object) {
        try {
           return await Project.findByIdAndUpdate(id, data, params)
        } catch (e) {
            console.log(e)
        }
    }
}
