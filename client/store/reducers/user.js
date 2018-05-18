import axios from 'axios'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JB_JWT')

import jwtDecode from 'jwt-decode'


import { userService, authService } from '../../service'


const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

const getUser = (user) => ({
    type: GET_USER,
    user
})

const removeUser = () => ({
    type: REMOVE_USER,
})


/* Reducer */
const reducerMethods = {
    GET_USER(state, action) {
        return action.user
    },
    REMOVE_USER(state, action) {
        return {}
    }
}

export default (state={}, action) => {
    const { type } = action
    if(reducerMethods[type]) return reducerMethods[type](state, action)
    return state
}



/* Thunks */
export const authUser = (type, data, history) =>
   async dispatch => {
        try {
                const result = await axios.post(`/auth/${type}`, data)
                if(result.data.success) {
                    localStorage.setItem('JB_JWT', result.data.token)
                    dispatch(getUser(result.data.user))
                }
                return result.data
        } catch(e) {
            console.log(e)
        }
    }

export const fetchMe = () => 
    dispatch => {
    const user =  jwtDecode(localStorage.getItem('JB_JWT'))
    dispatch(getUser(user))
}

export const logout = () => 
    dispatch => {
        localStorage.removeItem('JB_JWT')
        dispatch(removeUser())
    }