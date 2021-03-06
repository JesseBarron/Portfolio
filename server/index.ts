require('dotenv').config()
const { User } = require('./db')
// const feathers = require('@feathersjs/feathers')
// const express = require('@feathersjs/express')
// const socketio = require('@feathersjs/socketio')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt
// const { 
//     UserService,
//     ProjectService,
//     BlogPostService
// } = require('./services/index')

const PORT = process.env.PORT || 8080;
const app = express()

export default app

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

passport.use(new JwtStrategy(jwtOpts, async (payload, done) => {
    try {
        const user = await User.findById(payload.id)
            if(user != null) {
                return done(null, user)
            } else {
                return done(null, false)
            }
    } catch(e) {
        return done(e, false)
    }
}))

app.use(passport.initialize())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


/**
 * The reason I have to do this sloppy default thing is so that I export the 'app' Before I import the file
 * this makes sure that I have the passport initialized and all the services registered before the file initializes
 */
app.use('/api', require('./api').default) 
app.use('/auth', require('./auth').default)

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'public')))
    .use((req, res, next) => {
        if (path.extname(req.path).length) {
        const err = new Error('Not found')
        next(err)
        } else {
        next()
        }
    })

//Send the index.html
app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})


/* Error Handling */
app.use((err, req, res, next) => {
    console.log(err.message, 'this is from the error handler')
    res.status(500).send({
        errMessage: err.message || "Internal server error",
        status: 500
    })
})

/* Services Registry */
// app.use('user', new UserService)
// app.use('project', new ProjectService)
// app.use('blogPost', new BlogPostService)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
