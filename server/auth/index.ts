const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { User } = require('../db')
const app = require('../index')

export default router
//If Authentication is successfull send back some user info and a JWT for future varification
//Else send back an error message.... Not the most robust but it works
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const regexEmail = new RegExp(`^${email}$`, 'i')
        const user = await User.findOne({email: regexEmail})
        const isCorrectPW = await user.correctPassword(password)
        if(user != null && isCorrectPW) {
            res.send({
                token: jwt.sign({name: user.name, id: user.id}, process.env.JWT_SECRET),
                user,
                success: true
            })

        } else {
            throw new Error("NOPE")
        }
    } catch(e) {
        res.send({
            code: 500,
            message: "Wrong Email or password please try again",
            success: false
        })
    }
})

//Creates a new user account
router.post('/signup', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        const {id, name} = user
        res.send({
            user: {
                id,
                name,
            },
            success: true,
            token: jwt.sign({name, id}, process.env.JWT_SECRET)
        })
    } catch(e) {
        res.send({
            code: 500,
            message: 'User is already using this email',
            success: false
        })
    }
})
