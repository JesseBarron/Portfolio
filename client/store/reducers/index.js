import { combineReducers } from 'redux'
import User from './user'
import Projects from './project'

const rootReducer = combineReducers({
    User,
    Projects
})

export default rootReducer