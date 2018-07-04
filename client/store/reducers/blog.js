import axios from 'axios'


const initState = {
  selectedBlog: {},
  blogs: []
}

/**
 * Actions
 */
const GET_BLOG = 'GET_BLOG'
const GET_ALL_BLOGS = 'GET_ALL_BLOGS'


/**
 * Action Creator
 */
const getBlog = (blog) => ({
  type: GET_BLOG,
  blog
})

const getAllBlogs = (blogs) => ({
  type: GET_ALL_BLOGS,
  blogs
})

/**
 * Reducer
 */

const reducers = {
  GET_ALL_BLOGS(state, action) {
    return Object.assign({}, state, { blogs: action.blogs })
  },
  GET_BLOG(state, action) {
    return Object.assign({}, state, { selectedBlog: action.blog })
  }
}

export default (state = initState, action) => {
  const newState = Object.assign({}, state)
  const { type } = action
  if (reducers[type]) return reducers[type](newState, action)
  return newState
}

/**
 * Thunks
 */

export const fetchBlog = (id) =>
  async dispatch => {
    try {
      let blogPost = await axios.get(`api/blogPosts/${id}`)
      blogPost = blogPost.data
      const action = getBlog(blogPost)
      dispatch(action)
      return blogPost
    } catch (e) {
      console.log(e)
    }
  }

export const fetchAllBlogs = (params) =>
  async dispatch => {
    try {
      let blogPosts = await axios.get('api/blogPosts', { params })
      blogPosts = blogPosts.data
      const action = getAllBlogs(blogPosts)
      dispatch(action)
      return blogPosts
    } catch (e) {
      console.log(e)
    }
  }

export const updateBlogPost = (id, data) => 
  async dispatch => {
    try {
      let updatedBlog = await axios.put(`api/blogPosts/${id}`, { data })
      updatedBlog = updatedBlog.data
      return updatedBlog
    } catch (e) {
      console.log(e)
    }
  }

export const removeBlogPost = (id) =>
  async dispatch => {
    try {
      let removedBlog = await axios.remove(`api/blogPosts/${id}`)
      removedBlog = removedBlog.data
      return removedBlog
    } catch (e) {
      console.log(e)
    }
  }
