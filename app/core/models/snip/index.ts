import { computed, observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { TimelineVector } from 'core/primitives/timeline-vector';

import { Envelope } from 'core/models/envelope';

export interface SnipParams {
  length: TimelineVector;
  position: TimelineVector;
}

export const enum SnipType {
  container = 'container',
  envelope = 'envelope',
  notes = 'notes',
  trigger = 'trigger',
}

export type SnipData = Envelope | null;

export class Snip {
  id = generateId();

  @observable length: TimelineVector;
  @observable position: TimelineVector;

  @observable type: SnipType = SnipType.envelope;
  @observable data: SnipData = null;

  constructor(params: SnipParams) {
    const { position, length } = params;
    this.position = position;
    this.length = length || new TimelineVector(2);
  }

  @computed
  get end(): TimelineVector {
    return this.position.add(this.length);
  }

  static copy(clip: Snip) {
    return new Snip({
      length: clip.length,
      position: clip.position,
    });
  }
}