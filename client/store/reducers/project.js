import { projectService } from '../../service'

const initialState = {
    project: {},
    projects: []
}

/* Actions */
const GET_PROJECTS = 'GET_PROJECTS'
const GET_SELECTED_PROJECT = 'GET_SELECTED_PROJECT'

/* Action Creators */
const getSelectedProject = (project) => ({
    type: GET_SELECTED_PROJECT,
    project
})

const getProjects = (projects) => ({
    type: GET_PROJECTS,
    projects
})

/* Reducers */
const reducerMethods = {
    GET_PROJECTS(state, action) {
        return Object.assign({}, state, action)
    },
    GET_SELECTED_PROJECT(state, action) {
        return Object.assign({}, state, action)
    }
}

export default (state= initialState, action) => {
    const newState = Object.assign({}, state)
    const { type } = action
    if(reducerMethods[type]) return reducerMethods[type](newState, action)
    return newState
}

/* Thunks */
export const createProject = (data) => 
    async dispatch => {
        try {
            const newProject = await projectService.create(data)
            const action = getSelectedProject(newProject)
            dispatch(action)
            return newProject
        } catch (e) {
            console.log(e)
        }
    }

export const fetchProject = (id) =>
    async dispatch => {
        try {
            const project = await projectService.get(id)
            const action = getSelectedProject(project)
            dispatch(action)
            return project
        } catch (e) {
            console.log(e)
        }
    }

export const fetchProjects = (params) =>
   async dispatch => {
        try {
            const projects = await projectService.find(params)
            const action = getProjects(projects)
            dispatch(action)
            return projects
        } catch (e) {
            console.log(e)
        }
    }

export const updateProject = (id, data) =>
    async dispatch => {
        try {
            const updatedProject = await projectService.update(id, data)
            const action = getSelectedProject(updatedProject)
            dispatch(action)
            await dispatch(fetchProjects())
            return updatedProject
        } catch (e) {
            console.log(e)
        }
    }

export const removeProject = (id) => 
    async dispatch => {
        try {
            const removeProject = await projectService.remove(id)
            return removedProject 
        } catch (e) {
            console.log(e)
        }
    }