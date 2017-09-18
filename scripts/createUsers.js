import keys from 'keythereum'
import { privateToAddress } from 'ethereumjs-util'

const params = { keyBytes: 32, ivBytes: 16 };

async function createUser() {
  try {
    const privKey = await keys.create(params).privateKey.toString('hex').replace(/^/,'0x')
    const pubAddress = await privateToAddress(privKey).toString('hex').replace(/^/, '0x')
    console.log('publicAddresss', pubAddress)
    // const publicAddress.
  } catch (err) {
    console.log('### ERROR in createUser', err)
  }
}

createUser()
