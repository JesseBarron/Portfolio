import { combineReducers } from 'redux'
import User from './user'
import Projects from './project'
import BlogPosts from './blog'

const rootReducer = combineReducers({
    User,
    Projects,
    BlogPosts,
})

export default rootReducer