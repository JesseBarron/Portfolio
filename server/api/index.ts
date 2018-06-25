import * as express from '@feathersjs/express'
import usersAPI from './users'

let router = express.Router()

router.use('/users',  usersAPI)

export default router