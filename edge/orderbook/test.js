import test from 'tape'
import BN from 'bn.js'
import Orderbook from './index'
import crypto from 'crypto'
import { sign } from 'ethjs-signer'
import provider from 'ethjs-provider-http'
import Eth from 'ethjs-query'

const eth = new Eth(new provider('http://localhost:8545'))
let orderABatch = 10
let orderBBatch = 10
const tokenA = '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07'
const tokenB = '0x9a642d6b3368ddc662CA244bAdf32cDA716005BC'

// test('should submit one sell to ledger', async (t) => {
//   const book = new Orderbook()
//   try {
//     t.plan(2)
//     await book.submitSellA(randomOrder())
//     await book.submitSellB(randomOrder())
//     t.assert(book.sellA.size > 0)
//     t.assert(book.sellB.size > 0)
//   } catch (err) {
//     console.log('### ERROR in base case test', err)
//   }
// })
//
// test('should submit 10 sells to ledger wile maintaining a sorted set', async (t) => {
//   const book = new Orderbook()
//   try {
//     t.plan(22)
//     await submitSellAOrders(book)
//     await submitSellBOrders(book)
//     t.assert(book.sellA.size === 10)
//     t.assert(book.sellB.size == 10)
//     let tempA = 1e16 // arbitrary high number
//     book.sellA.map(ordr => {
//       t.assert(ordr.price < tempA)
//       return tempA = ordr
//     })
//     let tempB = 1e16 // arbitrary high number
//     book.sellB.map(ordr => {
//       t.assert(ordr.price < tempB)
//       return tempB = ordr
//     })
//   } catch (err) {
//     console.log('### ERROR in sort test', err)
//   }
// })

test('Should verify hash given a consistent order', async (t) => {
  try {
    const book = new Orderbook()
    const accounts = await eth.accounts()
    const order = randomOrder(accounts[0])
    console.log('order', order)
    // const hash = await hashOrder(accounts[0])
  } catch (err) {
    console.log('### ERROR in order hash test', err)
  }

})

export async function submitSellAOrders(book) {
  await book.submitSellA(randomOrder())
  orderABatch--
  if (orderABatch > 0) await submitSellAOrders(book)
}

export async function submitSellBOrders(book) {
  await book.submitSellB(randomOrder())
  orderBBatch--
  if (orderBBatch > 0) await submitSellBOrders(book)
}

export function randomOrder(from) {
  if (!from) throw new Error('### specify a from public address')
  return ({
    from,
    price: new BN(Math.floor(Math.random() * 100 + 1)),
    quantity: new BN(Math.floor(Math.random() * 100 + 1)),
    buy: tokenA,
    sell : tokenB,
    salt: generateSalt()
  })
}

function generateSalt() {
  return '0x' + crypto.randomBytes(20).toString('hex')
}
