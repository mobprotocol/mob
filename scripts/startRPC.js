import rpc from 'ethereumjs-testrpc'
import fs from 'fs'

async function getUsersData() {
  return new Promise((res, rej) => {
    fs.readFile('./conf/users.json', (err, data) => {
      if (err) rej(err)
      res(JSON.parse(data.toString('utf8')))
    })
  })
}

getUsersData().then(usrs => {
  const server = rpc.server({ 'accounts': usrs })
  server.listen('8545', (err, chain) => {
    if (err) console.log('### ERROR in testrpc server', err)
  console.log('### ETHEREUM RPC LISTENING ON 8545')
  })
})
