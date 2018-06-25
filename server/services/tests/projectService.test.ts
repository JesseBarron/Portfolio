const assert = require('assert')
const { db } = require('../../db/db')
const { Project } = require('../../db')
const { expect, should } = require('chai')

const app = require('../../index').default

xdescribe('ProjectService', () => {
    const project = {
        title: 'TestProject',
        description: 'This is a small description of the project',
        dateCreated: '2017-08-08 16:36:40.178',
        technologies: [
            'JS',
            'Node.js',
            'SQL'
        ],
        URL: 'google.com',
        githubRepo: 'https://github.com/JesseBarron/VoxFM',
        screenshot: 'https://mojtaba.in/wp-content/uploads/2016/04/git-for-beginners-part-2.jpg',
        featured: true
    }
    const project2 = {
        title: 'TestProject2',
        description: 'This is a small description of the project2',
        dateCreated: '2017-08-08 16:36:40.178',
        technologies: [
            'JS',
            'Node.js',
            'SQL'
        ],
        URL: 'google.com',
        githubRepo: 'https://github.com/JesseBarron/VoxFM',
        screenshot: 'https://mojtaba.in/wp-content/uploads/2016/04/git-for-beginners-part-2.jpg',
        featured: false
    }
    let service = app.service('project')
    afterEach(async () => {
        try {
            await db.dropDatabase()
        } catch (e) {
            console.log(e)
        }
    })

    it('ProjectService should be registered', () => {
        assert.ok(service, 'ProjectService is registered')
    })
    describe('ProjectService.create', () => {
        it('Should be able to persist a new project to the database', async () => {
            const createdProject = await service.create(project)

            expect(createdProject.title).to.equal(project.title)
            expect(createdProject.description).to.equal(project.description)            
            expect(createdProject.technologies[0]).to.equal(project.technologies[0])            
        })
    })
    describe('ProjectService.find', () => {
        it('Should return all projects if no parameters are passed', async () => {
            const projects = [ project, project2 ]
            const createdProjects = await Project.create(projects)

            expect(createdProjects.length).equals(2)
            expect(createdProjects[0].title).to.equal(project.title)
        })
        it('Should return appropriate projects based on parameters passed', async () => {
            const createdProject = await service.create(project)
            const foundProject = await service.find({ title: createdProject.title })

            expect(foundProject[0].id).to.equal(createdProject.id)
        })
        describe('ProjectService.get', () => {
            it('Should take an id as a parameter and return a project with the same id', async () => {
                const createdProject = await service.create(project)
                const foundProject = await service.get(createdProject.id)

                expect(foundProject.id).is.equal(createdProject.id)
            })
        })
        describe('ProjectService.remove', () => {
            it('Should remove a Project with the given id from the database', async () => {
                const createdProject = await service.create(project)
                const removedProj = await service.remove(createdProject.id)
                
                expect(removedProj.title).to.equal(createdProject.title)
                expect(removedProj.id).to.equal(createdProject.id)
            })
        })
        describe('ProjectService.update', () => {
            it('Should update a document\'s parameter', async () => {
                const createdProject = await service.create(project)
                const updateProj = await service.update( createdProject.id, {featured: false }, { new: true })

                expect(updateProj.id).to.equal(createdProject.id)
                expect(updateProj.featured).to.be.false
            })
        })
    })
})