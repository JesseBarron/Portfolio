import axios from 'axios'

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
            let newProject = await axios.post('/', data)
            newProject = newProject.data
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
            let project = await axios.get(`api/prjects/${id}`)
            project = project.data
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
            let projects = await axios.get('api/projects', {params})
            projects = projects.data
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
            let updatedProject = await axios.put(`api/projects/${id}`, data)
            updatedProject = updatedProject.data
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
            let removedProject = await axios.delete(`api/projects/${id}`)
            removedProject = removedProject.data
            return removedProject 
        } catch (e) {
            console.log(e)
        }
    }