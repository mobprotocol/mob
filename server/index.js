import express from 'express'
import ws from 'ws'
import stringy from 'stringy'
import crypto from 'crypto'
const sha256 = crypto.createHash('sha256');

console.log('sha256', sha256)

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

wss.on('connection', async (socket, req) => {
  const test = await registerClient(socket)
})

async function registerClient(socket) {
  try {
    const hash = sha256.update(stringy.stringify(socket)).digest('hex')
    console.log('hash', hash)
    clients[hash] = socket
    socket.onmessage = (e) => {
      console.log(`Message from ${clients[hash]}`, e.data)
    }
  } catch (err) {
    console.log('### error while registering client', err)
  }
}
