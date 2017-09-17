import ExAgent from './index'
// import Orderbook from '../orderbook/index'
// import {
//   randomOrder,
//   submitSellAOrders,
//   submitSellBOrders
// } from '../orderbook/test'
const agent = new ExAgent()

async function test() {
   await agent.daemon()
}

test()
