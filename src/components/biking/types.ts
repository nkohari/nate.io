export type RideField =
  | 'distance'
  | 'duration'
  | 'averageSpeed'
  | 'maxSpeed'
  | 'totalElevationGain';

export type MeasurementSystem = 'imperial' | 'metric';

export type AxisScale = {
  min: number;
  max: number;
};
