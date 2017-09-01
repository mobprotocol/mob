import express from 'express'
import ws from 'ws'

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

const clients = {}

wss.on('connection', (socket, req) => {
  socket.send("hello world!")
  socket.onmessage = (e) => {
    console.log('message', e.data)
  }
})
