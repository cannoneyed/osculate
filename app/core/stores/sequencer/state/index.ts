import { observable } from 'mobx'

import SnapToGrid from 'core/models/snap-to-grid'
import TimeSignature from 'core/models/time-signature'

class SequencerStateStore {
  @observable tempo = 120
  @observable timelineLength = 64
  @observable timeSignature = new TimeSignature()
  @observable snapToGrid = new SnapToGrid()
}

export default new SequencerStateStore()
export { SequencerStateStore }
