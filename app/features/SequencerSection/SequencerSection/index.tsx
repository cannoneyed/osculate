import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import Toolbar from 'features/Toolbar';

import Minimap from 'features/SequencerSection/Minimap';
import Grid from 'features/SequencerSection/Grid';
import Timeline from 'features/SequencerSection/Timeline';
import TimelineGutter from 'features/SequencerSection/TimelineGutter';
import TracksGutter from 'features/SequencerSection/TracksGutter';
import TracksArea from 'features/SequencerSection/TracksArea';
import VerticalScrollbar from 'features/SequencerSection/VerticalScrollbar';

import { Dimensions, Rectangle } from 'core/interfaces';
import { SequencerSectionLayout } from 'core/state/layouts/sequencer/section';

import {
  MinimapWrapper,
  SequencerSectionWrapper,
  TimelineWrapper,
  ToolbarWrapper,
  TracksWrapper,
  TracksAreaWrapper,
  VerticalScrollbarWrapper,
} from './styled-components';

interface Props {}
interface InjectedProps {
  minimapHeight: number;
  sectionHeight: number;
  timelineHeight: number;
  toolbarHeight: number;
  tracksAreaDimensions: Dimensions;
  verticalScrollbarRectangle: Rectangle;
}

const inject = injector<Props, InjectedProps>(props => {
  const sequencerSectionLayout = Container.get(SequencerSectionLayout);

  return {
    minimapHeight: sequencerSectionLayout.minimapHeight,
    sectionHeight: sequencerSectionLayout.sectionHeight,
    timelineHeight: sequencerSectionLayout.timelineHeight,
    toolbarHeight: sequencerSectionLayout.toolbarHeight,
    tracksAreaDimensions: sequencerSectionLayout.tracksAreaDimensions,
    verticalScrollbarRectangle: sequencerSectionLayout.verticalScrollbarRectangle,
  };
});

@observer
export class SequencerSection extends React.Component<Props & InjectedProps, {}> {
  render() {
    const minimapWrapperStyle = {
      height: this.props.minimapHeight,
    };

    const sequencerSectionStyle = {
      height: this.props.sectionHeight,
    };

    const timelineWrapperStyle = {
      height: this.props.timelineHeight,
      width: this.props.tracksAreaDimensions.width,
    };

    const toolbarWrapperStyle = {
      height: this.props.toolbarHeight,
    };

    const tracksAreaWrapperStyle = {
      height: this.props.tracksAreaDimensions.height,
      width: this.props.tracksAreaDimensions.width,
    };

    const tracksDimensions = {
      height: this.props.tracksAreaDimensions.height,
      width: this.props.tracksAreaDimensions.width - 100,
    };

    const verticalScrollbarWrapperStyle = {
      top: this.props.verticalScrollbarRectangle.top,
      height: this.props.verticalScrollbarRectangle.height,
      width: this.props.verticalScrollbarRectangle.width,
    };

    return (
      <SequencerSectionWrapper style={sequencerSectionStyle}>
        <ToolbarWrapper style={toolbarWrapperStyle}>
          <Toolbar />
        </ToolbarWrapper>
        <MinimapWrapper style={minimapWrapperStyle}>
          <Minimap />
        </MinimapWrapper>
        <TimelineWrapper style={timelineWrapperStyle}>
          <TimelineGutter />
          <Timeline />
        </TimelineWrapper>
        <TracksAreaWrapper style={tracksAreaWrapperStyle}>
          <TracksGutter />
          <TracksWrapper>
            <Grid />
            <TracksArea screenDimensions={tracksDimensions} />
          </TracksWrapper>
        </TracksAreaWrapper>
        <VerticalScrollbarWrapper style={verticalScrollbarWrapperStyle}>
          <VerticalScrollbar />
        </VerticalScrollbarWrapper>
      </SequencerSectionWrapper>
    );
  }
}

export default inject(SequencerSection);
