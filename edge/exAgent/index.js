import delay from 'await-delay'

export default class ExAgent {
  constructor(params) {
    this.book = params.orderbook
  }

  async daemon() {
    try {
      await delay(3000)
      await this.match()
      await this.daemon()
    } catch (err) {
      console.log('### ERROR in main daemon', err)
    }
  }

  async match() {
    try {
      const sides = this.chooseSide()
      const order = this.book[`sell${sides[0]}`].last()
      console.log('order 1', order)
      await this.fillOrder(sides, order)
    } catch (err) {
      console.log('### ERROR in match', err)
    }
  }

  chooseSide() {
    const bnry = Math.round(Math.random())
    console.log('bnry', bnry)
    if (bnry === 0) return ['A', 'B']
    else return ['B', 'A']
  }

  fillOrder(sides, order) {
    try {
      const inverseOrder = this.book[`sell${sides[1]}`].last()

    } catch (err) {
      console.log('### ERROR in fillOrder', err)
    }
  }

  generateSettlementEvent() {
    try {

    } catch (err) {
      console.log('### ERROR in generateSettlementEvent', err)
    }
  }
}
