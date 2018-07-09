import * as React from 'react';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Clip } from 'core/models/clip';

export interface Props {
  clip: Clip;
}
export interface InjectedProps {}

const inject = injector<Props, InjectedProps>(props => {
  return {};
});

@observer
export class ClipEdit extends React.Component<Props & InjectedProps, {}> {
  render() {
    // const { snips } = this.props.clip;
    return <h1>yo</h1>;
    // return (
    //   <ClipEditContainer>
    //     <DragToMarker />
    //     <GridContainer style={gridStyle}>
    //       <VerticalGrid gridCount={gridCount} gridSegmentWidth={gridSegmentWidth} />
    //     </GridContainer>
    //     <TracksContainer>
    //       {tracks.map((track, index) => <Track track={track} index={index} key={index} />)}
    //     </TracksContainer>
    //   </ClipEditContainer>
    // );
  }
}

export default inject(ClipEdit);