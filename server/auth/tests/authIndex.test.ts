// const request = require('supertest')
// const { db } = require('../../db/db.ts')
// const app = require('../../index').default
// const { expect } = require('chai')

xdescribe('Authenticaiton Routes', () => {
    let userId
    const user = {
        name: 'J',
        email: 'j@j.com',
        password: '123'
    }

    beforeEach(async () => {
        try {
           const createdUser = await app.service('user').create(user)
            userId = createdUser.id
        } catch(e) {
            console.log(e)
        }
    })
    afterEach(async () => {
        try {
            await db.dropDatabase()
        } catch(e) {
            console.log(e)
        }
    })
    describe('/auth/login', () => {
        it('With proper credentials, should return an object with a user, success token properties', async () => {
            const result = await request(app)
                .post('/auth/login')
                .send({email: user.email, password: user.password})
                .set('Accept', 'application/json')
                .expect(200)
                expect(result.body).to.have.property('token')
                expect(result.body).to.have.property('user')
                expect(result.body).to.have.property('success')
                expect(result.body.user).to.have.property('id')
                expect(result.body.token).to.be.a('string')
                expect(result.body.success).to.be.true
        })
        it('With inproper credentials, should return an object with message, success, and code properties', async () => {
            const result = await request(app)
                .post('/auth/login')
                .send({email: 'not@real', password: 'not a password'})
                .set('Accept', 'application/json')
                .expect(200)
                expect(result.body).to.not.have.property('token')
                expect(result.body).to.not.have.property('user')
                expect(result.body).to.have.property('code')
                expect(result.body).to.have.property('success')
                expect(result.body.success).to.be.false
        })
    })
    describe('/auth/signup', () => {
        it('With proper credentials, should return an object with a user, success token properties', async () => {
            const result = await request(app)
                .post('/auth/signup')
                .send(user)
                .set('Accept', 'application/json')
                .expect(200)
                expect(result.body).to.have.property('token')
                expect(result.body).to.have.property('user')
                expect(result.body).to.have.property('success')
                expect(result.body.user).to.have.property('id')
                expect(result.body.token).to.be.a('string')
                expect(result.body.success).to.be.true
        })
        it('With inproper credentials, should return an object with message, success, and code properties', async () => {
            const result = await request(app)
                .post('/auth/signup')
                .send({email: 'not@real', password: 'not a password'})
                .set('Accept', 'application/json')
                .expect(200)
                expect(result.body).to.not.have.property('token')
                expect(result.body).to.not.have.property('user')
                expect(result.body).to.have.property('code')
                expect(result.body).to.have.property('success')
                expect(result.body.success).to.be.false
        })
    })
})