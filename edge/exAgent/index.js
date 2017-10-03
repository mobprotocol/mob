import delay from 'await-delay'

export default class ExAgent {
  constructor(params) {
    console.log('started ex agent')
    this.book = params.orderbook
  }

  async daemon(loops) {
    try {
      if (loops <= 0) return true
      await delay(3000)
      await this.match()
      loops--
      await this.daemon(loops)
    } catch (err) {
      console.log('### ERROR in main daemon', err)
    }
  }

  async match() {
    try {
      const sides = this.chooseSide()
      const order = this.book[`sell${sides[0]}`].last()
      this.fillOrder(sides, order)
    } catch (err) {
      console.log('### ERROR in match', err)
    }
  }

  chooseSide() {
    const bnry = Math.round(Math.random())
    if (bnry === 0) return ['A', 'B']
    else return ['B', 'A']
  }

  async fillOrder(sides, order) {
    console.log('order', order)
    try {
      const inverseOrder = this.book[`sell${sides[1]}`].last()
      if(this.checkInMarket(order.price, inverseOrder.price)) {
        console.log('### order out of market')
        return true
      }
      const relative = this.relativeSize(order, inverseOrder)
      console.log('relative', relative)
    } catch (err) {
      console.log('### ERROR in fillOrder', err)
    }
  }

  checkInMarket(price1, price2) {
    if (price1 > 1/price2) return true
    else return false
  }

  // async generateSettlementEvent(order1, order2) {
  //   try {
  //     const relativeSize = this.relativeSize(order1, order2)
  //   } catch (err) {
  //     console.log('### ERROR in generateSettlementEvent', err)
  //   }
  // }

  relativeSize(order1, order2){
    try {
      const diff = order1.quantity - order2.quantity * order2.price
      if (diff < 0) return 0
      else if (diff > 0) return 1
      else return 2
    } catch (err) {
      console.log('### error in releativeSize', err)
    }
  }
}
