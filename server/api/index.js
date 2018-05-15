const router = require('@feathersjs/express').Router()
module.exports = router

router.use('/users', require('./users'))