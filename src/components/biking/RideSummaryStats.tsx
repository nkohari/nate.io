import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import { Ride } from 'src/types';
import { RideGraphSwitch, RideGraphSwitchOption } from './RideGraphSwitch';
import { RideSummaryStatsBlock } from './RideSummaryStatsBlock';
import { MeasurementSystem } from './types';
import {
  averageValuesForRides,
  getUnitForField,
  maxValueForRides,
  sumValuesForRides,
} from './util';

type RideSummaryStatsMode = 'overall' | 'average';

const OPTIONS: RideGraphSwitchOption<RideSummaryStatsMode>[] = [
  { label: 'Overall', value: 'overall' },
  { label: 'Average', value: 'average' },
];

const YEARS: RideGraphSwitchOption<number>[] = [
  { label: '2025', value: 2025 },
  { label: '2024', value: 2024 },
  { label: '2023', value: 2023 },
];

type RideSummaryStatsProps = {
  rides?: Ride[];
  system: MeasurementSystem;
};

export function RideSummaryStats({ rides, system }: RideSummaryStatsProps) {
  const [mode, setMode] = useState<RideSummaryStatsMode>('overall');
  const [year, setYear] = useState<number>(DateTime.utc().year);

  const stats = useMemo(() => {
    if (!rides) {
      return null;
    }

    const selectedRides = rides.filter((ride) => ride.timestamp.year === year);

    if (mode === 'overall') {
      return {
        count: selectedRides.length,
        distance: sumValuesForRides(selectedRides, 'distance', system),
        duration: sumValuesForRides(selectedRides, 'duration', system),
        speed: maxValueForRides(selectedRides, 'maxSpeed', system),
        totalElevationGain: sumValuesForRides(selectedRides, 'totalElevationGain', system),
      };
    } else {
      return {
        count: selectedRides.length,
        distance: averageValuesForRides(selectedRides, 'distance', system),
        duration: averageValuesForRides(selectedRides, 'duration', system),
        speed: averageValuesForRides(selectedRides, 'averageSpeed', system),
        totalElevationGain: averageValuesForRides(selectedRides, 'totalElevationGain', system),
      };
    }
  }, [mode, rides, system, year]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="text-sm font-bold mr-2">Yearly stats</div>
          <RideGraphSwitch onChange={(value) => setYear(value)} options={YEARS} value={year} />
        </div>
        <RideGraphSwitch onChange={(value) => setMode(value)} options={OPTIONS} value={mode} />
      </div>
      <div className="flex flex-row justify-between">
        <RideSummaryStatsBlock title="Rides" precision={0} value={stats?.count} />
        <RideSummaryStatsBlock
          title={mode === 'overall' ? 'Total Distance' : 'Average Distance'}
          value={stats?.distance}
          precision={1}
          unit={getUnitForField('distance', system)}
        />
        <RideSummaryStatsBlock
          title={mode === 'overall' ? 'Total Duration' : 'Average Duration'}
          value={stats?.duration}
          precision={1}
          scale={mode === 'overall' ? 1 / 60 : 1}
          unit={mode === 'overall' ? 'hours' : 'minutes'}
        />
        <RideSummaryStatsBlock
          title={mode === 'overall' ? 'Maximum Speed' : 'Average Speed'}
          value={stats?.speed}
          precision={1}
          unit={getUnitForField('averageSpeed', system)}
        />
        <RideSummaryStatsBlock
          title="Elevation Gain"
          value={stats?.totalElevationGain}
          precision={mode === 'overall' ? 0 : 1}
          unit={getUnitForField('totalElevationGain', system)}
        />
      </div>
    </div>
  );
}
