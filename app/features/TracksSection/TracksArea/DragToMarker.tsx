import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import { SequencerPositionService } from 'core/services/sequencer/position';

import { MainPageLayout } from 'core/state/layouts/main/page';
import { SequencerLayout } from 'core/state/layouts/sequencer';

@observer
export default class DragToMarker extends React.Component<{}, {}> {
  sequencerPageLayout = Container.get(MainPageLayout);
  tracksSectionLayout = Container.get(SequencerLayout);
  sequencerPositionService = Container.get(SequencerPositionService);

  render() {
    const { tracksSectionLayout } = this;
    const { dropTargetPosition } = tracksSectionLayout.timeline;

    if (!dropTargetPosition) {
      return null;
    }

    const tracksAreaHeight = this.sequencerPageLayout.tracksAreaHeight;
    const offsetX = this.sequencerPositionService.getOffsetX(dropTargetPosition);

    // const caretSize = 10;

    const style = {
      left: offsetX - 1,
      height: tracksAreaHeight,
    };

    return <DragToMarkerBar style={style} />;
  }
}

const DragToMarkerBar = styled.div`
  position: absolute;
  z-index: 999;
  position: absolute;
  width: 1px;
  background-color: ${theme.colors.white.toRgbString()};
`;
