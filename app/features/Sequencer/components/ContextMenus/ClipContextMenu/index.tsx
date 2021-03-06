import * as React from 'react';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';
import { Menu, MenuItem } from '@blueprintjs/core';

import { Clip } from 'core/models/clip';

import { ClipActions } from 'core';
import { get, ClipSelectInteraction } from 'features/Sequencer/core';

interface Props {
  clip: Clip;
}
interface InjectedProps {
  deleteClip: () => void;
  deleteClips: () => void;
  editClip: () => void;
  nSelectedClips: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const { clip } = props;
  const clipSelect = get(ClipSelectInteraction);
  const clipActions = get(ClipActions);

  return {
    deleteClip: () => clipActions.deleteClip(clip),
    deleteClips: () => clipActions.deleteClips(clipSelect.selectedClips),
    editClip: () => clipActions.editClip(clip.id),
    nSelectedClips: clipSelect.selectedClips.length,
  };
});

@observer
export class ClipContextMenu extends React.Component<Props & InjectedProps, {}> {
  editClip = () => {
    this.props.editClip();
  };

  deleteClip = () => {
    this.props.deleteClip();
  };

  deleteClips = () => {
    this.props.deleteClips();
  };

  render() {
    const { nSelectedClips } = this.props;
    const deleteAction = nSelectedClips > 1 ? this.deleteClips : this.deleteClip;
    const deleteText = nSelectedClips > 1 ? 'Delete Clips' : 'Delete Clip';

    return (
      <Menu>
        <MenuItem onClick={this.editClip} icon="edit" text="edit" />
        <MenuItem onClick={deleteAction} icon="cross" text={deleteText} />
      </Menu>
    );
  }
}

export default inject(hot(module)(ClipContextMenu));
