import test from 'tape'
import BN from 'bn.js'
import Orderbook from './index'

let orderABatch = 10
let orderBBatch = 10
const randomOrder = {
  price: new BN(Math.floor(Math.random(101) + 1)),
  quantity: new BN(Math.floor(Math.random(101) + 1))
}
const book = new Orderbook()

test('sellBaseCase', async (t) => {
  try {
    t.plan(2)
    await book.submitSellA(randomOrder)
    await book.submitSellB(randomOrder)
    t.assert(book.sellA.size > 0)
    t.assert(book.sellB.size > 0)
  } catch (err) {
    console.log('### ERROR IN TEST', err)
  }
})

function submitSellAOrders() {
  return new Promise(async (res, rej) => {
    console.log('randomOrder', randomOrder)
    await book.submitSellA(randomOrder)
    orderABatch--
    return submitSellAOrders()
  })
}

function submitSellBOrders() {
  return new Promise(async (res, rej) => {
    if(orderBBatch <= 0) res(true)
    await book.submitSellB(randomOrder)
    orderBBatch--
    return submitSellBOrders()
  })
}
