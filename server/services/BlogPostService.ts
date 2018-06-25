const { BlogPost } = require('../db')

export default class BlogPostService {
    constructor() {}
    async find(params) {
        try {
            const post = await BlogPost.find(params)
            if (post.length < 1) {
              throw new Error('Posts Not Found')
            }
            return post
        } catch (e) {
            console.log(e)
            throw e.message
        }
    }
    async get(id, params) {
      try {
        const post = await BlogPost.findById(id, params)

        if (!post) {
          throw new Error('Post Not Found')
        }
        return post
      } catch (e) {
        console.log(e)
        throw e.message
      }
    }
    async create(data) {
        return await BlogPost.create(data)
    }
    async update(id, data, params) {
      params = Object.assign({}, {new: true}, params)
      return await BlogPost.findByIdAndUpdate(id, data, params)
    }
}
