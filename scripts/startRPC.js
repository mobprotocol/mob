import rpc from 'ethereumjs-testrpc'
import fs from 'fs'

async function getUsersData() {
  try {
    return await fs.readFile('../conf/users.json')
  } catch (err) {
    console.log('### ERROR in getUsersData', err)
  }
}

getUsersData().then(usrs => {
  const server = rpc.server({'accounts': usrs })
  server.listen('8545', (err, chain) => {
    if (err) console.log('### ERROR in testrpc server', err)
    console.log('### ETHEREUM RPC LISTENING ON 8545')
  })
})
