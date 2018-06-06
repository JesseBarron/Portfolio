const { expect } = require('chai')
const assert = require('assert')
const { db } = require('../../db/db')
const { BlogPost, User } = require('../../db')

const app = require('../../index')

//Write a utility that seeds the db temporarily

describe('BlogPostService (blogPost)', () => {
    let service;
    const blogPost = {
        title: 'testPost',
        body: "Ex anim sit irure sint est ullamco nostrud do.",
        likes: 20
    }
    const author = {
        name: 'J',
        email: 'e@j.com',
        password: '123'
    }
    beforeEach(async () => {
        try {
            await db.dropDatabase()
            service = app.service('blogPost')
        } catch (e) {
            console.log(e)
        }
    })
    afterEach(async () => {
        await db.dropDatabase()
    })
    it('ServiceShould be registered', () => {
        assert.ok(service, "BlogPostService is registered")
    })
})