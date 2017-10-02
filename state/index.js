import level from 'levelup'
import sublevel from 'level-sublevel'
const ObservableStore = require('obs-store')

export class State {
  constructor() {
    this.tokenTree = {}
    this.edgeTree  = {}
    this.memory = { tokenTree, edgeTree }
    this.store = new ObservableStore(this.memory)
    this.disk = sublevel(level('./state'))
  }

  watch() {
    
  }
}
