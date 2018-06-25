import io from 'socket.io-client'
import socketio from '@feathersjs/socketio-client'
import feathers from '@feathersjs/feathers'

const local = 'http://localhost:8080/';
const socket = io(local)
const app = feathers()

app.configure(socketio(socket))

export const userService = app.service('user')
export const projectService = app.service('project')