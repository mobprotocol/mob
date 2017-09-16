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

test('orderbook maintains sorted set', async (t) => {
  try {
    await book.submitSellA(randomOrder)
  } catch (err) {
    console.log('### ERROR IN TEST', err)
  }
  // await submitSellAOrders()
  // await submitSellBOrders()
  // console.log('bookA', book.sellA)
  // console.log('bookB', book.sellB)
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
