import test from 'tape'
import BN from 'bn.js'
import Orderbook from './index'

let orderABatch = 10
let orderBBatch = 10
const randomOrder = {
  price: new BN(Math.floor(Math.random(101) + 1)),
  quantity: new BN(Math.floor(Math.random(101) + 1))
}

test('should submit one sell to ledger', async (t) => {
  const book = new Orderbook()
  try {
    t.plan(2)
    await book.submitSellA(randomOrder)
    await book.submitSellB(randomOrder)
    t.assert(book.sellA.size > 0)
    t.assert(book.sellB.size > 0)
  } catch (err) {
    console.log('### ERROR in base case test', err)
  }
})

test('should submit 10 sells to ledger wile maintaining a sorted set', async (t) => {
  const book = new Orderbook()
  try {
    t.plan(1)
    await submitSellAOrders(book)
    console.log('book.sellA.size', book.sellA.size)
    t.assert(book.sellA.size === 10)
  } catch (err) {
    console.log('### ERROR in sort test', err)
  }
})

// function submitSellAOrders() {
//   return new Promise(async (res, rej) => {
//     console.log('randomOrder', randomOrder)
//     await book.submitSellA(randomOrder)
//     orderABatch--
//     return submitSellAOrders()
//   })
// }

async function submitSellAOrders(book) {
  await book.submitSellA(randomOrder)
  console.log('orderABatch', orderABatch)
  orderABatch--
  if (orderABatch > 0) await submitSellAOrders(book)
}

function submitSellBOrders(book) {
  return new Promise(async (res, rej) => {
    if(orderBBatch <= 0) res(true)
    await book.submitSellB(randomOrder)
    orderBBatch--
    return submitSellBOrders(book)
  })
}
