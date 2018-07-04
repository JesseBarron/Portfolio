import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { createLogger } from 'redux-logger'

const middleware = [thunk, createLogger({collapsed: true})]


const store = createStore(rootReducer, applyMiddleware(...middleware))

export default store
export * from './reducers/user'
export * from './reducers/project'
export * from './reducers/blog'