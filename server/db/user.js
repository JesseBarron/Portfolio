const { db, mongoose } = require('./db')
const Schema = mongoose.Schema
const crypto = require('crypto')
const argon = require('argon2')

const userSchema = mongoose.Schema({
    name: String,
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: Buffer,
    admin: {
        type: Boolean,
        default: false
    },
    god: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    google_id: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
})

userSchema.pre('save', async function() {
    await this.saltPassword()
})

userSchema.methods.fullName = function() {
    return `${this.firstName} ${this.lastName}`
}

userSchema.methods.argonHash = async function(userPassword, salt) {
    try {
        const password = await argon.hash(userPassword, salt)
        return password
    } catch(e) {
        console.log(e)
    }
}

userSchema.methods.saltPassword = async function() {
    try {
        const salt = crypto.randomBytes(20)
        const password = await this.argonHash(this.password, salt)

        this.password = password
    } catch(e) {
        console.log(e)
    }
}

/* Checks if the inputed password matches */
userSchema.methods.correctPassword = async function(userPswd) {
    try {
        return await argon.verify(this.password, userPswd)
    } catch(e) {
        console.log(e)
    }
}

module.exports = mongoose.model('User', userSchema)
