import delay from 'await-delay'

export default class ExAgent {
  constructor(params) {
    this.orderbook = params.orderbook
  }

  async daemon() {
    await delay(3000)
    await this.match()
    await this.daemon()
  }

  async match() {
    try {
      const side = chooseSide()
    } catch (err) {
      console.log('### ERROR in match', err)
    }
  }

  chooseSide() {
    const bnry = Math.round(Math.random)
    bnry === 0 ? return 'A' : return 'B'
  }

  getOrder() {

  }

  fillOrder() {

  }
}
