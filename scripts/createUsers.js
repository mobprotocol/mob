import keys from 'keythereum'
import {
  privateToAddress,
  privateToPublic,
} from 'ethereumjs-util'

const params = { keyBytes: 32, ivBytes: 16 };

async function createUser() {
  try {
    const privKey = await keys.create(params).privateKey.toString('hex').replace(/^/,'0x')
    const pubKey = await privateToPublic(privKey).toString('hex').replace(/^/, '0x')
    console.log('pubKey', pubKey)
    const pubAddress = await privateToAddress(privKey).toString('hex').replace(/^/, '0x')
  } catch (err) {
    console.log('### ERROR in createUser', err)
  }
}

createUser()
