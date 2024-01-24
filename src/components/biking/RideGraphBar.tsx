import {DateTime} from 'luxon';
import {motion} from 'framer-motion';
import {Ride} from 'src/types';
import {AxisScale, MeasurementSystem, RideField} from './types';
import {getValueFromRide} from './util';

const barVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

type RideGraphBarProps = {
  date: DateTime;
  field: RideField;
  rides: Ride[];
  scale: AxisScale;
  system: MeasurementSystem;
  today: DateTime;
};

export const RideGraphBar = ({date, field, rides, scale, system, today}: RideGraphBarProps) => {
  const ride = rides.find((ride) => {
    const matchDate = date.toISODate();
    const rideDate = ride.timestamp.toISODate();
    return rideDate === matchDate;
  });

  const formatter = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 1,
    maximumSignificantDigits: 3,
    minimumSignificantDigits: 3,
  });

  let bar;
  let label;
  let textColor;

  if (ride) {
    textColor = 'text-slate-100';
    const value = getValueFromRide(ride, field, system);
    const height = Math.floor((value / scale.max) * 100);
    label = (
      <motion.div className="font-semibold text-[10px] text-center h-[16px] opacity-0 group-hover:opacity-100 transition-opacity">
        {formatter.format(value)}
      </motion.div>
    );
    bar = (
      <motion.div
        initial={{height: 0}}
        animate={{height: `${height}%`}}
        className="rounded-xl w-full bg-indigo-400 dark:bg-indigo-500 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-700 transition-colors"
      />
    );
  } else {
    textColor = 'text-slate-500 dark:text-slate-300';
    bar = (
      <motion.div
        initial={{height: 0}}
        animate={{height: 4}}
        className="rounded-sm w-full bg-slate-300 dark:bg-slate-500"
      />
    );
  }

  return (
    <motion.div variants={barVariants} className="relative group cursor-default">
      <div className="flex flex-col justify-end w-full h-full px-1">
        {label}
        {bar}
      </div>
      <div
        className={`z-10 absolute bottom-4 font-semibold text-[10px] text-center ${textColor} -rotate-90 w-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity`}
      >
        {date.year === today.year ? date.toFormat('LLLL d') : date.toFormat('LLLL d, yyyy')}
      </div>
    </motion.div>
  );
};
