const { BlogPost } = require('../db')

export default class BlogPostService {
    constructor() {}
    async find(params: object) {
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
    async get(id: string, params: object) {
      try {
        const post = await BlogPost.findById(id, params)

        // if (!post) {
        //   throw new Error('Post Not Found')
        // }
        return post
      } catch (e) {
        console.log(e)
        throw e.message
      }
    }
    async create(data: object) {
      try {
        return await BlogPost.create(data)
      } catch (e) {
        console.log(e)
      }
    }
    async update(id: string, data: object, params: object) {
      try {
        params = Object.assign({}, {new: true}, params)
        return await BlogPost.findByIdAndUpdate(id, data, params)
        
      } catch (e) {
        console.log(e)
      }
    }
    async remove(id: string, params: object) {
      try {
        return await BlogPost.findByIdAndRemove(id, params)
      } catch (e) {
        console.log(e)
      }
    }
}
