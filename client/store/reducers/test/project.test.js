import { expect } from 'chai'
import mockStore from './storeMock'
import * as actions from '../project'

describe('Projects reducer', () => {
    let store, projectId;
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
    };
    beforeEach(async () => {
        store = mockStore([])
    })

    it('thunk createProject should persist a new project to the database', async () => {
        const newProject = await store.dispatch(actions.createProject(project))
        projectId = newProject._id

        expect(store.getActions()[0].type).to.equal('GET_SELECTED_PROJECT')
        expect(store.getActions()[0].project._id).to.equal(projectId)
    })
    it('thunk fetchProject should fetch a single project by id', async () => {
        const foundProject = await store.dispatch(actions.fetchProject(projectId))

        expect(store.getActions()[0].type).to.equal('GET_SELECTED_PROJECT')
        expect(store.getActions()[0].project._id).to.equal(projectId)
    })
    it('thunk removeProject should remove project from the database', async () => {
        const removedProject = await store.dispatch(actions.removeProject(projectId))    
        console.log(removedProject)
    })
    it('thunk fetchProjects should fetch all the projects from the database', async () => {
        const projects = await store.dispatch(actions.fetchProjects())

        expect(store.getActions()[0].projects.length).to.be.greaterThan(1)
    })
    it('thunk fetchProjects with parameters should fetch featured projects from the db', async () => {
        const projects = await store.dispatch(actions.fetchProjects({ query: { featured: true } }))

        expect(store.getActions()[0].projects.every((el) => {
            return el.featured == true
        })).to.be.equal(true)
    })
    it('thunk updateProject should update a project in the db', async () => {
        const projects = await store.dispatch(actions.fetchProjects())
        const project = projects[0]
        const featured = project.featured
        const updatedProject = await store.dispatch(actions.updateProject(project._id, {featured: !featured}))


        expect(store.getActions()[1].type).to.be.equal("GET_SELECTED_PROJECT")
        expect(store.getActions()[1].project.featured).to.not.equal(featured)
    })
})