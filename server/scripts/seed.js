const faker = require('faker')
const { User } = require('../db')
const db = require('../db/db')

const generateUsers = async () => {
    const fakeUsers = [{
        name: 'Jay',
        email: 'j@j.com',
        password: 123,
        admin: true
    }]
    for(let i = 0; i < 20; i++) {
        let user = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: 123,
        }
        fakeUsers.push(user)
    }
    await User.create(fakeUsers)
    return true
}

const seed = async () => {
    await User.remove()
    generateUsers()
    return
}

seed()
process.exit(0)