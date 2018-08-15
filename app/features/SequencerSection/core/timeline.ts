import { Service } from 'typedi';
import { computed } from 'mobx';

import { TimelineVector } from 'core/primitives/timeline-vector';

// import { ClipDragInteraction } from 'features/SequencerSection/core';

@Service()
export default class __Timeline {
  // @Inject(type => ClipDragInteraction)
  // clipDragInteraction: ClipDragInteraction;

  @computed
  get dropTargetPosition() {
    // console.log(this.clipDragInteraction);
    return null;
    //   return this.clipDragInteraction.isDragging
    //     ? this.clipDragInteraction.dropTargetTimelinePosition
    //     : null;
  }

  @computed
  get dropTargetTrackIndex() {
    return null;
    //   return this.clipDragInteraction.isDragging
    //     ? this.clipDragInteraction.dropTargetTrackIndex
    //     : null;
  }

  length = new TimelineVector(64);
}
