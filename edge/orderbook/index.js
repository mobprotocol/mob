import { List } from 'immutable'

export default class Orderbook {
  constructor() {
    this.sellA = new List()
    this.sellB = new List()
  }

  submitSellA(order) {
    return new Promise((res, rej) => {
      try {
        let index
        for(let i = 0; i < this.sellA.size; i++) {
          console.log('sellA[i]', sellA[i])
          if(order.price > this.sellA[i].price) {
            index = i
            break;
          }
        }
        if (index == 0) this.sellA = this.sellA.push(order)
        else if (index) this.sellA = this.sellA.splice(index, 0, order)
        else this.sellA = this.sellA.push(order)
        res(true)
      } catch (err) {
        rej(err)
      }
    })
  }

  submitSellB(order)  {
    return new Promise((res, rej) => {
      for(let i = 0; i < this.sellB.size; i++) {
        console.log('sellB[i]', sellB[i])
      }
      this.sellB = this.sellB.push(order)
      res(true)
    })
  }
}
