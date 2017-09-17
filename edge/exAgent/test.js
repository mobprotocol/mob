import ExAgent from './index'
import Orderbook from '../orderbook/index'

// import {
//   randomOrder,
//   submitSellAOrders,
//   submitSellBOrders
// } from '../orderbook/test'

const book = new Orderbook()
const agent = new ExAgent({orderbook: book})

async function test() {
   await agent.daemon()
}

test()
