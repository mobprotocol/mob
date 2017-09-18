import keys from 'keythereum'

const params = { keyBytes: 32, ivBytes: 16 };

async function createUser() {
  try {
    const privateKey = await keys.create(params).privateKey.toString('hex').replace(/^/,'0x')
    console.log('privateKey', privateKey)
    // const publicAddress
  } catch (err) {
    console.log('### ERROR in createUser', err)
  }
}

createUser()
