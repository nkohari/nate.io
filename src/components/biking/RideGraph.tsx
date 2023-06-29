import {useEffect, useMemo, useState} from 'react';
import {DateTime} from 'luxon';
import {motion} from 'framer-motion';
import {Ride} from 'src/types';
import {RideGraphSwitch} from './RideGraphSwitch';
import {RideGraphBar} from './RideGraphBar';
import {RideSummaryStats} from './RideSummaryStats';
import {MeasurementSystem, RideField} from './types';
import {getUnitForField, getYAxisScale} from './util';

// The API is a Cloudflare function, so for simplicity, just use the production endpoint during dev
const ENDPOINT = import.meta.env.DEV ? 'https://nate.io/api/rides' : '/api/rides';

type RideGraphXAxisLabelsProps = {
  dates: DateTime[];
};

const RideGraphXAxisLabels = ({dates}: RideGraphXAxisLabelsProps) => (
  <div className="z-10 grid grid-flow-col auto-cols-[3.33%] p-1 font-bold text-xs text-center text-slate-600 dark:text-slate-400">
    {dates.map((date) => (
      <div key={date.toISODate()}>{date.toFormat('ccccc')}</div>
    ))}
  </div>
);

export const RideGraph = () => {
  const [rides, setRides] = useState<Ride[]>();
  const [field, setField] = useState<RideField>('distance');
  const [system, setSystem] = useState<MeasurementSystem>('imperial');

  useEffect(() => {
    fetch(ENDPOINT)
      .then((result) => result.json())
      .then(setRides);
  }, []);

  const today = DateTime.fromISO(DateTime.utc().toISODate()!, {zone: 'utc'});
  const dates = [...Array(30).keys()].map((index) => today.minus({days: 29 - index}));

  const scale = useMemo(
    () => (rides ? getYAxisScale(rides, field, system) : null),
    [rides, field, system],
  );

  let bars;
  if (rides && scale) {
    bars = (
      <motion.div
        className="grid grid-flow-col auto-cols-[3.33%] h-full w-full"
        initial="hidden"
        animate="visible"
        transition={{staggerChildren: 0.05}}
      >
        {dates.map((date) => (
          <RideGraphBar
            key={date.toISODate()}
            date={date}
            rides={rides}
            field={field}
            scale={scale}
            system={system}
          />
        ))}
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden mb-4 gap-3">
      <RideSummaryStats rides={rides} system={system} />
      <div className="w-full flex flex-row items-center justify-between">
        <div className="text-sm font-bold mr-2">Last 30 days</div>
        <RideGraphSwitch
          onChange={(value: RideField) => setField(value)}
          options={[
            {value: 'distance', label: 'Distance'},
            {value: 'duration', label: 'Duration'},
            {value: 'averageSpeed', label: 'Average Speed'},
            {value: 'maxSpeed', label: 'Maximum Speed'},
            {value: 'totalElevationGain', label: 'Total Elevation Gain'},
          ]}
          value={field}
        />
      </div>
      <div className="flex flex-col w-full p-1 rounded-xl bg-slate-100 dark:bg-slate-700 border border-black/5 dark:border-white/5">
        <div className="flex flex-row h-[300px] w-full p-1">{bars}</div>
        <RideGraphXAxisLabels dates={dates} />
      </div>
      <div className="flex flex-row justify-end">
        <RideGraphSwitch
          onChange={(value: MeasurementSystem) => setSystem(value)}
          options={[
            {value: 'imperial', label: getUnitForField(field, 'imperial')},
            {value: 'metric', label: getUnitForField(field, 'metric')},
          ]}
          value={system}
        />
      </div>
    </div>
  );
};
