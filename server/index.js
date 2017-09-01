import express from 'express'
import ws from 'ws'
import stringy from 'stringy'
import crypto from 'crypto'
import delay from 'await-delay'
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
    clients[hash] = socket
    socket.onmessage = (e) => {
      console.log(`Message from ${clients[hash]}`, e.data)
    }
  } catch (err) {
    console.log('### error while registering client', err)
  }
}

async function broadcast(msg) {
  if(Object.keys(clients).length === 0) {
    return true;
  }
  Promise.all(
    Object.keys(clients).map(client => {
      console.log('client', clients[client])
      clients[client].send(msg)
    })
  ).catch(err => {
    console.log('### error in broadcast', err)
  })
}

async function cron() {
  await delay(3000)
  console.log('here')
  await broadcast("broadcast from server")
  cron()
}

cron()
