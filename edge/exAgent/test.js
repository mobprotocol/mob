import test from 'tape'
import ExAgent from './index'
import Orderbook from '../orderbook/index'

import {
  randomOrder,
//   submitSellAOrders,
//   submitSellBOrders
} from '../orderbook/test'

const book = new Orderbook()
const agent = new ExAgent({orderbook: book})

test('shold match two orders in the market', async (t) => {
  try {
    await book.submitSellA(randomOrder())
    await book.submitSellB(randomOrder())
    await agent.daemon()
  } catch (err) {
    console.log('### ERROR in test', err)
  }
})
