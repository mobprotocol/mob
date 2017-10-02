import level from 'levelup'
import sublevel from 'level-sublevel'
import ObservableStore from 'obs-store'
import { broadcast } from '../server/index'
import delay from 'async-delay'

class State {
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
      console.log('tree', tree)
      const hash = require('crypto').createHash('sha256').update(JSON.stringify(tree)).digest('hex')
      this.disk.put(`${Date.now()}_${hash}`, JSON.stringify(tree))
    } catch (err) {
      console.log('### Error in mutation', err)
    }
  }
}

export const state = new State()
