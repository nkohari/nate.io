import {motion} from 'framer-motion';
import {useMemo, useState} from 'react';
import {Ride} from 'src/types';
import {RideGraphSwitch, RideGraphSwitchOption} from './RideGraphSwitch';
import {MeasurementSystem} from './types';
import {averageValuesForRides, getUnitForField, maxValueForRides, sumValuesForRides} from './util';

const numberVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

type RideSummaryStatsBlockProps = {
  title: string;
  precision: number;
  scale?: number;
  unit?: string;
  value?: number;
};

const RideSummaryStatsBlock = ({
  title,
  precision,
  scale = 1,
  unit,
  value,
}: RideSummaryStatsBlockProps) => {
  const formatter = new Intl.NumberFormat(undefined, {maximumFractionDigits: precision});
  const scaledValue = value === undefined ? undefined : value * scale;
  return (
    <div className="flex flex-col w-full min-h-[70px] p-2 px-4 mr-2 last:mr-0 rounded-lg bg-slate-100 dark:bg-slate-700 border border-black/5 dark:border-white/5">
      <div className="text-sm font-semibold">{title}</div>
      {scaledValue && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={numberVariants}
          className="flex flex-row gap-1 items-baseline"
        >
          <div className="text-2xl font-bold">{formatter.format(scaledValue)}</div>
          {unit && <div className="text-sm">{unit}</div>}
        </motion.div>
      )}
    </div>
  );
};

type RideSummaryStatsMode = 'overall' | 'average';

const OPTIONS: RideGraphSwitchOption<RideSummaryStatsMode>[] = [
  {label: 'Overall', value: 'overall'},
  {label: 'Average', value: 'average'},
];

type RideSummaryStatsProps = {
  rides?: Ride[];
  system: MeasurementSystem;
};

export const RideSummaryStats = ({rides, system}: RideSummaryStatsProps) => {
  const [mode, setMode] = useState<RideSummaryStatsMode>('overall');

  const stats = useMemo(() => {
    if (!rides) {
      return null;
    } else if (mode === 'overall') {
      return {
        distance: sumValuesForRides(rides, 'distance', system),
        duration: sumValuesForRides(rides, 'duration', system),
        speed: maxValueForRides(rides, 'maxSpeed', system),
        totalElevationGain: sumValuesForRides(rides, 'totalElevationGain', system),
      };
    } else {
      return {
        distance: averageValuesForRides(rides, 'distance', system),
        duration: averageValuesForRides(rides, 'duration', system),
        speed: averageValuesForRides(rides, 'averageSpeed', system),
        totalElevationGain: averageValuesForRides(rides, 'totalElevationGain', system),
      };
    }
  }, [mode, rides, system]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-bold mr-2">Year-to-date (2023)</div>
        <RideGraphSwitch onChange={(value) => setMode(value)} options={OPTIONS} value={mode} />
      </div>
      <div className="flex flex-row justify-between">
        <RideSummaryStatsBlock title="Rides" precision={0} value={rides?.length} />
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
};
