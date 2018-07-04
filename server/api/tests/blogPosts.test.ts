const app = require('../../index').default
const jwt = require('jsonwebtoken')
const { db } = require('../../db/db')
const { expect } = require('chai')
const request = require('supertest')
const { BlogPost, seed } = require('../../db')

xdescribe('BlogPosts API endpoints', () => {
  let superUser,
      normalUser,
      superUserToken,
      normalUserToken
  
  beforeEach(async () => {
    try {
      await seed.blogPost.createMany(6, 'Posts')
      superUser = await seed.user.create('superUser', {admin: true, god: true})
      normalUser = await seed.user.create('normalUser')
      superUser = superUser.doc
      normalUser = normalUser.doc

      superUserToken = jwt.sign({ id: superUser.id, name: superUser.name }, process.env.JWT_SECRET)
      normalUserToken = jwt.sign({ id: normalUser.id, name: normalUser.name }, process.env.JWT_SECRET)
    } catch (e) {
      console.log(e)
    }
  })

  afterEach(async () => {
    try {
      await db.dropDatabase()
      await seed.blogPost.removeAll()
    } catch (e) {
      console.log(e)
    }
  })

  describe('GET /api/blogposts/', () => {
    it('if requsted by either normal user or admin, it should return all of the blogposts', async () => {
        const superResult = await request(app)
          .get('/api/blogposts/')
          .set('Authorization', `Bearer ${superUserToken}`)
          .expect(200)

        expect(superResult.body).to.have.lengthOf(6)
        const normalResult = await request(app)
          .get('/api/blogposts/')
          .set('Authorization', `Bearer ${superUserToken}`)
          .expect(200)
        
        expect(normalResult.body).to.have.lengthOf(6)
    })
    it('if parameters are passed, then it should return matching posts', async () => {
      let likedPost = await seed.blogPost.create('likedUser', { likes: 100 })
      likedPost = likedPost.doc

      const result = await request(app)
        .get('/api/blogposts/')
        .send({ likes: {$gte: 10} })
        .set('Authorization', `Bearer ${normalUserToken}`)
        .expect(200)

      expect(result.body).to.be.an('array')
      expect(result.body[0].likes).to.be.above(10)
    })
    it('GET /api/blogposts/:_id returns post with that specific id', async () => {
      let likedPost = await seed.blogPost.create('likedUser', { likes: 100 })
      likedPost = likedPost.doc
      const postId = likedPost.id

      const result = await request(app)
        .get(`/api/blogposts/${postId}`)
        .set('Authorization', `Bearer ${normalUserToken}`)
        .expect(200)

      expect(result.body._id).to.equal(postId)
    })
  })
  describe('POST /api/blogpost', () => {
    const newPost = {
      title: 'Test Post',
      likes: 9000
    }
    it('Only admins are allowed to create new posts', async () => {
      const adminResult = await request(app)
        .post('/api/blogposts')
        .send(newPost)
        .set('Authorization', `Bearer ${superUserToken}`)
        .expect(200)
      
      expect(adminResult.body.title).to.equal(newPost.title)
      expect(adminResult.body.likes).to.equal(newPost.likes)
      const normalResult = await request(app)
        .post('/api/blogposts')
        .send(newPost)
        .set('Authorization', `Bearer ${normalUserToken}`)
        .expect(401)
    })
  })
  describe('PUT /api/blogposts/:_id', () => {
    let updatePostId
    beforeEach(async() => {
      try {
        let updatedPost = await seed.blogPost.create('upPost', {likes: 50})
        updatedPost = updatedPost.doc
        updatePostId = updatedPost._id
      } catch (e) {
        console.log(e)
      }
    })
    afterEach( async () => {
      try {
        await seed.blogPost.removeAll()
      } catch (e) {
        console.log(e)
      }
    })
    it('Only admins can update a blog post', async() => {
      const adminResult = await request(app)
        .put(`/api/blogposts/${updatePostId}`)
        .send({ likes: 200})
        .set('Authorization', `Bearer ${superUserToken}`)
        .expect(200)
        
      expect(adminResult.body.likes).to.equal(200)
      const normalResult = await request(app)
        .put(`/api/blogposts/${updatePostId}`)
        .send({ likes: 200})
        .set('Authorization', `Bearer ${normalUserToken}`)
        .expect(401)
    })
  })
  describe('DELETE /api/blogposts/:_id', () => {
    it('Only admins are able to delete posts', async () => {
      let removePost = await seed.blogPost.create('removePost')
      removePost = removePost.doc
      let removePostId = removePost._id

      const result = await request(app)
        .delete(`/api/blogposts/${removePostId}`)
        .set('Authorization', `Bearer ${superUserToken}`)
        .expect(200)

      expect(result.body._id).to.equal(removePostId+'')
    })
  })
})