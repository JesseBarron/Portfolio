const router = require('express').Router()

router.use('/users',  require('./users').default)
router.use('/projects', require('./projects').default)
router.use('/blogPosts', require('./blogPosts').default)

export default router