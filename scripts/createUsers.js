import keys from 'keythereum'
import { privateToAddress, privateToPublic } from 'ethereumjs-util'
import fs from 'fs'

const params = { keyBytes: 32, ivBytes: 16 };
let size = 100
let swarm = []

async function createUser() {
  try {
    const privKey = await keys.create(params).privateKey.toString('hex').replace(/^/,'0x')
    const pubKey = await privateToPublic(privKey).toString('hex').replace(/^/, '0x')
    const pubAddress = await privateToAddress(privKey).toString('hex').replace(/^/, '0x')
    return ({
      privKey,
      pubKey,
      pubAddress,
      balance: '0x28DF9A72FDE228000'
    })
  } catch (err) {
    console.log('### ERROR in createUser', err)
  }
}

async function createSwarm() {
  try {
    swarm.push(await createUser())
    size--
    if (size > 0) await createSwarm()
    return true
  } catch (err) {
    console.log('### ERROR in createSwarm', error)
  }
}

async function users() {
  await createSwarm()
  return swarm
}

async function writeFile(usrs) {
  return new Promise((res, rej) => {
    fs.writeFile('./conf/users.json', JSON.stringify(usrs), 'utf8', err => {
      if (err) rej('### ERROR in users file write', err)
      console.log('### successfull file write ./conf/users.json')
      res(true)
    })
  })
}

users()
.then(usrs => writeFile(usrs))
.then(res => true)
.catch('### ERROR in file write')
