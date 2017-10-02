import ws from 'ws'
import stringy from 'stringy'
import crypto from 'crypto'
import delay from 'await-delay'
const sha256 = crypto.createHash('sha256');

/*
  WEBSOCKET INTERFACE
*/
const wss = new ws.Server({ port: 3345 })

const clients = {}

wss.on('connection', async (socket, req) => {
  await registerClient(socket)
})

export function registerClient(socket) {
  try {
    const hash = sha256.update(stringy.stringify(socket)).digest('hex')
    clients[hash] = socket
    socket.onmessage = (e) => {
      console.log(`Message from ${hash}`, e.data)
    }
  } catch (err) {
    console.log('### error while registering client', err)
  }
}

export async function broadcast(msg) {
  if(Object.keys(clients).length === 0) {
    return true;
  }
  Promise.all(
    Object.keys(clients).map(client => {
      console.log('client', clients[client], typeof clients[client] )
      clients[client].send(msg)
    })
  ).catch(err => {
    console.log('### error in broadcast', err)
  })
}
