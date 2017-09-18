import rpc from 'ethereumjs-testrpc'
import users from './createUsers.js'

users().then(usrs => {
  const server = rpc.server({'accounts': usrs })

  server.listen('8545', (err, chain) => {
    if (err) console.log('### ERROR in testrpc server', err)
    console.log('chain', chain)
  })
})
