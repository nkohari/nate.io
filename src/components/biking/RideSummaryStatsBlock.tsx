import {motion} from 'framer-motion';

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

export const RideSummaryStatsBlock = ({
  title,
  precision,
  scale = 1,
  unit,
  value,
}: RideSummaryStatsBlockProps) => {
  let content;
  if (value !== undefined) {
    const formatter = new Intl.NumberFormat(undefined, {maximumFractionDigits: precision});
    const scaledValue = Number.isNaN(value) ? 0 : value * scale;
    const formattedValue = scaledValue === undefined ? '0' : formatter.format(scaledValue);
    content = (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={numberVariants}
        className="flex flex-row gap-1 items-baseline"
      >
        <div className="text-2xl font-bold">{formattedValue}</div>
        {unit && <div className="text-sm">{unit}</div>}
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-[70px] p-2 px-4 mr-2 last:mr-0 rounded-lg bg-slate-100 dark:bg-slate-700 border border-black/5 dark:border-white/5">
      <div className="text-sm font-semibold">{title}</div>
      {content}
    </div>
  );
};
