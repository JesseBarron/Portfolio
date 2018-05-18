'use strict';
const { User } = require('../db')

class UserService {
    constructor() { }

    async find(params) {
        try {
            return await User.find(params)
        } catch(e) {
            console.log(e)
        }
    }

    async get(id, params) {
        return await User.findById(id)
    }

    async create(data, params) {
        try {
            if(data.name && data.password && data.email && !data.admin) {
                const newUser = new User(data)
                const createdUser = await newUser.save()
                return createdUser
            }
            throw new Error('You must fill in all fields in order to create an account')
        } catch(e) {
            throw e.message || new Error("Email is Already Being used by a User")
        }
    }

    async remove(id, params) {
        return await User.remove({ id, params })
    }

    async login(email, password) {
        try {
            const regexEmail = new RegExp(`^${email}$`, 'i')
            const user = await User.findOne({email: regexEmail})
            if(user == null) {
                throw new Error('Incorrect password or username')
            } else if(await user.correctPassword(password)) {
                return {name: user.name, id: user.id}
            }
            throw new Error('Incorrect password or username')            
        } catch (e) {
            throw e
        }
    }
}

module.exports = UserService