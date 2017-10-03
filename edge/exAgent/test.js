import test from 'tape'
import ExAgent from './index'
import Orderbook from '../orderbook/index'
import HttpProvider from 'ethjs-provider-http'
import RPC from 'ethjs-rpc'
const eth = new RPC(new HttpProvider('http://localhost:8545'))

import {
  randomOrder,
} from '../orderbook/test'

const book = new Orderbook()
const agent = new ExAgent({orderbook: book})

test('shold match two orders in the market', async (t) => {
  try {
    const account = await getCoinbase()
    console.log('account', account)
    await book.submitSellA(randomOrder(account))
    await book.submitSellB(randomOrder(account))
    await agent.daemon()
  } catch (err) {
    console.log('### ERROR in test', err)
  }
})

async function getCoinbase() {
  try {
    const accounts = await eth.sendAsync({ method: 'eth_accounts' })
    console.log('a')
    return accounts[0]
  } catch (err) {
    console.log('### error in getCoinbase', err)
  }
}
