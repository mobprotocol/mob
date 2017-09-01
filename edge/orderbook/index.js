import { List } from 'immutable'

export default class Orderbook {
  constructor() {
    this.sellA = new List()
    this.sellB = new List()
  }

  async submitSellA(order) {
    return new Promise((res, rej) => {
      for(let i = 0; i < this.sellA.size; i++) {
        console.log('sellA[i]', sellA[i])
      }
      this.sellA.push(order)
    })
  }

  async submitSellB(order)  {

  }
}
