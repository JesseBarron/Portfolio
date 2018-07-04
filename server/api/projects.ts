const passport = require('passport')
const router = require('express').Router()
const { Project } = require('../db')

export default router

router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find(req.query)
    res.send(projects)
  } catch (e) {
    next(e)
  }
})

router.get('/:_id', async (req, res, next) => {
  try {
    const { _id } = req.params
    let project = await Project.findById(_id)
    res.send(project)
  } catch (e) {
    console.log(e)
  }
})

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try {
    console.log(req.body)
    if(!req.user.god) {
      res.status(401).send('User not Authenticated')
    } else {
      const createdProject = await Project.create(req.body)
      res.send(createdProject)
    }
  } catch (e) {
    next(e)
  }
})

router.delete('/:_id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try {
    const { id } = req.params
    if (!req.user.god) {
      res.status(401).send('User is not Authorized')
    } else {
      const removedProject = await Project.findByIdAndRemove(id)
      res.send(removedProject)
    }
  } catch (e) {
    next(e)
  }
})

// Write Update route
router.put('/:_id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try {
    const { _id } = req.params
    const data = req.body
    const updatedProject = await Project.findByIdAndUpdate(_id, data, { new: true })
    res.send(updatedProject)
  } catch (e) {
    next(e)
  }
})

// Write tests