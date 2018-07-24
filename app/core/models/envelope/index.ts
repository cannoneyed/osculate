import { computed, observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { Point } from './point';
import { Connection, LineConnection } from './connection';
import { TimelineVector } from 'core/primitives/timeline-vector';

const BEGINNING = new TimelineVector(0);

export class Envelope {
  id = generateId();

  @observable length: TimelineVector;

  pointIndices = new Map<Point, number>();
  @observable points = observable.array<Point>([]);

  @observable minimum: number = 0;
  @observable maximum: number = 1;

  @observable stepSize = 0;

  constructor(length?: TimelineVector) {
    this.length = length || new TimelineVector(2);
  }

  @computed
  get connections() {
    const connections = [];
    for (let i = 1; i < this.points.length; i++) {
      const previous = this.points[i - 1];
      const current = this.points[i];
      connections.push(new Connection(previous, current));
    }
    return connections;
  }

  addPoint(point: Point, shouldSort = true) {
    this.points.push(point);
    shouldSort && this.sortPoints();
  }

  removePoint(point: Point, shouldSort = true) {
    if (this.canRemovePoint(point)) {
      this.removePoint_(point, shouldSort);
    }
  }

  private removePoint_(point: Point, shouldSort = true) {
    this.points.remove(point);
    this.pointIndices.delete(point);
    shouldSort && this.sortPoints();
  }

  setPointPosition(point: Point, nextPosition: TimelineVector) {
    // Remove any overlapping points.
    const pointsToRemove = this.getPointsBeingDisplaced(point, nextPosition);
    pointsToRemove.forEach(point => this.removePoint_(point, false));

    // Ensure that moving the point from the beginning or end of the envelope instantiates a new point at that position.
    if (this.isAtBeginning(point.position) && !this.isAtBeginning(nextPosition)) {
      const beginning = this.clonePoint(point);
      this.addPoint(beginning, false);
    } else if (this.isAtEnd(point.position) && !this.isAtEnd(nextPosition)) {
      const end = this.clonePoint(point);
      this.addPoint(end, false);
    }

    // Finally, set the position of the point.
    point.position = nextPosition;
    this.sortPoints();
  }

  setPointValue(point: Point, value: number) {
    point.value = value;
  }

  createPoint(position: TimelineVector, value: number) {
    const othersAtPosition = this.points.filter(otherPoint =>
      otherPoint.position.isEqualTo(position)
    );
    if (othersAtPosition.length > 1) return;

    // Simply update the value of the points at the beginning or end.
    if (this.isAtBeginning(position)) {
      const beginning = this.getBeginningPoint();
      beginning && (beginning.value = value);
    } else if (this.isAtBeginning(position)) {
      const end = this.getEndPoint();
      end && (end.value = value);
    }
    // Otherwise, create a new point
    else {
      const point = new Point(position, value);
      this.addPoint(point);
    }
  }

  private getBeginningPoint = () => this.points[0];
  private getEndPoint = () => this.points[this.points.length - 1];
  private isAtBeginning = (position: TimelineVector) => position.isEqualTo(BEGINNING);
  private isAtEnd = (position: TimelineVector) => position.isEqualTo(this.length);
  private isAtBeginningOrEnd = (position: TimelineVector) =>
    this.isAtBeginning(position) || this.isAtEnd(position);

  private getIndex = (point: Point) => {
    const index = this.pointIndices.get(point);
    return index !== undefined ? index : this.points.indexOf(point);
  };

  private sortPoints() {
    this.points = this.points.sort((a: Point, b: Point) =>
      TimelineVector.sortAscendingFn(a.position, b.position)
    );
    this.points.forEach((point, index) => {
      this.pointIndices.set(point, index);
    });
  }

  private canRemovePoint = (point: Point) => {
    const isBeginningOrEnd = this.isAtBeginningOrEnd(point.position);
    const otherPointsWithSamePosition = this.points.filter(
      otherPoint => otherPoint.position.isEqualTo(point.position) && point !== otherPoint
    );
    return isBeginningOrEnd ? otherPointsWithSamePosition.length > 0 : true;
  };

  private clonePoint(point: Point) {
    return new Point(point.position.copy(), point.value);
  }

  private getPointsBeingDisplaced(point: Point, nextPosition: TimelineVector) {
    const pointIndex = this.getIndex(point);

    const pointsToRemove = this.points.filter((otherPoint, otherIndex) => {
      if (point === otherPoint) return false;
      const position = point.position;
      const otherPosition = otherPoint.position;

      const isBetween = TimelineVector.isBetween(otherPosition, position, nextPosition);
      if (isBetween) return true;

      // Handle points being overtaken
      const areOverlapping = otherPosition.isEqualTo(position);
      const movingLeft = nextPosition.isLessThan(position);
      const isOvertaking = movingLeft ? otherIndex < pointIndex : otherIndex > pointIndex;
      if (areOverlapping && isOvertaking) return true;

      // Handle points with exactly the same value
      const isNowOverlapping = otherPosition.isEqualTo(nextPosition);
      const overlappingValue = point.value === otherPoint.value;
      if (isNowOverlapping && overlappingValue) return true;

      // Handle moving to the start or end of the clip
      const movingToBeginning =
        this.isAtBeginning(otherPosition) && this.isAtBeginning(nextPosition);
      const movingToEnd = this.isAtEnd(otherPosition) && this.isAtEnd(nextPosition);

      if (movingToBeginning || movingToEnd) return true;
      return false;
    });

    // Additionally, when we move a point to the same position as more than another point, we need to
    // figure out which points to remove. We keep the lowest and highest index, but remove any in the middle.
    const indicesWithSamePosition = this.points
      .filter(otherPoint => otherPoint.position.isEqualTo(nextPosition) && point !== otherPoint)
      .map(this.getIndex)
      .concat([pointIndex])
      .sort();

    const getMiddleElements = <T>(x: T[]) => (x.length >= 3 ? x.slice(1, x.length - 1) : []);
    const morePointsToRemove = getMiddleElements(indicesWithSamePosition).map(
      index => this.points[index]
    );
    return [...pointsToRemove, ...morePointsToRemove];
  }
}

export { Connection, LineConnection, Point };
