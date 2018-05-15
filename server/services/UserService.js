'use strict';
const { User } = require('../db')

class UserService {
    constructor() {
      
    }

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
            const newUser = new User(data)
            const createdUser = await newUser.save()
            return createdUser
        } catch(e) {
            throw new Error("Email is Already Being used by a User")
        }
    }

    async remove(id, params) {
        return await User.remove(params)
    }

    async login(email, password) {
        try {
            const regexEmail = new RegExp(`^${email}$`, 'i')
            const user = await User.findOne({email: regexEmail})
            if(user == null) {
                throw new Error('Incorrect password or username')
            } else {
                return {id:user.id, name:user.name} 
            }
        } catch (e) {
            throw e
        }
    }
}

module.exports = UserService