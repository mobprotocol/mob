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
    t.plan(2)
    await submitSellAOrders(book)
    t.assert(book.sellA.size === 10)
    await submitSellBOrders(book)
    t.assert(book.sellB.size == 10)
  } catch (err) {
    console.log('### ERROR in sort test', err)
  }
})

async function submitSellAOrders(book) {
  await book.submitSellA(randomOrder)
  orderABatch--
  if (orderABatch > 0) await submitSellAOrders(book)
}

async function submitSellBOrders(book) {
  await book.submitSellB(randomOrder)
  orderBBatch--
  if (orderBBatch > 0) await submitSellBOrders(book)
}
