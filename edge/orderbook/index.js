import { List } from 'immutable'

export default class Orderbook {
  constructor() {
    this.sellA = new List()
    this.sellB = new List()
  }

  submitSellA(order) {
    return new Promise((res, rej) => {
      try {
        // let index
        // for (let i = 0; i < this.sellA.size; i++) {
        //   if (order.price > this.sellA[i].price) {
        //     index = i
        //     break;
        //   }
        // }
        const index = this.sellA.findIndex((ordr) => {
          return order.price > ordr.price
        })
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
      try {
        let index
        for (let i = 0; i < this.sellB.size; i++) {
          console.log('this.sellB[i]', this.sellB[i])
          if (order.price > this.sellB[i].price) {
            index = i
            break;
          }
        }
        if (index == 0) this.sellB = this.sellB.push(order)
        else if (index) this.sellB = this.sellB.splice(index, 0, order)
        else this.sellB = this.sellB.push(order)
      } catch (err) {
        rej(err)
      }
    })
  }
}
