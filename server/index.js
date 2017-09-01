import express from 'express'
import ws from 'ws'
import crypto from 'crypto'
const sha256 = crypto.createHash('sha256');

/*
  RESTFUL INTERFACE
*/
const app = express()

app.listen(3344, () => {
  console.log('### HTTP INTERFACE LISTENING ON PORT 3344')
})

/*
  WEBSOCKET INTERFACE
*/
const wss = new ws.Server({ port: 3345 })

const clients = { }

wss.on('connection', (socket, req) => {

  socket.send("hello world!")
  console.log('req', req)
  socket.onmessage = (e) => {
    console.log('message', e.data)
  }
})

async function registerClient(socket) {
  try {
    const hash = sha256(socket)
    console.log('hash', hash)
    clients[hash] = socket
  } catch (err) {
    console.log('### error while registering client', err)
  }
}
