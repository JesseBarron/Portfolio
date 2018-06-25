const assert = require('assert')
const { db } = require('../../db/db')
const { User } = require('../../db')
const { expect, should } = require('chai')

const app = require('../../index').default

xdescribe('UserService', () => {
    let service = app.service('user')
    const user = {
        name: 'tester',
        email: 't@t.com',
        password: 'hey'
    }

    afterEach(async () => {
        try {
            await db.dropDatabase()
        } catch(e) {
            console.log(e)
        }
    })

    it('UserService should be registered', () => {
        assert.ok(service, "The service is registered")
    })

    describe('UserService.create', () => {
        it(' Should be able to create a new user to the database', async () => {
                const createdUser = await service.create(user)
                expect(createdUser).to.not.be.null
                expect(createdUser.name).to.equal(user.name)
                expect(createdUser.email).to.equal(user.email)
                expect(createdUser.password).to.not.equal(user.password)
        })
    })

    describe('UserService.find', () => {
        let userid
        const user2 = {
            name: 'tester2',
            email: 't2@t.com',
            password: 'hey2'
        }
        beforeEach(async () => {
            try {
                let users = [user, user2]
                const createdUsers = await User.create(users)
                userid = createdUsers[0].id
            } catch(e) {
                console.log(e)
            }
        })
        it('Should return all users', async () => {
            const foundUsers = await service.find()
            expect(foundUsers).to.be.an('array').with.lengthOf(2)
            expect(foundUsers[0].name).to.equal(user.name || user2.name)
        })
        it('Should take an object with a prop of email or id and return a found user', async () => {
            const find = { email: 't@t.com' }
            const foundUser = await service.find(find)

            expect(foundUser).to.be.an('array').with.lengthOf(1)
            expect(foundUser[0].name).to.equal(user.name)
            expect(foundUser[0].email).to.equal(user.email)
        })

        describe('UserService.get', () => {
            it('Should take an id as a parameter and return the user with the same id', async () => {
                const foundUser = await service.get(userid)
                expect(foundUser).to.be.an('object')
                expect(foundUser.name).to.be.equal(user.name || user2.name)
            })
        })

        describe('UserService.remove', () => {
            it('Should remove a user with the given id from the database', async () => {
                const removedUser = await service.remove(userid)
                expect(removedUser).to.be.an('object')
                expect(removedUser).to.have.property('ok')
                expect(removedUser.ok).to.equal(1)
            })
        })
        describe('UserService.login', () => {
            it('Should take two strings email and password and return a user and a JWT', async () => {
                const loggedUser = await service.login(user.email, user.password)
                expect(loggedUser).to.have.property('id')
                expect(loggedUser).to.have.property('name')
                expect(loggedUser.name).to.equal(user.name)                
            })
            it('Should throw an error if no user is found', async () => {
                try {
                    await service.login('jewe@jdkaf', 'jfakldjfla')
                } catch(e) {
                    expect(e.message).to.equal('Incorrect password or username')
                }
            })
        })
    })
})