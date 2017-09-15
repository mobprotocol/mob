import test from 'tape'
import BN from 'bn.js'
import Orderbook from './index'

const order1 = {
  price: new BN(10),
  quantity: new BN(10)
}

test('orderbook maintains sorted set', async (t) => {
  const Book = new Orderbook()
  console.log('sellA', Book.sellA)
  await Book.submitSellA(order1)
  console.log('sellA', Book.sellA)
})
