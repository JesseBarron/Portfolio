const app = require('../../index').default
const jwt = require('jsonwebtoken')
const { db } = require('../../db/db.ts')
const { expect } = require('chai')
const request = require('supertest')
const { User } = require('../../db')
const auth = require('../../auth')


xdescribe('users API endpoints', () => {
    let superUserToken
    let normalUserToken

    const user = {
        name: 'test',
        email: 't@t.com',
        password: '321',
        admin: true
    }
    const user2 = {
        name: 'test2',
        email: 't2@t.com',
        password: '321',
    }
    beforeEach(async () => {
        try {
            await db.dropDatabase()
            let u1 = await User.create(user)
            let u2 = await User.create(user2)

            superUserToken = jwt.sign({id: u1.id, name: user.name}, process.env.JWT_SECRET)
            normalUserToken = jwt.sign({id: u2.id, name: user2.name}, process.env.JWT_SECRET)
        } catch(e) {
            console.log(e)
        }
    })
    afterEach(async () => {
        try {
            await db.dropDatabase()
        } catch (e) {
            console.log(e)
        }
    })
    describe('GET /api/users', () => {
        it('If requested is from an admin and no parameters are sent, should return all users', async () => {
            const result = await request(app)
                .get('/api/users')
                .set('Authorization', `Bearer ${superUserToken}`)
                .expect(200)

                expect(result.body).to.be.an('array')
                expect(result.body).to.have.lengthOf(2)
        })
        it('If requested is from an admin and parameters are sent, should return a single user', async () => {
            const result = await request(app)
                .get('/api/users')
                .send({email: user2.email})
                .set('Authorization', `Bearer ${superUserToken}`)
                .expect(200)

                expect(result.body).to.be.an('array')
                expect(result.body).to.have.lengthOf(1)
                expect(result.body[0].name).to.equal(user2.name)
        })
        it('If requested is from a normal user, and no parameters are passsed. user should get an error', async () => {
            const result = await request(app)
                .get('/api/users')
                .set('Authorization', `Bearer ${normalUserToken}`)
                .expect(401)
        })
        it('If requested is from a normal user, and parameters are passsed. user should get a single user\'s id and name', async () => {
            const result = await request(app)
                .get('/api/users')
                .send({email: user.email})
                .set('Authorization', `Bearer ${normalUserToken}`)
                .expect(200)

                expect(result.body).to.be.an('object')
                expect(result.body).to.have.property('name')
                expect(result.body).to.have.property('id')
        })
    })
    describe('POST /api/users', () => {
        const newUser = {
            name: 'newUser',
            email: 'new@user',
            password: '412'
        }
        it('Creates new user', async () => {
            const result = await request(app)
                .post('/api/users')
                .send(newUser)
                .expect(200)

                expect(result.body).to.be.an('object')
                expect(result.body).to.have.property('name')
                expect(result.body).to.have.property('id')
        })
    })
    describe('DELETE /api/users', () => {
        it('if requested from admin, user should be deleted', async () => {
            const result = await request(app)
                .delete('/api/users')
                .send({email: user2.email})
                .set('Authorization', `Bearer ${superUserToken}`)                
                .expect(200)

                expect(result.body.ok).to.equal(1)
        })
        it('if requested from user, that user should be deleted', async () => {
            const result = await request(app)
                .delete('/api/users')
                .send({email: user2.email})
                .set('Authorization', `Bearer ${normalUserToken}`)                
                .expect(200)

                expect(result.body.ok).to.equal(1)
        })
    })
    describe('UPDATE /api/users', () => {
        it('If requested by admin, they can update all parameters')
        it('If requested by user, they can password, email, whatever')
    })
})