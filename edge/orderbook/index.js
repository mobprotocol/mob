import { List } from 'immutable'

export default class Orderbook {
  constructor() {
    this.sellA = new List()
    this.sellB = new List()
  }

  async submitSellA(order) {
    try {
      const index =  await this.sellA.findIndex(ordr => order.price > ordr.price)
      if (index === -1) {
        this.sellA = this.sellA.push(order)
      } else if (index == 0) {
        this.sellA = this.sellA.unshift(order)
      } else {
        this.sellA = this.sellA.splice(index, 0, order)
      }
    } catch (err) {
      console.log('### ERROR in submitSellA', err)
    }
  }

  async submitSellB(order)  {
    try {
      const index =  await this.sellB.findIndex(ordr => {order.price > ordr.price})
      if (index === -1) {
        this.sellB = this.sellB.push(order)
      } else if (index == 0) {
        this.sellB = this.sellB.unshift(order)
      } else {
        this.sellB = this.sellB.splice(index, 0, order)
      }
    } catch (err) {
      console.log('### ERROR IN submitSellB', err)
    }
  }
}
