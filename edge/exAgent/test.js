import test from 'tape'
import ExAgent from './index'
import Orderbook from '../orderbook/index'
import HttpProvider from 'ethjs-provider-http'
import RPC from 'ethjs-rpc'
const eth = new RPC(new HttpProvider('http://localhost:8545'))
import BN from 'bn.js'

import {
  randomOrder,
  generateSalt
} from '../orderbook/test'

const book = new Orderbook()
const agent = new ExAgent({orderbook: book})
const tokenA = '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07'
const tokenB = '0x9a642d6b3368ddc662CA244bAdf32cDA716005BC'
// test('shold match two orders in the market', async (t) => {
//   try {
//     const account = await getCoinbase()
//     await book.submitSellA(randomOrder(account))
//     await book.submitSellB(randomOrder(account))
//     await agent.daemon()
//   } catch (err) {
//     console.log('### ERROR in test', err)
//   }
// })

test('should not match two orders out of the market', async (t) => {
  t.plan(2)
  try {
    const account = await getCoinbase()
    const order1 = {
      account,
      price: 300,
      quantity: 1,
      buy: tokenB,
      sell: tokenA,
      salt: generateSalt()
    }
    const order2 = {
      account,
      price: .0035,
      quantity: 310,
      buy: tokenA,
      sell: tokenB,
      salt: generateSalt()
    }
    await book.submitSellA(order1)
    await book.submitSellB(order2)
    await agent.daemon(1)
    t.assert(book.sellA.last().quantity == order1.quantity)
    t.assert(book.sellB.last().quantity == order2.quantity)
  } catch (err) {
    console.log('### error in out of market test', err)
  }
})

async function getCoinbase() {
  try {
    const accounts = await eth.sendAsync({ method: 'eth_accounts' })
    return accounts[0]
  } catch (err) {
    console.log('### error in getCoinbase', err)
  }
}
