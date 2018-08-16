import { Inject, Service } from 'typedi';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { GridLayout } from 'features/SequencerSection/core';
import { Timeline } from 'features/SequencerSection/core';

@Service()
export default class __SequencerPositionService {
  @Inject(_ => GridLayout)
  private gridLayout: GridLayout;
  @Inject(_ => Timeline)
  private timeline: Timeline;

  getTimelineVectorFromOffsetX = (offsetX: number) => {
    const { barWidth } = this.gridLayout;
    const nearestBar = Math.floor(offsetX / barWidth);
    return new TimelineVector(nearestBar);
  };

  getOffsetX = (position: TimelineVector) => {
    const { barWidth } = this.gridLayout;
    const bar = position.primary * barWidth;
    const beats = position.beats.multiplyScalar(barWidth);

    return bar + beats;
  };

  getWidth = (length: TimelineVector): number => {
    return this.getOffsetX(length);
  };

  getTimelineStart = () => {
    return new TimelineVector(0);
  };

  getTimelineEnd = () => {
    return new TimelineVector(this.timeline.length.primary);
  };
}
