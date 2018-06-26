const { User } = require('../db')

export default class UserService {
    constructor() { }

    async find(params: object) {
        try {
            return await User.find(params)
        } catch(e) {
            console.log(e)
        }
    }

    async get(id: string, params: object) {
        return await User.findById(id, params)
    }

    async create(data, params: object) {
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

    async remove(id: string, params: object) {
        return await User.remove({ id, params })
    }

    async login(email: string, password: string) {
        try {
            const regexEmail = new RegExp(`^${email}$`, 'i')
            const user = await User.findOne({email: regexEmail})
            const isCorrectPW = user ? await user.correctPassword(password) : false
            if(user != null && isCorrectPW) {
                return {name: user.name, id: user.id}
            }
                throw new Error('Incorrect password or username')          
        } catch (e) {
            throw e
        }
    }
}