import { Inject, Service } from 'libs/typedi';
import { action } from 'mobx';

import { Track } from 'core/models/Track';
import { ClipSelectInteraction } from 'features/Sequencer/core';

@Service()
export default class TracksInteraction {
  @Inject(_ => ClipSelectInteraction)
  private clipSelect: ClipSelectInteraction;

  constructor() {
    this.handleStageClick = this.handleStageClick.bind(this);
  }

  @action
  handleTrackClick = (track: Track, event: MouseEvent) => {
    if (event.ctrlKey) {
      // no op
    } else if (this.clipSelect.selectedClips.length > 0) {
      this.clipSelect.deselectAllClips();
    }
  };

  @action
  handleStageClick = (event: MouseEvent) => {
    if (event.ctrlKey) {
      // no op
    } else if (this.clipSelect.selectedClips.length > 0) {
      this.clipSelect.deselectAllClips();
    }
  };
}
