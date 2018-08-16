import { Inject, Service } from 'typedi';
import { action } from 'mobx';

import { Track } from 'core/models/Track';
import { ClipSelectInteraction } from 'features/SequencerSection/core';

@Service()
export default class __TracksInteraction {
  @Inject(_ => ClipSelectInteraction)
  private clipSelect: ClipSelectInteraction;

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
