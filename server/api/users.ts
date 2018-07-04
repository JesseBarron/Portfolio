let router = require('express').Router()
const { User } = require('../db')
const passport = require('passport')
const app = require('../index')

export default router


//If authenticated, returns all the user details, otherwise just the name and id
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    // console.log(req.query)
    try {
        if(req.user.admin) {
            res.send(await User.find(req.body))
        } else if(req.user.id && (req.body.id || req.body.email)) {
            const fetchedUser = await User.find(req.body)
            const { id, name } = fetchedUser[0]
            res.send({ id, name })
        } else {
            res.status(401).send('User is Unauthorized')
        }
    } catch(e) {
        console.log(e)
        next(e)
    }
})

// Creates User
router.post('/', async (req, res, next) => {
    try {
        const newUser = req.body
        const createdUser = await User.create(newUser)
        res.send({name: createdUser.name, id: createdUser.id})
    } catch(e) {
        console.log(e)
        res.send("Error")
    }
})

// Deletes User
router.delete('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        if(req.user.admin) {
            const params = req.body
            const removedUser = await User.findOneAndRemove(params)
            res.send(removedUser)
        } else {
            const removedUser = await User.findOneAndRemove({_id: req.user.id})
            res.send(removedUser)
        }
    } catch(e) {
        console.log(e)
        next(e)
    }
})
