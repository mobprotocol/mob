import level from 'levelup'
import sublevel from 'level-sublevel'

export class State {
  constructor() {
    this.tokenTree = {}
    this.edgeTree  = {}
    this.memory = { tokenTree, edgeTree }
    this.tokenDisk = sublevel(level('./tokens'))
    this.edgeDisk = sublevel(level('./edges'))
  }

  async function mutate() {

  }
}
