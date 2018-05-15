import io from 'socket.io-client'
import socketio from '@feathersjs/socketio-client'
import feathers from '@feathersjs/feathers'

const socket = io('http://localhost:8080/')
const app = feathers()

app.configure(socketio(socket))

export const userService = app.service('user')
