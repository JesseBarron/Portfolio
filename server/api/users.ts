import * as express from '@feathersjs/express'
let router = express.Router()
const passport = require('passport')
import app from '../index'

export default router


//If authenticated, returns all the user details, otherwise just the name and id
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        if(req.user.admin) {
            res.send(await app.service('user').find(req.body))
        } else if(req.user.id && (req.body.id || req.body.email)) {
            const fetchedUser = await app.service('user').find(req.body)
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

router.post('/', async (req, res, next) => {
    try {
        const newUser = req.body
        const createdUser = await app.service('user').create(newUser)
        res.send({name: createdUser.name, id: createdUser.id})
    } catch(e) {
        console.log(e)
        res.send("Error")
    }
})

router.delete('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        if(req.user.admin) {
            const where = req.body
            res.send(await app.service('user').remove(null, where))
        } else {
            res.send(await app.service('user').remove(req.user.id))
        }
    } catch(e) {
        console.log(e)
        next(e)
    }
})
