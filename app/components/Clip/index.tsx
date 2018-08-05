import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Clip as ClipModel } from 'core/models/clip';

interface Props {
  clip: ClipModel;
  dimensions: Dimensions;
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => any;
  isDragging?: boolean;
}

@observer
export class Clip extends React.Component<Props, {}> {
  render() {
    const { clip, onMouseDown, dimensions } = this.props;
    const { height, width } = dimensions;

    return (
      <ClipContainer
        id={clip.domId}
        height={height}
        width={width}
        isSelected={clip.isSelected}
        isDragging={clip.isDragging}
        onMouseDown={onMouseDown}
      />
    );
  }
}

export default Clip;

export interface ClipContainerProps {
  height: number;
  width: number;
  isSelected: boolean;
  isDragging: boolean;
}
export const ClipContainer = styled<ClipContainerProps, 'div'>('div')`
  background-color: ${props => (props.isSelected ? 'purple' : 'gray')};
  border: solid 2px #ccc;
  opacity: ${props => (props.isDragging ? 0.5 : 1)};

  height: ${props => props.height}px;
  width: ${props => props.width + 1}px;
`;
