import delay from 'await-delay'

export default class ExAgent {
  constructor(params) {
    this.orderbook = params.orderbook
  }

  async daemon() {
    await delay(3000)
    console.log('hearbeat')
    await this.match()
    await this.daemon()
  }

  async match() {
    try {
      console.log('match it up !')
    } catch (err) {
      console.log('### ERROR in match', err)
    }
  }
}
