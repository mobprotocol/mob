import fs from 'fs'

function getTokenConfig() {
  return new Promise((res, rej) => {
    fs.readFile('./conf/tokens.json', (err, data) => {
      if (err) rej(err)
      res(JSON.parse(data.toString('utf8')))
    })
  })
}

getTokenConfig()
.then(tokens => console.log('tokens', tokens, typeof tokens))
.catch(err => console.log('### ERROR creating tokens', err))
