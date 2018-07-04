const passport = require('passport')
const router = require('express').Router()

const { BlogPost } = require('../db')

export default router

//Get BlogPosts
router.get('/', async (req, res, next) => {
  // You can use req.query
  try {
    // console.log(req.params)
    // console.log(req.query)
    // console.log(req.body)
    const blogPosts = await BlogPost.find(req.body)
    res.send(blogPosts)
  } catch (e) {
    next(e)
  }
})

//Get a single Post
router.get('/:_id', async (req, res, next) => {
  try {
    const { _id } = req.params
    const blogPost = await BlogPost.findById(_id)
    res.send(blogPost)
  } catch (e) {
    next(e)
  }
})

//Create new BlogPosts
router.post('/', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
  try {
    if(req.user.admin) {
      const createdPost = await BlogPost.create(req.body)
      res.send(createdPost)
    } else {
      res.status(401).send("User is Unauthorized")
    }
  } catch (e) {
    next(e)
  }
})

//Update BlogPost
router.put('/:_id', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
  try {
    const { _id } = req.params
    const data = req.body
    if(!req.user.god || !req.user.admin) {
      res.status(401).send("User is Unauthorized")
    } else {
      const updatedPost = await BlogPost.findByIdAndUpdate(_id, data, { new: true })
      res.send(updatedPost)
    }
  } catch (e) {
    next(e)
  }
})

//Remove a single BlogPost
router.delete('/:_id', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
  try {
    const { _id } = req.params
    if(!req.user.god) {
      res.status(401).send("User is Unauthorized")
    } else {
      const removedBlogPost = await BlogPost.findByIdAndRemove(_id)
      res.send(removedBlogPost)
    }
  } catch (e) {
    next(e)
  }
})
