const router = require('@feathersjs/express').Router()
const jwt = require('jsonwebtoken')
module.exports = router
const app = require('../index')

//If Authentication is successfull send back some user info and a JWT for future varification
//Else send back an error message.... Not the most robust but it works
router.post('/login', async (req, res, next) => {
    try {
        const {email, password} = req.body
        const user = await app.service('user').login(email, password)
        res.send({
            token: jwt.sign(user, process.env.JWT_SECRET),
            user,
            success: true
        })
    } catch(e) {
        // console.log(e)
        res.send({
            code: 500,
            message: "Wrong Email or password please try again",
            success: false
        })
    }
})

router.post('/signup', async (req, res, next) => {
    try {
        const user = await app.service('user').create(req.body)
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
