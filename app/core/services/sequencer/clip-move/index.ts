import { Clip } from 'core/models/clip';
import { TimelineVector } from 'core/classes/timeline-vector';

export class ClipMoveService {
  moveClip(clip: Clip, deltaTimeline: TimelineVector) {
    this.moveClips([clip], deltaTimeline);
  }
  moveClips(clips: Clip[], deltaTimeline: TimelineVector) {
    clips.forEach(clip => {
      const nextPosition = clip.position.add(deltaTimeline);
      clip.setPosition(nextPosition);
    });
  }
}

export const clipMoveService = new ClipMoveService();