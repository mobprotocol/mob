import { List } from 'immutable'

export default class Orderbook {
  constructor() {
    this.sellA = new List()
    this.sellB = new List()
  }

  submitSellA(order) {
    return new Promise((res, rej) => {
      for(let i = 0; i < this.sellA.size; i++) {
        console.log('sellA[i]', sellA[i])
      }
      this.sellA.push(order)
    })
  }

  submitSellB(order)  {
    return new Promise((res, rej) => {
      for(let i = 0; i < this.sellB.size; i++) {
        console.log('sellB[i]', sellB[i])
      }
      this.sellB.push(order)
    })
  }
}
