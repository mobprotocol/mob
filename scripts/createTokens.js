import tokens from '../conf/tokens'
import Token from '../token/index'

import levelup from 'levelup'
import sublevel from 'level-sublevel'

const tokenDB = sublevel(levelup('../state/tokens'))

// tokens.map(tkn => new Token({
//   params: tkn,
//   file: 'Token'
//   db: tokenDB
// }))

const tokenEx = new Token({
  params: {
      name: 'Mob',
      ticker: 'MOB',
      decimals: 10e9,
      supply: 10e18,
    },
  file: 'Token',
  db: tokenDB
})
