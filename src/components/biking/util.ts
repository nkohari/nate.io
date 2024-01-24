import {DateTime} from 'luxon';
import {Ride} from 'src/types';
import {AxisScale, MeasurementSystem, RideField} from './types';

export function createRide(model: Record<string, any>): Ride {
  return {
    id: model.id,
    timestamp: DateTime.fromISO(model.timestamp),
    distance: model.distance,
    duration: model.duration,
    averageSpeed: model.averageSpeed,
    maxSpeed: model.maxSpeed,
    totalElevationGain: model.totalElevationGain,
  };
}

export function getUnitForField(field: RideField, system: MeasurementSystem) {
  switch (field) {
    case 'distance':
      return system === 'metric' ? 'km' : 'mi';

    case 'totalElevationGain':
      return system === 'metric' ? 'm' : 'ft';

    case 'duration':
      return 'minutes';

    case 'averageSpeed':
    case 'maxSpeed':
      return system === 'metric' ? 'km/hr' : 'mph';

    default:
      throw new Error(`Unknown field ${field}`);
  }
}

export function getValueFromRide(ride: Ride, field: RideField, system: MeasurementSystem) {
  const raw = ride[field];
  switch (field) {
    // Base unit is meters, convert to km or miles
    case 'distance':
      return system === 'metric' ? raw * 0.001 : raw * 0.000621371;

    // Base unit is meters, convert to feet if imperial
    case 'totalElevationGain':
      return system === 'metric' ? raw : raw * 3.28084;

    // Base unit is seconds, convert to minutes
    case 'duration':
      return raw / 60;

    // Base unit is meters/second, convert to km/hr or mph
    case 'averageSpeed':
    case 'maxSpeed':
      return system === 'metric' ? raw * 3.6 : raw * 2.23694;

    default:
      throw new Error(`Unknown field ${field}`);
  }
}

export function sumValuesForRides(rides: Ride[], field: RideField, system: MeasurementSystem) {
  return rides
    .map((ride) => getValueFromRide(ride, field, system))
    .reduce((sum, value) => sum + value, 0);
}

export function averageValuesForRides(rides: Ride[], field: RideField, system: MeasurementSystem) {
  return sumValuesForRides(rides, field, system) / rides.length;
}

export function maxValueForRides(rides: Ride[], field: RideField, system: MeasurementSystem) {
  return rides
    .map((ride) => getValueFromRide(ride, field, system))
    .reduce((max, value) => Math.max(max, value), Number.MIN_VALUE);
}

export function minValueForRides(rides: Ride[], field: RideField, system: MeasurementSystem) {
  return rides
    .map((ride) => getValueFromRide(ride, field, system))
    .reduce((min, value) => Math.min(min, value), Number.MAX_VALUE);
}

export function getYAxisScale(
  rides: Ride[],
  field: RideField,
  system: MeasurementSystem,
): AxisScale {
  const min = minValueForRides(rides, field, system);
  const max = maxValueForRides(rides, field, system);
  const padding = (max - min) * 0.1;

  return {
    min: Math.round(min - padding),
    max: Math.round(max + padding),
  };
}
