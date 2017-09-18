import keys from 'keythereum'

const params = { keyBytes: 32, ivBytes: 16 };

async function createUser() {
  const dk = await keys.create(params)
  console.log('dk', dk)
}

createUser()
