import { Service } from 'typedi';
import { action, observable } from 'mobx';
import { filterMethods } from 'utils/log-filter';

import { Track } from 'core/models/track';
import { ClipStore } from 'core/stores/clips';

@Service()
export class TrackStore {
  static mobxLoggerConfig = filterMethods('updateTrackIndices');

  constructor(private clipStore: ClipStore) {}

  // The main store for tracks (by id)
  @observable tracks = observable.map<string, Track>({});
  @observable trackList = observable.array<Track>([]);

  getTrackById = (trackId: string) => {
    return this.tracks.get(trackId);
  };

  @action
  updateTrackIndices = () => {
    this.trackList.forEach((track, index) => (track.index = index));
  };

  // Actions
  @action.bound
  createTrack = () => {
    const track = new Track();
    this.tracks.set(track.id, track);
    this.trackList.push(track);
    this.updateTrackIndices();
    return track;
  };

  @action
  deleteTrack = (trackId: string) => {
    this.trackList.replace(this.trackList.filter(track => track.id !== trackId));
    this.clipStore.deleteClipsByTrackId(trackId);
    this.tracks.delete(trackId);
    this.updateTrackIndices();
  };
}
