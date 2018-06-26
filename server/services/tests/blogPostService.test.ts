const { expect } = require('chai')
const assert = require('assert')
const { db } = require('../../db/db')
const { BlogPost, seed } = require('../../db')
const app = require('../../index').default
const { Value } = require('slate')

const blogValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'title',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                object: 'leaf',
                text: 'This is the test Blog!'
              }
            ]
          }
        ],
      },
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                object: 'leaf',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra enim lorem, non bibendum nulla egestas eu. Donec auctor, nunc nec dapibus ultricies, magna ex sodales diam, a mattis massa ante suscipit nunc. Curabitur rhoncus felis elementum, facilisis ante nec, interdum sem.'
              }
            ]
          }
        ]
      }
    ],
  }
})

xdescribe('BlogPostService (blogPost)', () => {
    let service;
    let authors, author1, author2, author3, post;
    const authorParams = {
        admin: true,
        god: true,
        password: '123'
    }
    beforeEach(async () => {
        try {
            authors = await seed.user.createMany(3, 'authors', authorParams)
            author1 = authors.docs[0]
            author2 = authors.docs[1]
            author3 = authors.docs[2]
            await db.dropDatabase()
            service = app.service('blogPost')
        } catch (e) {
            // console.log(e)
        }
    })
    afterEach(async () => {
        await seed.user.remove('authors')
        await db.dropDatabase()
    })
    it('ServiceShould be registered', () => {
        assert.ok(service, "BlogPostService is registered")
    })
    describe('The find and get Methods', () => {
      beforeEach(async () => {
        const blogPosts = []
        try {
          //Abstract this away mate...
          for (let i = 0; i < authors.docs.length; i++) {
             blogPosts.push(await seed.blogPost.create(`blog${i+1}`, {
              author: authors.docs[i]._id,
              body: JSON.stringify(blogValue.toJSON())
            }))
          }
        } catch (e) {
          // console.log(e)
        }
      })
      afterEach(async () => {
        try {
          for (let i = 0; i < authors.docs.length; i++) {
            await seed.blogPost.remove(`blog${i+1}`)
         }
        } catch (e) {
          // console.log(e)
        }
      })
      it('find should return all of the blogs if no parameters are passed into find', async () => {
        const projects = await service.find()
        expect(projects).to.have.lengthOf(3)
        projects.forEach((e, i) => {
          expect(e.id).to.equal(seed.blogPost.documents['blog'+(i+1)].id)
        })
      })
      it('find should return specific blog post that match the parameters', async () => {
        let likedPost = await seed.blogPost.create('likedPost', {
          author: authors.docs[0]._id,
          body: JSON.stringify(blogValue.toJSON()),
          likes: 5000
        })
        let projects = await service.find({ likes: { $gte: 5000 } })
        expect(projects[0].id).to.equal(likedPost.doc.id)
        projects = await service.find({ likes: { $lt: 100 } })
        expect(projects).to.have.lengthOf(3)
        await seed.blogPost.remove('likedPost')
      })
      it('find should return an error if no projects where found', async () => {
        try {
          await service.find({ likes: { $gt: 9000 } })
        } catch (e) {
          expect(e).to.equal('Posts Not Found')
        }
      })
      it('get should return a single blog post that matches the id passed in', async () => {
        let post = seed.blogPost.documents.blog1
        const foundPost = await service.get(post.id)
        expect(post.id).to.equal(foundPost.id)
        expect(post.name).to.equal(foundPost.name)
      })
      // it('get should throw an error if a project was not found', async () => {
      //   try {
      //     await service.get(134134134151)
      //   } catch (e) {
      //     expect(e).to.equal('Post Not Found')
      //   }
      // })
    })
    describe('Create, Update, Remove', () => {
      it('Create should persist new posts to the database', async () => {
        const postData = {
          title: 'Test Post',
          author: author1._id,
          body: JSON.stringify(blogValue.toJSON()),
          likes: 0
        }
        const createdPost = await service.create(postData)
        const foundPost = await service.get(createdPost.id)
        expect(createdPost.id).to.equal(foundPost.id)
        expect(createdPost.title).to.equal(foundPost.title)
      })
      it('Update should update a specific document in the database', async () => {
        const blog = await seed.blogPost.create('blog', {
          title: 'Update me',
          body: JSON.stringify(blogValue.toJSON()),
          author: author1._id,
          likes: 10
        })
        const updatedBlog = await service.update(blog.doc.id, { likes: 20 })

        expect(blog.doc.id).to.equal(updatedBlog.id)
        expect(blog.doc.likes).to.not.equal(updatedBlog.likes)
        await seed.blogPost.remove('blog')
      })
      it('Remove should remove a specific document in the database', async () => {
        const postData = {
          title: 'Test Remove Post',
          author: author1._id,
          body: JSON.stringify(blogValue.toJSON()),
          likes: 0
        }
        const post = await seed.blogPost.create('post', postData)
        const deletedPost = await service.remove(post.doc.id)
        expect(deletedPost.id).to.equal(post.doc.id)
        const removedDoc = await service.get(post.doc.id)
        expect(removedDoc).to.equal(null)
      })
    })
})