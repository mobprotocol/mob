import level from 'levelup'
import sublevel from 'level-sublevel'
import ObservableStore from 'obs-store'
import { broadcast } from '../server/index'
import delay from 'async-delay'

export class State {
  constructor() {
    this.tokenTree = {}
    this.edgeTree  = {}
    this.memory = {
      tokenTree:this.tokenTree,
      edgeTree: this.edgeTree
    }
    this.store = new ObservableStore(this.memory)
    this.disk = sublevel(level('./state'))
    this.store.subscribe(tree => this.mutate(tree))
  }

  async mutate(tree) {
    try {
      await broadcast(tree)
    } catch (err) {
      console.log('### Error in mutation')
    }
  }
}

const state = new State()

async function test() {
  try {
    state.store.putState({
      [Date.now()]: Math.random() * 100
    })
    await delay(3000)
    await test()
  } catch (err) {
    console.log('### error test loop', err)
  }
}

test()
