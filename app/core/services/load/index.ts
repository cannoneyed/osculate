import { Service } from 'typedi';
import { action } from 'mobx';
import { range } from 'lodash';

import { ClipStore } from 'core/stores/clips';
import { TrackStore } from 'core/stores/tracks';
import { AppState } from 'core/stores';
import { TimelineVector } from '../../primitives/timeline-vector';

@Service()
export class LoadService {
  constructor(
    private clipStore: ClipStore,
    private trackStore: TrackStore,
    private appState: AppState
  ) {}

  @action
  loadSession() {
    console.log(this.appState);

    const tracks = range(3).map(() => this.trackStore.createTrack());
    this.clipStore.createClip({
      trackId: tracks[0].id,
      length: new TimelineVector(2),
      position: new TimelineVector(4),
    });
  }
}
