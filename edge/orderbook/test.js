import test from 'tape'
import Orderbook from './index'


const order1 = {
  price: 10,
  quantity: 10
}

test('orderbook maintains sorted set', async (t) => {
  const Book = new Orderbook()
  console.log('Book', Book)
  await Book.submitSellA()
})
